/* Connected optional expeditions; clues and relics have stable save identifiers. */
(() => {
  const rooms=ZDRealms;
  const clues={
    weightSketch:{title:'Szkic odważników',text:'● waży 2, ◆ waży 3, ✦ waży 5. Na szali ma leżeć dokładnie 7. Które dwa odważniki wybierzesz?'},
    glassScore:{title:'Zapis na szkle',text:'◆ → ✦ → ● → ✦. Strzałka na szkle prowadzi od lewej do prawej. Ten zapis pasuje do czterech pustych miejsc przy dzwonkach.'},
    tideScore:{title:'Zapis w odbiciu',text:'Na tablicy: ● → ◆ → ✦ → ◆. Podpis: „Woda czyta od końca”. Przy dzwonkach zagraj zapis od prawej do lewej.'}
  };
  const relics={prism:{title:'Pryzmat świtu',symbol:'◇'},shell:{title:'Muszla echa',symbol:'◉'}};
  const additions=[
    {host:'r13',id:'lightPath',type:'mirrors',controls:[140,310,430],initial:[1,1,0],target:[0,0,1],destination:'s04',clue:'Doprowadź światło do odbiornika. ↑ obraca wybrane lustro. Śledź promień w komnacie; odbiornik zasila wrota.',hint:'Trzy lustra sterują promieniem. Każdy obrót od razu zmienia jego drogę.'},
    {host:'r29',id:'balance',type:'weights',controls:[135,300,435],weights:[2,3,5],mass:7,target:[1,0,1],destination:'s07',clue:'↑ kładzie lub zdejmuje odważnik. Zrównoważ szalę do 7. ● = 2, ◆ = 3, ✦ = 5.',hint:'Na szali brakuje właściwej kombinacji odważników. Szkic znajdziesz też w pokoju po lewej.'},
    {host:'s05',id:'glassLock',type:'sequence',controls:[145,300,440],target:[1,2,0,2],requiresClue:'glassScore',destination:'s06',clue:'Odtwórz cztery symbole z zapisu na szkle. Wpis jest w dzienniku pod grą.',hint:'Wróć do poprzedniego pokoju po szklany zapis z górnego podestu. Dzwonki otworzą prawe przejście.'},
    {host:'s08',id:'tideLock',type:'sequence',controls:[145,300,440],target:[1,2,1,0],requiresClue:'tideScore',destination:'s09',clue:'Odczytaj zapis w odbiciu. „Woda czyta od końca”. Wskazówka jest w dzienniku.',hint:'Tablica z poprzedniego pokoju wyjaśnia ten zamek. Przeczytaj jej podpis, nie tylko symbole.'}
  ];
  function makeRoom(id,index,parent,wonder,platforms,routes){
    return rooms[id]={id,index,secret:true,parent,expedition:true,row:6,col:index-48,wonder,theme:wonder==='tide'?'canal':'garden',width:576,variant:0,
      spawn:{x:65,y:414},platforms:[{x:0,y:450,w:576,h:100},...platforms.map(([x,y,w])=>({x,y,w,h:18}))],
      ladders:routes.map(([x,top,bottom,kind])=>({x,top,bottom,w:24,kind:kind||'ladder'})),notes:[],items:[],spikes:[],patrols:[],barriers:[],links:{},
      hint:'Szukaj zapisów na podestach i przejść po bokach. Odkryte wskazówki zostają w dzienniku.'};
  }
  makeRoom('s04',51,'r13','glass',[[145,365,155],[280,285,200]],[[180,365,450],[290,285,365,'rope']]);
  makeRoom('s05',52,'s04','glass',[[155,335,310],[250,245,130]],[[185,335,450],[420,335,450,'rope'],[280,245,335]]);
  makeRoom('s06',53,'s05','aurora',[[145,365,145],[265,285,165],[395,205,110]],[[175,365,450],[278,285,365],[412,205,285,'rope']]);
  makeRoom('s07',54,'r29','tide',[[150,360,310],[235,255,145]],[[180,360,450,'rope'],[425,360,450],[270,255,360]]);
  makeRoom('s08',55,'s07','tide',[[145,345,130],[330,275,170]],[[175,345,450],[365,275,450,'rope']]);
  makeRoom('s09',56,'s08','reef',[[145,365,160],[285,285,180]],[[175,365,450],[297,285,365,'rope']]);
  makeRoom('s10',57,'r01','train',[[145,345,325],[260,255,140]],[[175,345,450],[435,345,450,'rope'],[290,255,345]]);
  const connect=(from,to,requiresPuzzle)=>{rooms[from].links.right={to,requiresPuzzle,spawn:{x:30,y:414}};rooms[to].links.left={to:from,spawn:{x:524,y:414}};};
  connect('s04','s05');connect('s05','s06','glassLock');connect('s07','s08');connect('s08','s09','tideLock');
  for(const [id,parent] of [['s04','r13'],['s07','r29']])rooms[id].portal={x:22,y:375,w:40,h:75,to:parent,return:true};
  rooms.s06.portal={x:508,y:375,w:40,h:75,to:'r13',return:true,requiresRelic:'prism'};
  rooms.s09.portal={x:508,y:375,w:40,h:75,to:'r29',return:true,requiresRelic:'shell'};
  rooms.s10.portal={x:22,y:375,w:40,h:75,to:'r01',return:true};
  rooms.r01.portal={x:508,y:375,w:40,h:75,to:'s10',requiresRelics:2,hiddenUntilReady:true};
  for(const def of additions){
    const host=rooms[def.host];host.puzzle=def;host.hint=def.hint;host.spikes=[];host.patrols=[];host.barriers=[];
    host.notes.filter(n=>n.y===415).forEach((n,i)=>n.x=i?476:72);
    if(!host.secret)host.portal={x:508,y:375,w:40,h:75,to:def.destination,puzzle:def.id};
  }
  function place(room,kind,id){const shelf=room.platforms.filter(s=>s.h===18&&!s.crumble).at(-1);room.items.push({kind,id,x:shelf.x+shelf.w-45,y:shelf.y-30,w:24,h:26});}
  place(rooms.r28,'clue','weightSketch');place(rooms.s04,'clue','glassScore');place(rooms.s07,'clue','tideScore');
  place(rooms.s06,'relic','prism');place(rooms.s09,'relic','shell');place(rooms.s10,'treasure','lastTicket');
  rooms.s06.hint='Pryzmat czeka na najwyższym podeście. Po zdobyciu prawy portal otworzy skrót do głównej trasy.';
  rooms.s09.hint='Odszukaj muszlę na górnym podeście. Po zdobyciu prawy portal przeniesie Cię na główną trasę.';
  rooms.s10.hint='Dwa artefakty otworzyły to miejsce. Odbierz złoty bilet z podestu i zagraj własną melodię dla pociągu płynącego po niebie.';
  // Grid-space ray tracer: 0 = /, 1 = \\. This same trace drives logic and the visual board.
  function traceMirrors(values){
    const mirrors=[[2,2],[2,0],[5,0]],path=[[0,2]],seen=new Set();let x=0,y=2,dx=1,dy=0;
    for(let n=0;n<64;n++){
      x+=dx;y+=dy;if(x<0||x>6||y<0||y>4)return {path,hit:false};path.push([x,y]);
      if(x===5&&y===4)return {path,hit:true};
      const key=[x,y,dx,dy].join(',');if(seen.has(key))break;seen.add(key);
      const i=mirrors.findIndex(([mx,my])=>mx===x&&my===y);if(i>=0)[dx,dy]=values[i]?[dy,dx]:[-dy,-dx];
    }return {path,hit:false};
  }
  ZDAdventures.definitions.push(...additions);Object.assign(ZDAdventures,{clues,relics,traceMirrors});ZDCampaign.total=58;
})();
