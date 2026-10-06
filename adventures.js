/* Three optional musical adventures. Symbols make every puzzle playable without audio. */
(() => {
  const symbols=['●','◆','✦'],colors=['#80e5d2','#ffc87c','#d6acff'];
  const definitions=[
    {host:'r06',id:'echo',type:'sequence',controls:[140,285,430],target:[2,0,1],destination:'s01',
      clue:'Odczytaj zapis od lewej: ✦ → ● → ◆. Podejdź do dzwonka i naciśnij ↑.',
      hint:'Trzy dzwonki i zapis na ścianie. Symbole wskazują melodię; nie musisz jej słyszeć.'},
    {host:'r22',id:'orbit',type:'dials',controls:[140,320,450],target:[2,1,2],destination:'s02',
      clue:'Ustaw od lewej: ✦ · ◆ · ✦. ↑ obraca wybrany i następny krążek (po prawym — lewy). Cykl: ● → ◆ → ✦ → ●.',
      hint:'Krążki pozytywki zatrzymały się w złym położeniu. Ustaw symbole zgodnie ze wzorem.'},
    {host:'r38',id:'chord',type:'lights',controls:[130,270,430],target:[1,1,1],destination:'s03',
      clue:'Zapal trzy gwiazdy. Lewy przełącznik zmienia 1+2, środkowy 2+3, prawy tylko 3. ↑ przełącza.',
      hint:'Trzy przełączniki poruszają gwiazdy. Śledź ich połączenia i zapal cały gwiazdozbiór.'}
  ];
  const rooms=window.ZDRealms;
  for(const [i,puzzle] of definitions.entries()){
    const host=rooms[puzzle.host];host.puzzle=puzzle;host.portal={x:508,y:375,w:40,h:75,to:puzzle.destination,puzzle:puzzle.id};
    host.notes.filter(n=>n.y===415).forEach((n,i)=>n.x=i?476:72);
    host.spikes=[];host.patrols=[];host.barriers=[];host.hint=puzzle.hint;
    const shelves=[
      [[155,365,145],[285,285,175]],
      [[145,345,300],[240,245,135]],
      [[145,365,150],[280,285,190]]
    ][i].map(([x,y,w])=>({x,y,w,h:18}));
    const ladders=[
      [{x:185,top:365,bottom:450,w:24},{x:295,top:285,bottom:365,w:24,kind:'rope'}],
      [{x:170,top:345,bottom:450,w:24,kind:'rope'},{x:410,top:345,bottom:450,w:24},{x:275,top:245,bottom:345,w:24}],
      [{x:175,top:365,bottom:450,w:24},{x:285,top:285,bottom:365,w:24,kind:'rope'}]
    ][i];
    const top=shelves.at(-1);
    rooms[puzzle.destination]={id:puzzle.destination,index:48+i,row:6,col:i,secret:true,parent:puzzle.host,wonder:['bloom','orbit','whale'][i],
      theme:['garden','library','cavern'][i],width:576,variant:0,spawn:{x:65,y:414},platforms:[{x:0,y:450,w:576,h:100},...shelves],ladders,
      notes:shelves.map(s=>({x:s.x+35,y:s.y-29,w:16,h:20})),items:[{kind:'fragment',id:'fragment'+i,x:top.x+top.w-42,y:top.y-30,w:24,h:26,color:colors[i]}],
      spikes:[],patrols:[],barriers:[],links:{},portal:{x:22,y:375,w:40,h:75,to:puzzle.host,return:true},
      hint:i===2?'Weź fragment melodii z górnego podestu. Z kompletem trzech zagraj J / ♫ na okrągłym znaku pośrodku podłogi.':'Ukryta komnata! Wejdź na górny podest po fragment melodii. ↑ przy lewym portalu prowadzi z powrotem.'};
  }
  window.ZDAdventures={definitions,symbols,colors};
  window.ZDCampaign.total=51;window.ZDCampaign.mainTotal=48;
})();
