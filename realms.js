/* 48 authored room arrangements on a persistent 8 × 6 graph. No random regeneration. */
(() => {
  const rooms={},id=(row,col)=>'r'+String(row*8+col).padStart(2,'0');
  const colors=['#ffd075','#83d8e3','#e9a0cf','#a6df8b','#c0b0ff'];
  const themes=['canal','casino','garden','workshop','library','cavern'];
  // A route describes connections between shelves, not one floor ladder per shelf.
  // [x, destination shelf, supporting shelf (-1 = ground), optional rope].
  const layouts=[
    {p:[[165,355,130],[350,285,115]],r:[[193,0,-1],[398,1,-1]]},
    {p:[[145,350,150],[250,260,160],[375,350,130]],r:[[180,0,-1],[275,1,0],[470,2,-1]]},
    {p:[[160,365,100],[320,280,160]],r:[[188,0,-1],[368,1,-1]]},
    {p:[[145,315,360],[245,225,140]],r:[[175,0,-1],[470,0,-1,'rope'],[280,1,0]]},
    {p:[[140,370,150],[245,290,160],[365,210,140]],r:[[170,0,-1],[270,1,0],[390,2,1,'rope']]},
    {p:[[145,305,115],[340,305,170]],r:[[180,0,-1,'rope'],[380,1,-1,'rope']]},
    {p:[[140,355,360],[165,260,130],[360,260,120]],r:[[460,0,-1],[195,1,0],[390,2,0,'rope']]},
    {p:[[145,310,155],[350,260,145],[240,220,130]],r:[[175,0,-1],[380,1,-1,'rope'],[265,2,0]]},
    {p:[[145,235,150],[260,315,150],[375,390,130]],r:[[460,2,-1],[395,1,2],[285,0,1]]},
    {p:[[145,295,100],[380,295,130]],r:[[180,0,-1],[465,1,-1,'rope']],bridge:true},
    {p:[[140,375,360],[150,295,125],[250,215,145]],r:[[450,0,-1],[185,1,0],[265,2,1]]},
    {p:[[150,335,170],[295,255,210]],r:[[180,0,-1],[310,1,0],[470,1,-1,'rope']]}
  ];
  for(let row=0;row<6;row++)for(let col=0;col<8;col++){
    const n=row*8+col,variant=n<4?n:(col+row*5)%12,layout=layouts[variant];
    const dx=row%2?6:-4,dy=-(row%3)*8;
    const upper=layout.p.map(([x,y,w])=>({x:x+dx,y:y+dy,w:w-(row%2)*4,h:18}));
    const gap=n>=4&&[0,2,3,5,7].includes(variant)&&col%3!==0?{x:274-row*2,w:44+row*5}:null;
    if(gap&&[0,2].includes(variant))upper.forEach(p=>{p.y=Math.min(p.y,310+dy);});
    const floor=gap?[{x:0,y:450,w:gap.x,h:100},{x:gap.x+gap.w,y:450,w:576-gap.x-gap.w,h:100}]:[{x:0,y:450,w:576,h:100}];
    const ladders=layout.r.map(([x,to,from,kind])=>({x:x+dx,top:upper[to].y,bottom:from<0?450:upper[from].y,w:24,kind:kind||'ladder'}));
    // An optional timed bridge has a safe floor below; its loss never traps the player.
    const bridges=layout.bridge?[{x:245+dx,y:295+dy,w:135,h:18,crumble:true}]:[];
    const notes=upper.map(p=>({x:p.x+p.w-25,y:p.y-29,w:16,h:20}));
    notes.push({x:125,y:415,w:16,h:20},{x:505,y:415,w:16,h:20});
    const def={id:id(row,col),row,col,index:n,theme:themes[(row+Math.floor(col/3))%6],variant,
      width:576,platforms:[...floor,...upper,...bridges],ladders,notes,spikes:[],patrols:[],barriers:[],items:[],links:{},
      spawn:{x:40,y:414},hint:layout.bridge?'Pękające deski ostrzegają przed zapadnięciem. Dołem też przejdziesz.':ladders.some(l=>l.kind==='rope')?'↑ ↓: chwyć linę i wspinaj się. Spacja + kierunek: odskocz.':ladders.some(l=>l.bottom<450)?'Szukaj krótkich drabin między podestami. Do góry prowadzi kilka etapów.':'Odkrywaj przejścia po bokach i drabiny prowadzące wyżej lub niżej.'};
    if(col>0)def.links.left={to:id(row,col-1),spawn:{x:524,y:414}};
    if(col<7)def.links.right={to:id(row,col+1),spawn:{x:30,y:414}};
    // Safe entrance margins and all ladder feet are kept clear of hazards.
    if(row>=1&&col%3===1&&[0,2,3,5,7,9].includes(variant)){const safeRight=!ladders.some(l=>l.x>390&&l.x<485);const min=safeRight?420:120,max=safeRight?440:136;def.patrols.push({x:min,y:436,w:20,h:14,min,max,speed:24+row*4});}
    if(row>=2&&col%3===0)def.barriers.push({x:286,y:385,w:12,h:65,period:5.8-row*.2,on:1.5+row*.13,phase:col*.3});
    if(row>=2&&col%3===2&&[0,2,5].includes(variant)){const shelf=upper[0];def.spikes.push({x:shelf.x+shelf.w-24,y:shelf.y-12,w:20,h:12});notes[0].x=shelf.x+48;}
    if(row>=3&&col%4===3){floor[0].belt=(col%2?1:-1)*(20+row*4);floor[0].beltStart=160;floor[0].beltEnd=Math.min(240,floor[0].w-20);}
    // Optional valuables use different ledges in different rooms, inviting detours.
    if(n%5===4){const p=upper[upper.length-1];def.items.push({kind:'treasure',id:'t'+n,x:p.x+60,y:p.y-26,w:18,h:22});}
    rooms[def.id]=def;
  }
  // Two or three shafts between floors make loops, not a single hallway.
  const shafts=[[0,7],[0,0],[1,0],[1,3],[2,7],[2,3],[3,0],[3,7],[4,7],[4,3]];
  for(const [row,col] of shafts){
    const upper=rooms[id(row,col)],lower=rooms[id(row+1,col)],requires='key'+row;
    upper.ladders.push({x:488,top:450,bottom:515,w:24,to:lower.id,direction:'down',requires,color:colors[row],spawn:{x:85,y:414}});
    lower.ladders.push({x:96,top:188,bottom:450,w:24,to:upper.id,direction:'up',spawn:{x:477,y:414}});
    upper.links.down={to:lower.id,requires};lower.links.up={to:upper.id};
  }
  for(let row=0;row<5;row++){
    const def=rooms[id(row,row%2?2:5)],p=def.platforms.filter(p=>p.h===18&&!p.crumble)[0];
    def.items.push({kind:'key',id:'key'+row,color:colors[row],x:p.x+58,y:p.y-30,w:24,h:26});
  }
  for(const [row,col] of [[1,4],[3,6],[5,2]]){
    const def=rooms[id(row,col)],p=def.platforms.filter(p=>p.h===18&&!p.crumble).at(-1);
    def.items.push({kind:'seal',id:'seal'+row,x:p.x+58,y:p.y-30,w:24,h:26});
  }
  const secret=rooms.r02.platforms.filter(p=>p.h===18&&!p.crumble)[1];
  rooms.r02.saxCache={x:secret.x+secret.w-45,y:secret.y-28,w:32,h:28};
  rooms.r00.hint='← →: ruch · Spacja: skok · ↑ ↓: drabiny. Przejdź w prawo i rozejrzyj się na podestach.';
  rooms.r01.hint='Z dolnego balkonu przejdź do krótszej drabiny — prowadzi na kolejne piętro.';
  rooms.r02.hint='Na górnym podeście stoi stary futerał. Podejdź i naciśnij ↑.';
  rooms.r03.hint='Po prawej wisi lina: ↑ ↓ — chwyt i wspinanie, Spacja + kierunek — odskok.';
  rooms.r47.exit={x:512,y:365,w:45,h:85};
  window.ZDRealms=rooms;
  window.ZDCampaign={start:'r00',rows:6,cols:8,colors,shafts,total:48};
})();
