(() => {
  'use strict';
  const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d'),world=new ZD.World(),keys={},touch={},pad={};
  const resolution=Math.min(Math.max(window.devicePixelRatio||1,1.5),2);
  canvas.width=Math.round(960*resolution);canvas.height=Math.round(540*resolution);
  let running=false,started=false,last=0,acc=0,audio=null,sound=true,recording=null,saxSource=null,uploadVersion=0;
  let messageTimer=0,particles=[],modal=null,iconState=null,mapWasRunning=false;
  const tones=new Set();
  const storageKey='zlotodzwiek-v07',soundKey='zlotodzwiek-sound';
  try{sound=localStorage.getItem(soundKey)!=='off';}catch{}
  function soundLabel(){ $('sound').textContent=`Dźwięk: ${sound?'wł.':'wył.'}`;$('sound').setAttribute('aria-pressed',String(sound)); }
  soundLabel();
  function rememberSound(){try{localStorage.setItem(soundKey,sound?'on':'off');}catch{}}
  const tips={key:'Masz klucz. Otworzy włazy oznaczone tym samym kolorem.',seal:'Pieczęć zdobyta! Trzy pieczęcie otwierają ostatnie wyjście.',
    fragment:'Fragment melodii zdobyty! Licznik pod grą pokazuje, ile masz z trzech fragmentów.',puzzleRetry:'To nie ta kolejność. Wzór pozostaje widoczny — spróbuj jeszcze raz, bez straty punktów.',puzzleSolved:'Zagadka rozwiązana! Prawe przejście jest otwarte. Przy portalu naciśnij ↑.',puzzleLocked:'Przejście czeka na rozwiązanie zagadki.',powerMissing:'Ta instalacja czeka na zasilanie z poprzedniej zagadki.',clueMissing:'Najpierw odszukaj zapis w poprzednim pokoju.',clue:'Nowa wskazówka zapisana w dzienniku pod grą.',relic:'Artefakt zdobyty! Prawy portal otworzył skrót do głównej trasy.',encore:'Wieloryb się obudził! Zebrana melodia wróciła do gwiazd. +1500 punktów. Możesz tu wracać i grać.',treasure:'Ukryty skarb! +400 punktów.',death:'Spróbuj ponownie. Znalezione przedmioty i odkryte przejścia zostają.',
    saxMissing:'Najpierw znajdź instrument. Rozejrzyj się na podestach.',saxUnsafe:'Zatrzymaj się na podeście, aby zagrać.',
    locked:'Ten właz wymaga klucza w tym samym kolorze. Rozejrzyj się na tym piętrze.',exitLocked:'Wyjście wymaga saksofonu i trzech pieczęci. Sprawdź boczne podesty.'};
  function roomHint(){
    if(world.def.portal?.requiresPuzzles)return world.portalOpen(world.def.portal)?'Światło i warsztat zasiliły nowe przejście. ↑ przy prawym portalu: pięć powiązanych komnat.':'Ten portal potrzebuje światła oraz obu mechanizmów warsztatu. Lista celów pod grą pamięta, czego brakuje.';
    if(world.def.wonder==='whale'&&world.encore)return 'Wieloryb czuwa nad odnalezioną melodią. Możesz zagrać ponownie. ↑ przy lewym portalu: powrót do przygody.';
    if(world.def.wonder==='whale'&&world.fragments.length===3)return world.saxFound?'Masz wszystkie fragmenty. Stań na okrągłym znaku pośrodku podłogi i zagraj J / ♫.':'Masz melodię. Wróć po saksofon z futerału na początku przygody, a potem zagraj na okrągłym znaku.';
    if(world.def.secret&&!world.def.expedition&&world.items.every(i=>i.taken))return 'Fragment z tej komnaty jest już Twój. ↑ przy lewym portalu: wróć i szukaj kolejnych muzycznych zagadek.';
    if(world.def.portal?.hiddenUntilReady&&world.portalOpen(world.def.portal))return 'Dwa artefakty ujawniły nowe przejście! ↑ przy portalu po prawej.';
    if(world.def.puzzle&&world.puzzleState().solved)return world.def.portal?'Zagadka rozwiązana ✓. ↑ przy prawym portalu.':'Zagadka rozwiązana ✓. Idź do prawego przejścia.';
    return world.def.saxCache&&world.saxFound?'Saksofon jest w ekwipunku. J / ♫: zagraj. Odkrywaj dalsze przejścia.':world.def.hint;
  }
  function message(text){if(text){$('message').textContent=text;messageTimer=7;}}
  function save(){if(!started)return;try{localStorage.setItem(storageKey,JSON.stringify(world.snapshot()));}catch{}}
  let restored=false;
  try{
    restored=world.restore(JSON.parse(localStorage.getItem(storageKey)));
    if(!restored){const old=JSON.parse(localStorage.getItem('zlotodzwiek-v05'));if(world.importLegacy(old))$('start-note').textContent='Nowa mapa zaczyna się od wejścia. Zdobyty wcześniej saksofon został zachowany.';}
  }catch{}
  if(restored)$('start').textContent=world.won?'Zobacz wynik →':'Kontynuuj przygodę →';
  function stopTones(){for(const o of tones){try{o.stop();}catch{}o.disconnect();}tones.clear();}
  function playTone(freq,length=.1,type='triangle',volume=.095,delay=0){
    if(!sound||!audio)return;const at=audio.currentTime+delay,o=audio.createOscillator(),g=audio.createGain();
    o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.001,at);g.gain.linearRampToValueAtTime(volume,at+.018);g.gain.exponentialRampToValueAtTime(.001,at+length);
    o.connect(g);g.connect(audio.destination);tones.add(o);o.onended=()=>{tones.delete(o);o.disconnect();g.disconnect();};o.start(at);o.stop(at+length);
  }
  function motif(kind){
    const notes=kind==='encore'?[261.63,329.63,392,523.25,659.25,587.33,523.25]:kind==='orbit'?[293.66,440,349.23,587.33]:kind==='bloom'?[329.63,392,523.25,659.25]:[392,523.25,659.25];
    notes.forEach((n,i)=>{playTone(n,.65,'sine',.035,i*.23);playTone(n*2,.45,'triangle',.009,i*.23);});
  }
  function unlockAudio(){if(!audio){const AC=window.AudioContext||window.webkitAudioContext;if(AC)audio=new AC();}if(!audio)return Promise.resolve(false);return audio.resume().then(()=>audio.state==='running').catch(()=>{message('Dźwięk nie został uruchomiony. Naciśnij przycisk Dźwięk, aby spróbować ponownie.');return false;});}
  function stopSax(){if(saxSource){saxSource.onended=null;saxSource.stop();saxSource.disconnect();saxSource=null;}}
  function playRecording(){
    stopSax();stopTones();
    if(!recording){message('Marian wyjmuje saksofon. Dodaj swoje nagranie pod grą, aby usłyszeć jego dźwięk.');return;}
    if(!sound){message('Włącz dźwięk, a następnie naciśnij J / ♫.');world.playingSax=false;return;}
    unlockAudio();
    const source=audio.createBufferSource();source.buffer=recording;source.connect(audio.destination);saxSource=source;
    source.onended=()=>{if(saxSource===source){saxSource=null;world.playingSax=false;}source.disconnect();};
    source.start();message('Twoje nagranie. J / ♫ lub ruch kończy granie.');
  }
  $('sax-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    const version=++uploadVersion;world.playingSax=false;stopSax();recording=null;unlockAudio();
    if(file.size>30*1024*1024){$('audio-status').textContent='Wybierz nagranie do 30 MB.';return;}
    $('audio-status').textContent='Wczytywanie nagrania…';
    try{
      const decoded=await audio.decodeAudioData(await file.arrayBuffer());
      if(version!==uploadVersion)return;recording=decoded;sound=true;
      soundLabel();rememberSound();
      $('audio-status').textContent=file.name+' · gotowe. Plik pozostaje na tym urządzeniu; wybierz go ponownie po odświeżeniu.';
    }catch{if(version===uploadVersion)$('audio-status').textContent='Nie można odczytać nagrania. Spróbuj pliku WAV lub MP3.';}
  });
  function clearInput(){for(const source of [keys,touch])for(const k in source)delete source[k];world.prev={};world.playingSax=false;stopSax();stopTones();document.querySelectorAll('.active').forEach(b=>b.classList.remove('active'));}
  function resetClock(){last=performance.now();acc=0;}
  function showDiscovery(){
    clearInput();modal='discovery';running=false;$('discovery').hidden=false;
    $('discovery-title').textContent=world.discovery.recovered?'Saksofon jest już Twój!':'Znalazłeś saksofon!';
    $('discovery-copy').textContent=world.discovery.recovered?'Instrument ze wcześniejszej gry jest w ekwipunku. J / ♫: wyjmij i zagraj.':'Marian zabrał złoty saksofon z futerału. J / ♫: wyjmij i zagraj. Ruch: schowaj.';
    const c=$('found-sax').getContext('2d');c.clearRect(0,0,130,210);ZDCharacter.sax(c,17,9,2.3);
    $('discovery-ok').focus();save();
  }
  function acknowledge(){
    if(modal!=='discovery')return;
    world.acknowledge();$('discovery').hidden=true;modal=null;clearInput();running=true;resetClock();save();canvas.focus();message('SAKSOFON ZDOBYTY ✓ — widzisz go w ekwipunku. J / ♫: zagraj.');
  }
  function drawMap(){
    const c=$('map-canvas').getContext('2d');c.clearRect(0,0,640,720);c.fillStyle='#172534';c.fillRect(0,0,640,720);
    for(const def of Object.values(ZD.realms).filter(d=>!d.secret)){
      const visited=!!world.realmStates[def.id],x=25+def.col*77,y=20+def.row*52;
      if(!visited)continue;
      for(const [direction,link] of Object.entries(def.links)){
        const target=ZD.realms[link.to],tx=25+target.col*77,ty=20+target.row*52;
        c.strokeStyle=world.realmStates[link.to]?'#b6c5b4':'#536976';c.lineWidth=3;c.beginPath();c.moveTo(x+25,y+16);c.lineTo((x+tx)/2+25,(y+ty)/2+16);c.stroke();
        if(direction==='down'&&link.requires&&!world.inventory.includes(link.requires)){c.fillStyle=ZDCampaign.colors[def.row];c.fillRect(x+22,y+37,6,6);}
      }
    }
    for(const def of Object.values(ZD.realms).filter(d=>!d.secret)){
      const visited=!!world.realmStates[def.id],x=25+def.col*77,y=20+def.row*52;
      c.fillStyle=visited?'#617e80':'#263947';c.fillRect(x,y,51,32);
      if(visited&&def.saxCache&&world.saxFound){c.fillStyle='#ffe3a0';c.font='18px sans-serif';c.fillText('♫',x+33,y+24);}
      if(visited&&def.portal?.requiresPuzzles){c.fillStyle=world.portalOpen(def.portal)?'#a6ffd0':'#aaa3c7';c.font='16px sans-serif';c.fillText('◇',x+33,y+24);}
      if(visited&&def.puzzle){c.fillStyle=world.puzzles[def.puzzle.id]?.solved?'#ffe6a4':'#c0b2e1';c.font='16px sans-serif';c.fillText('✦',x+4,y+23);}
      if(def.id===world.realmId){c.strokeStyle='#ffe2a1';c.lineWidth=3;c.strokeRect(x-2,y-2,55,36);c.fillStyle='#fff0c4';c.beginPath();c.arc(x+25,y+16,5,0,Math.PI*2);c.fill();}
    }
    for(const [i,def] of Object.values(ZD.realms).filter(d=>d.secret).entries()){
      const x=24+(i%5)*123,y=350+Math.floor(i/5)*70,visited=!!world.realmStates[def.id],parent=ZD.realms[def.parent];
      const link=parent.links.right,portal=parent.portal;
      const open=portal?.to===def.id?world.portalOpen(portal):!!world.realmStates[parent.id]&&(!link?.requiresPuzzle||world.puzzles[link.requiresPuzzle]?.solved);
      c.fillStyle=visited?'#547e88':'#263947';c.fillRect(x,y,106,40);c.fillStyle=open?'#ffe0a6':'#778899';c.font='12px system-ui';c.fillText(visited?'✦ Odkryty':open?'◇ Dostępny':'? Sekret',x+8,y+25);
      if(def.id===world.realmId){c.strokeStyle='#ffe4a1';c.lineWidth=3;c.strokeRect(x-2,y-2,110,44);}
    }
    $('map-canvas').setAttribute('aria-label',`Odkryto ${Object.keys(world.realmStates).length} z ${ZDCampaign.total} komnat. Bieżąca pozycja jest oznaczona kropką.`);
  }
  function toggleMap(){
    if(!started||world.won||modal==='discovery')return;
    if(modal==='map'){modal=null;$('map-panel').hidden=true;running=mapWasRunning;resetClock();canvas.focus();}
    else{mapWasRunning=running;running=false;clearInput();modal='map';drawMap();$('map-panel').hidden=false;$('map-close').focus();save();}
    $('map-button').setAttribute('aria-expanded',modal==='map');
  }
  function showWin(){
    running=false;clearInput();$('overlay').hidden=false;
    document.querySelector('.panel').innerHTML=`<p class="eyebrow">WSZYSTKIE PIECZĘCIE ZDOBYTE</p><h1>Droga<br><em>otwarta.</em></h1><p>${world.score} punktów · odkryte ${Object.keys(world.realmStates).length}/${ZDCampaign.total} · próby ${world.deaths+1}</p><button id="explore-again" class="primary">Odkrywaj dalej →</button><button id="again" class="primary">Nowa przygoda →</button>`;
    $('explore-again').onclick=()=>{world.won=false;modal=null;$('overlay').hidden=true;running=true;clearInput();resetClock();save();canvas.focus();};
    $('again').onclick=()=>{world.reset();save();location.reload();};$('again').focus();
  }
  function start(){unlockAudio().then(ok=>{if(ok&&sound&&running){playTone(392,.18,'triangle',.09);playTone(523.25,.22,'triangle',.09,.16);}});started=true;running=true;resetClock();$('overlay').hidden=true;$('pause').textContent='Pauza';canvas.focus();message(roomHint());if(world.discovery)showDiscovery();else if(world.won)showWin();}
  function pause(){if(!started||world.won||modal)return;running=!running;clearInput();$('pause').textContent=running?'Pauza':'Wznów';resetClock();if(!running)save();}
  $('start').onclick=start;$('pause').onclick=pause;$('discovery-ok').onclick=acknowledge;
  $('map-button').onclick=toggleMap;$('map-close').onclick=toggleMap;
  $('restart').onclick=()=>{world.reset();particles=[];clearInput();modal=null;$('map-panel').hidden=true;$('discovery').hidden=true;save();start();};
  $('sound').onclick=()=>{sound=!sound;soundLabel();rememberSound();if(!sound){world.playingSax=false;stopSax();stopTones();}else unlockAudio().then(ok=>{if(ok&&sound)playTone(523.25,.25,'triangle',.12);});};
  const bindings={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',Space:'jump',ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',KeyJ:'sax'};
  window.addEventListener('keydown',e=>{
    if(modal&&e.code==='Tab'){e.preventDefault();$(modal==='discovery'?'discovery-ok':'map-close').focus();return;}
    if(e.target.tagName==='INPUT')return;
    if(modal==='discovery'){if(e.code==='Enter'&&!e.repeat){e.preventDefault();acknowledge();}return;}
    if(e.code==='KeyM'&&!e.repeat){e.preventDefault();toggleMap();return;}
    if(e.code==='Escape'&&!e.repeat){if(modal==='map')toggleMap();else pause();return;}
    if(bindings[e.code]&&started&&!modal&&e.target.tagName!=='BUTTON'){e.preventDefault();keys[e.code]=true;}
  });
  window.addEventListener('keyup',e=>{delete keys[e.code];});
  window.addEventListener('blur',()=>{if(running)pause();clearInput();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)pause();});window.addEventListener('pagehide',save);
  document.querySelectorAll('[data-action]').forEach(b=>{
    b.addEventListener('pointerdown',e=>{if(modal||!running)return;e.preventDefault();b.setPointerCapture(e.pointerId);touch[e.pointerId]=b.dataset.action;b.classList.add('active');unlockAudio();});
    const release=e=>{delete touch[e.pointerId];b.classList.remove('active');};
    b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release);
  });
  function input(){
    const result={};for(const code in keys)result[bindings[code]]=true;for(const id in touch)result[touch[id]]=true;
    const g=Array.from(navigator.getGamepads?.()||[]).find(g=>g?.mapping==='standard');
    if(g){
      const jump=!!g.buttons[0]?.pressed;
      if(modal==='discovery'&&jump&&!pad.jump)acknowledge();
      if(g.buttons[8]?.pressed&&!pad.map)toggleMap();
      if(g.buttons[9]?.pressed&&!pad.pause)pause();
      if(!modal){result.left||=g.axes[0]<-.25||g.buttons[14]?.pressed;result.right||=g.axes[0]>.25||g.buttons[15]?.pressed;result.up||=g.axes[1]<-.25||g.buttons[12]?.pressed;result.down||=g.axes[1]>.25||g.buttons[13]?.pressed;result.jump||=jump;result.sax||=g.buttons[2]?.pressed;}
      pad.jump=jump;pad.map=!!g.buttons[8]?.pressed;pad.pause=!!g.buttons[9]?.pressed;
    }return result;
  }
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastPuzzleText='',lastJournal='';
  function render(){
    ZDArt.render(ctx,world,particles,{reducedMotion});
    $('inventory').textContent=world.saxFound?(world.playingSax?'GRA TERAZ ♫':'ZDOBYTY ✓ · J: graj'):'Do odnalezienia';
    if(iconState!==world.saxFound){iconState=world.saxFound;const c=$('inventory-icon').getContext('2d');c.clearRect(0,0,64,80);if(iconState)ZDCharacter.sax(c,14,3,.85);else{c.fillStyle='#b8aaa9';c.font='bold 36px sans-serif';c.fillText('?',20,52);}}
    document.querySelector('[data-action="sax"]').disabled=!world.saxFound;
    $('stats').textContent=`${world.score} pkt · klucze ${world.inventory.length}/5 · pieczęcie ${world.seals.length}/3`;
    $('fragments').textContent=`Fragmenty melodii: ${world.fragments.length}/3${world.encore?' · Gwiazdozbiór obudzony ✦':''}`;
    const pd=world.def.puzzle,ps=pd&&world.puzzleState();$('puzzle-help').hidden=!pd;
    if(pd){
      const known=!pd.requiresClue||world.journal.includes(pd.requiresClue);
      const detail=ps.solved?'Rozwiązane ✓ — prawe przejście otwarte.':!known?'Brakuje zapisu z poprzedniego pokoju.':pd.type==='sequence'?`Zagrane: ${pd.target.slice(0,ps.progress).map(i=>ZDAdventures.symbols[i]).join(' → ')||'—'} (${ps.progress}/${pd.target.length})`:['dials','tiles'].includes(pd.type)?`Teraz: ${ps.values.map(i=>ZDAdventures.symbols[i]).join(' · ')}`:pd.type==='filters'?`Źródła R / G / B: ${ps.values.map(v=>v?'wł.':'wył.').join(' · ')}`:pd.type==='valves'?`Ciśnienie: ${ps.values.join(' · ')}`:pd.type==='mirrors'?`Lustra: ${ps.values.map(v=>v?'\\':'/').join(' · ')}`:pd.type==='weights'?`Na szali: ${ps.values.reduce((sum,v,i)=>sum+v*pd.weights[i],0)} / ${pd.mass}`:`Gwiazdy: ${ps.values.map(v=>v?'✦':'○').join(' · ')}`;
      const reaction=ps.flash>0&&ps.last>=0?` · Naciśnięto: ${pd.type==='sequence'?ZDAdventures.symbols[ps.last]:ps.last+1}`:'';const text=pd.clue+' '+detail+reaction;if(text!==lastPuzzleText){$('puzzle-clue').textContent=pd.clue;$('puzzle-state').textContent=detail+reaction;lastPuzzleText=text;}
    }
    const board=pd&&['mirrors','weights'].includes(pd.type);$('puzzle-board').hidden=!board;if(board)ZDExpeditionArt.board($('puzzle-board').getContext('2d'),world);
    $('relic-status').textContent=`Artefakty: ${world.relics.length}/2${world.relics.length?' · '+world.relics.map(id=>ZDAdventures.relics[id].title).join(' · '):''}`;
    const journalKey=world.journal.join(',');if(journalKey!==lastJournal){lastJournal=journalKey;$('journal-entries').replaceChildren();for(const id of world.journal){const record=ZDAdventures.clues[id],entry=document.createElement('p'),title=document.createElement('b');title.textContent=record.title;entry.append(title,document.createElement('br'),document.createTextNode(record.text));$('journal-entries').append(entry);}}
    $('journal-count').textContent=`Dziennik wskazówek · ${world.journal.length}`;
    $('note-status').textContent=`Nuty: ${world.noteCount} / ${Object.values(ZD.realms).reduce((n,r)=>n+r.notes.length,0)} · punkty z nut: ${world.noteCount*100}`;
    $('objectives').textContent='CELE WYPRAWY\n'+ZDAdventures.objectives.map(([id,label])=>(world.puzzles[id]?.solved?'✓ ':'○ ')+label).join('\n')+(world.puzzles.mosaic?.solved&&world.puzzles.pressure?.solved&&world.puzzles.lightPath?.solved?' · Nowa wyprawa dostępna przez portal na ostatnim piętrze.':' · Te trzy pierwsze zadania zasilą portal na ostatnim piętrze.');
    $('explored').textContent=`Odkryte: ${Object.keys(world.realmStates).length} / ${ZDCampaign.total}`;
  }
  function tick(now){
    const dt=Math.min((now-last)/1000,.05);last=now;const controls=input();
    if(running){
      acc+=dt;while(acc>=1/120&&running&&!world.discovery){world.step(1/120,controls);acc-=1/120;}
      for(const event of world.events.splice(0)){
        if(event==='saxFound'){showDiscovery();playTone(660,.4);continue;}
        if(event==='playSax')playRecording();else message(tips[event]);
        if(event==='realm'){particles=[];stopTones();if(world.def.secret)motif(world.def.wonder);message(roomHint());}
        if(['note','key','seal','treasure','fragment','clue','relic'].includes(event)){playTone(event==='note'?660:440,.16);if(!reducedMotion)for(let i=0;i<16;i++)particles.push({x:world.p.x+11,y:world.p.y+15,vx:(Math.random()-.5)*115,vy:-Math.random()*110,life:.5+Math.random()*.25,star:i%3===0,size:1.7+Math.random(),c:event==='seal'?(i%2?'#88f5d4':'#fff2bd'):(i%2?'#ffce72':'#fff4c9')});}
        if(event.startsWith('bell'))playTone([329.63,392,523.25][Number(event.at(-1))],.55,'sine',.12);
        if(event==='puzzleSolved'||['fragment','relic'].includes(event))motif('reward');
        if(event==='fragment'&&world.fragments.length===3)message('Masz całą melodię! W komnacie wieloryba stań na okrągłym znaku i zagraj J / ♫.');
        if(event==='encore'&&!recording)motif('encore');
        if(event==='relic'&&world.relics.length===2)message('Dwa artefakty zdobyte! Wróć do drugiego pokoju od początku — ujawniło się nowe przejście.');
        if(event==='jump')playTone(220,.09,'sine',.05);
        if(event==='death')playTone(90,.25,'sawtooth',.025);
        if(['realm','note','key','seal','treasure','fragment','clue','relic','puzzleChanged','encore','death','win'].includes(event))save();
        if(event==='win')showWin();
      }
      messageTimer-=dt;if(messageTimer<0)$('message').textContent=roomHint();
      particles=particles.filter(a=>(a.life-=dt)>0);for(const a of particles){a.x+=a.vx*dt;a.y+=a.vy*dt;a.vy+=300*dt;}
    }
    if(!world.playingSax)stopSax();render();requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
