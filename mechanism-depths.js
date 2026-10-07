/* Dependent bolts and the three-disk transfer problem; no timers or punishment. */
(() => {
 const rooms=ZDRealms;
 const defs=[
 {host:'s24',id:'airlock',type:'interlock',controls:[120,285,455],initial:[0,0,0],target:[1,1,1],dependencies:[[1,1],[2,1],null],destination:'s25',clue:'Wysuń trzy rygle. Rygiel 1 potrzebuje otwartego 2; rygiel 2 potrzebuje otwartego 3. Rygiel 3 jest wolny. ↑ przełącza wybraną dźwignię.',hint:'Spójrz na przewody między ryglami. Zablokowana dźwignia pokaże, którego rygla potrzebuje.'},
 {host:'s26',id:'discBridge',type:'towers',controls:[120,285,455],initial:[0,0,0],target:[2,2,2],requiresClue:'discPlan',requiresPuzzles:['airlock'],destination:'s27',clue:'Przenieś trzy krążki z lewego stosu na prawy. Dźwignie łączą L↔Ś, Ś↔P, L↔P. Każda przenosi mniejszy z górnych krążków; większy nie może leżeć na mniejszym.',hint:'Plan z poprzedniego pokoju wyjaśnia przekładnię. Możesz próbować bez limitu czasu i bez straty punktów.'}
 ];
 const layouts=[[[145,350,305],[245,240,150]],[[125,365,145],[255,285,160],[390,215,130]],[[145,345,305],[245,230,150]],[[145,345,150],[360,250,150]]];
 for(let i=0;i<4;i++){const id='s'+(24+i),s=layouts[i],routes=i===1?[[155,365,450],[267,285,365],[402,215,285,'rope']]:i===3?[[175,345,450],[392,250,450,'rope']]:[[175,s[0][1],450],[292,s[1][1],s[0][1],'rope']];rooms[id]={id,index:71+i,secret:true,expedition:true,parent:i?'s'+(23+i):'s23',wonder:['locks','archive','foundry','clockgarden'][i],theme:i===3?'garden':'workshop',row:6,col:23+i,width:576,variant:0,spawn:{x:65,y:414},platforms:[{x:0,y:450,w:576,h:100},...s.map(([x,y,w])=>({x,y,w,h:18}))],ladders:routes.map(([x,top,bottom,kind])=>({x,top,bottom,w:24,kind:kind||'ladder'})),notes:s.map(([x,y])=>({x:x+42,y:y-29,w:16,h:20})),items:[],spikes:[],patrols:[],barriers:[],links:{},hint:'Mechanizmy mają spokojne tempo. Rozwiązania i plany pozostają w zapisie.'};}
 for(let i=23;i<27;i++){const a='s'+i,b='s'+(i+1),requiresPuzzle={23:'sunFilter',24:'airlock',26:'discBridge'}[i];rooms[a].links.right={to:b,requiresPuzzle,spawn:{x:30,y:414}};rooms[b].links.left={to:a,spawn:{x:524,y:414}};}
 for(const def of defs){rooms[def.host].puzzle=def;rooms[def.host].hint=def.hint;}
 ZDAdventures.clues.discPlan={title:'Plan przekładni krążków',text:'Trzy krążki trzeba zebrać na prawym słupku. Przenosić można tylko krążek z góry stosu. Mniejszy może leżeć na większym. Dźwignie łączą L↔Ś, Ś↔P i L↔P; ruch między parą wybiera mniejszy górny krążek.'};
 rooms.s25.items.push({kind:'clue',id:'discPlan',x:475,y:185,w:24,h:26});rooms.s27.items.push({kind:'treasure',id:'clockBloom',x:465,y:220,w:24,h:26});rooms.s27.portal={x:508,y:375,w:40,h:75,to:'s23',return:true};
 rooms.s23.hint='Za skarbem otworzyła się nowa odnoga. Prawe przejście prowadzi do mechanicznych zamków; ↑ przy portalu wraca do poprzedniego skarbca.';
 rooms.s27.hint='Zegarowy kwiat rozkwitł za przekładnią. Skarb jest na prawym podeście; portal wraca do kryształowego ogrodu.';
 function transfer(values,index){const pair=[[0,1],[1,2],[0,2]][index];if(!pair)return [...values];const [a,b]=pair,ta=values.indexOf(a),tb=values.indexOf(b);if(ta<0&&tb<0)return [...values];const disk=ta<0?tb:tb<0?ta:Math.min(ta,tb),out=[...values];out[disk]=out[disk]===a?b:a;return out;}
 ZDAdventures.transferDiscs=transfer;ZDAdventures.definitions.push(...defs);ZDAdventures.objectives.push(['airlock','Odblokuj połączone rygle'],['discBridge','Uruchom przekładnię krążków']);ZDCampaign.total=75;
})();
