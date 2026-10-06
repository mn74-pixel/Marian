/* Five-room connected expedition. Earlier discoveries power later mechanisms. */
(() => {
 const rooms=ZDRealms;
 const defs=[
 {host:'s14',id:'waterFeed',type:'valves',controls:[120,285,455],initial:[0,0,0],target:[1,3,2],destination:'s15',clue:'Zasilaj kanał kolejno: 1 · 3 · 2. Wskazówki manometrów pokazują przepływ. Dopiero woda uruchomi dalsze instalacje.',hint:'Wyreguluj trzy dopływy, aby zasilić następny pokój.'},
 {host:'s16',id:'generator',type:'lights',controls:[120,285,455],target:[1,1,1],requiresPuzzles:['waterFeed'],requiresClue:'flowPlan',destination:'s17',clue:'Woda napędza generator. Zapal trzy lampy: dźwignie zmieniają 1+2, 2+3 i 3. Przewód prowadzi do następnego przejścia.',hint:'Woda już płynie. Uruchom wszystkie lampy generatora.'},
 {host:'s17',id:'beacon',type:'mirrors',controls:[120,285,455],initial:[1,1,0],target:[0,0,1],requiresPuzzles:['generator'],destination:'s18',clue:'Generator zasila latarnię. Obracaj trzy lustra, kierując promień do odbiornika. Odbiornik otworzy duży skarbiec.',hint:'Doprowadź światło do odbiornika. Śledź promień i przewód do wrót.'}
 ];
 const layouts=[[[140,365,160],[280,285,175]],[[145,340,305],[245,240,145]],[[140,365,160],[280,285,175]],[[145,340,305],[245,240,145]],[[140,365,160],[280,285,175]]];
 for(let i=0;i<5;i++){const id='s'+(14+i),s=layouts[i];rooms[id]={id,index:61+i,secret:true,expedition:true,parent:i?'s'+(13+i):'r41',wonder:i===4?'aurora':i%2?'workshop':'tide',theme:'canal',row:6,col:13+i,width:576,variant:0,spawn:{x:65,y:414},platforms:[{x:0,y:450,w:576,h:100},...s.map(([x,y,w])=>({x,y,w,h:18}))],ladders:[{x:175,top:s[0][1],bottom:450,w:24},{x:292,top:s[1][1],bottom:s[0][1],w:24,kind:'rope'}],notes:s.map(([x,y])=>({x:x+45,y:y-29,w:16,h:20})),items:[],spikes:[],patrols:[],barriers:[],links:{},hint:'Ta wyprawa łączy wodę, energię i światło. Lista pod grą pamięta wykonane zadania.'};}
 for(let i=14;i<18;i++){const id='s'+i,next='s'+(i+1),requiresPuzzle={14:'waterFeed',16:'generator',17:'beacon'}[i];rooms[id].links.right={to:next,requiresPuzzle,spawn:{x:30,y:414}};rooms[next].links.left={to:id,spawn:{x:524,y:414}};}
 rooms.r41.portal={x:508,y:375,w:40,h:75,to:'s14',requiresPuzzles:['lightPath','pressure','mosaic']};
 rooms.s14.portal={x:22,y:375,w:40,h:75,to:'r41',return:true};rooms.s18.portal={x:508,y:375,w:40,h:75,to:'r41',return:true};
 for(const def of defs){rooms[def.host].puzzle=def;rooms[def.host].hint=def.hint;}
 ZDAdventures.clues.flowPlan={title:'Plan połączonych instalacji',text:'Najpierw woda, potem generator, na końcu latarnia. Dopływy: 1 · 3 · 2. Rozwiązane mechanizmy pozostają zasilone po powrocie. Wróć do prawego przejścia, kiedy zapali się przewód.'};
 rooms.s15.items.push({kind:'clue',id:'flowPlan',x:345,y:210,w:24,h:26});rooms.s18.items.push({kind:'treasure',id:'lightCrown',x:410,y:255,w:24,h:26});rooms.s18.hint='Woda, generator i latarnia otworzyły ten skarbiec. Skarb czeka na górnym podeście; prawy portal skraca powrót.';
 ZDAdventures.definitions.push(...defs);ZDCampaign.total=66;
 ZDAdventures.objectives=[['lightPath','Skieruj światło do odbiornika'],['pressure','Uruchom manometry warsztatu'],['mosaic','Odtwórz rysunek mechanicznego ptaka'],['waterFeed','Zasil dopływy w nowej wyprawie'],['generator','Uruchom generator'],['beacon','Zapal latarnię i otwórz skarbiec']];
})();
