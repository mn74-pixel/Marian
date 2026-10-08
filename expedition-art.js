/* Visual landmarks for optional expeditions, with shared logic-driven puzzle diagrams. */
(() => {
  const tau=Math.PI*2;
  function line(c,pts,color,w=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.stroke();}
  function oval(c,x,y,rx,ry,color,stroke=null){c.beginPath();c.ellipse(x,y,rx,ry,0,0,tau);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
  function box(c,x,y,w,h,r,color,stroke=null){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
  function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color.slice(0,7)+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
  function grad(c,x,y,w,h,a,b){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
  function text(c,s,x,y,size=12,color='#fce6b4'){c.fillStyle=color;c.font=`bold ${size}px system-ui`;c.textAlign='center';c.fillText(s,x,y);}
  function star(c,x,y,r,color){line(c,[[x-r,y],[x+r,y]],color,1);line(c,[[x,y-r],[x,y+r]],color,1);}
  function background(c,world,t){
    const kind=world.def.wonder,water=kind==='tide'||kind==='reef';c.save();
    if(world.def.backdrop)ZDWorldScenery.background(c,{def:{...world.def,look:world.def.backdrop}},t);else{c.fillStyle=grad(c,0,0,0,540,water?'#10374b':'#192741',water?'#2b7775':'#5a547c');c.fillRect(0,0,960,540);}
    for(let i=0;i<55;i++){const x=(i*139)%960,y=(i*67)%510;star(c,x,y,1+(i%4)*.3,water?'#a8ede43b':'#e7d9f24b');}
    if(kind==='prism'){
      const palettes=['#85eed6','#a7b9ff','#f3b8df'];
      if(world.def.id==='s21'){for(let j=0;j<6;j++){const x=420+j*18;line(c,[[x,25],[x-25,390]],palettes[j%3]+'22',5);}oval(c,440,395,125,18,'#9fd9e622');}
      if(world.def.id==='s19'){box(c,365,63,210,380,104,'#14335055','#bbd5c666');for(let j=0;j<5;j++)line(c,[[393+j*36,145],[393+j*36,434]],palettes[j%3]+'44',2);}
      for(let i=0;i<9;i++){
        const x=45+i*108,y=365+(i%3)*32,h=85+(i*31)%110,col=palettes[i%3];
        glow(c,x,y-h/2,80,col+'15');c.beginPath();c.moveTo(x-22,y);c.lineTo(x-19,y-h+30);c.lineTo(x,y-h);c.lineTo(x+20,y-h+30);c.lineTo(x+25,y);c.closePath();c.fillStyle=grad(c,x-22,y-h,47,h,col+'66','#193a5966');c.fill();c.strokeStyle=col+'66';c.lineWidth=1;c.stroke();line(c,[[x,y-h],[x+4,y]],'#ecfff066',1);line(c,[[x-19,y-h+30],[x+20,y-h+30]],col+'66',1);
      }
      for(let i=0;i<(world.def.backdrop?0:5);i++){const x=90+i*192;box(c,x-62,48,124,417,60,'#20395033','#91c6bc33');line(c,[[x,65],[x,452]],'#b9d0b92a',2);}
      for(let i=0;i<14;i++){const x=30+i*69,y=470+Math.sin(i)*12;line(c,[[x,y],[x+8,420],[x+20,396]],'#7bbaa688',2);oval(c,x+11,432,16,5,'#8fd4c055');}
      if(world.def.id==='s23'){glow(c,480,230,250,'#b3f3d322');for(let i=0;i<8;i++){const a=i*tau/8;line(c,[[480+Math.cos(a)*75,230+Math.sin(a)*75],[480+Math.cos(a)*125,230+Math.sin(a)*125]],palettes[i%3]+'88',6);}oval(c,480,230,53,53,'#9dcfb744','#e9efb5');}
    }else if(kind==='workshop'||kind==='aviary'){
      for(let i=0;i<6;i++){
        const x=60+i*166,y=100+(i%2)*60,r=38+(i%3)*9;c.save();c.translate(x,y);c.rotate(t*(i%2?-.05:.05));
        for(let j=0;j<12;j++){c.save();c.rotate(j*tau/12);box(c,r-4,-7,14,14,2,'#b8a47a66','#f0d29b44');c.restore();}oval(c,0,0,r,r,'#324c6066','#cbb27b88');oval(c,0,0,r*.65,r*.65,'#19344966','#bdb68566');line(c,[[-r,0],[r,0]],'#c9b08a66',5);line(c,[[0,-r],[0,r]],'#c9b08a66',5);oval(c,0,0,8,8,'#d3be8999');c.restore();
      }
      for(let i=0;i<4;i++){const x=120+i*235;line(c,[[x,0],[x,320],[x+55,320],[x+55,490]],'#102b3d',13);line(c,[[x,0],[x,320],[x+55,320],[x+55,490]],'#699b9788',7);for(const y of [80,240,400])box(c,x-9,y,18,7,2,'#e4bb8c88');}
      if(kind==='aviary'){
        glow(c,495,220,260,'#f5d08435');c.save();c.translate(500,215+Math.sin(t*.6)*5);
        for(const side of [-1,1]){c.save();c.scale(side,1);c.rotate(Math.sin(t*.6)*.07);for(let i=0;i<8;i++){c.save();c.rotate(-.7+i*.13);oval(c,90+i*5,-15,95-i*5,12,'#86c6bd99','#e3dbac99');c.restore();}c.restore();}
        oval(c,0,0,40,62,grad(c,-40,-60,80,120,'#f9dfa0','#af8379'),'#ffecc4');oval(c,8,-61,31,29,'#edcb88','#ffedbe');oval(c,19,-67,5,5,'#183348');line(c,[[35,-58],[56,-52],[34,-46]],'#f9df9c',7);oval(c,0,8,19,19,'#315268','#e4cb91');for(let i=0;i<8;i++){const a=i*tau/8+t*.25;line(c,[[Math.cos(a)*7,8+Math.sin(a)*7],[Math.cos(a)*16,8+Math.sin(a)*16]],'#e8d99c',3);}c.restore();
        for(let i=0;i<12;i++){const x=50+i*80,y=490;line(c,[[x,y],[x+Math.sin(t*.3+i)*8,y-70]],'#72b9a477',3);oval(c,x+9,y-34,19,7,'#91c8b866');}
      }else{for(let i=0;i<4;i++){const x=150+i*210,y=225;box(c,x,y,108,72,7,'#25485e','#d3b38a77');for(let k=0;k<5;k++)line(c,[[x+14,y+16+k*9],[x+90,y+16+k*9]],'#a9cbb44b',2);oval(c,x+88,y+58,4,4,'#b5e7cb');}}
    }else if(kind==='glass'||kind==='aurora'){
      for(let i=0;i<(world.def.backdrop?0:7);i++){
        const x=60+i*143,y=95+(i%3)*32;box(c,x,y,112,370,52,'#172a4940','#c2cecf3b');
        line(c,[[x+56,y+5],[x+56,465]],'#97bcb95c',2);line(c,[[x+5,y+104],[x+107,y+104]],'#97bcb94b',2);
        c.beginPath();c.moveTo(x+56,y+15);c.lineTo(x+95,y+86);c.lineTo(x+56,y+150);c.lineTo(x+17,y+86);c.closePath();c.fillStyle=['#ab93c63b','#e2b17d3b','#76d6c04b'][i%3];c.fill();
      }
      if(kind==='aurora')for(let i=0;i<6;i++){
        const y=80+i*32;c.beginPath();c.moveTo(0,y+80);c.bezierCurveTo(250,y-70,540,y+180,960,y);c.strokeStyle=['#7cf9d031','#cec1fc31','#f5d98a26'][i%3];c.lineWidth=22;c.stroke();
        const x=(t*13+i*165)%1080-60,yy=165+Math.sin(t*.5+i)*28;line(c,[[x-15,yy+6],[x,yy],[x+15,yy+6]],'#d7f7dc88',2);
      }
      glow(c,500,210,300,kind==='aurora'?'#87f5d329':'#d9bbe721');
    }else if(water){
      for(let i=0;i<(world.def.backdrop?0:5);i++){const x=i*240-60;box(c,x,55,180,455,90,'#12304966','#85c8ba33');line(c,[[x+90,55],[x+90,510]],'#81a9a84a',5);}
      for(let i=0;i<8;i++){
        const x=80+i*121,y=485;c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-45,400,x+30,370,x+Math.sin(t*.3+i)*15,315);c.strokeStyle=['#57a99488','#809bad88','#3c907a88'][i%3];c.lineWidth=8;c.stroke();
        for(let j=0;j<3;j++)oval(c,x+Math.sin(j+i)*19,410+j*24,22,6,'#78a69a55');
      }
      for(let i=0;i<14;i++){const x=(i*127+t*6)%960,y=60+(i*47)%355;oval(c,x,y,3+i%4,3+i%4,'#00000000','#b6eee652');}
      for(let i=0;i<7;i++){const x=(100+i*142+t*(i%2?4:-4)+960)%960,y=120+i%3*60;c.save();c.translate(x,y);c.scale(i%2?1:-1,1);oval(c,0,0,17,6,'#a0dbc762');line(c,[[-15,0],[-26,-7],[-26,7],[-15,0]],'#a0dbc762',3);c.restore();}
      if(kind==='reef'){
        glow(c,500,255,190,'#a3f9db32');for(let i=0;i<12;i++){const a=Math.PI+i*Math.PI/11;line(c,[[490,340],[490+Math.cos(a)*160,340+Math.sin(a)*155]],['#eacbbd99','#bfc2e399','#b4e5ca99'][i%3],15);}oval(c,490,346,165,19,'#b6cdd184','#eaf4d98a');oval(c,490,307,30,30,'#dff8e394','#f2ffe4');
      }
    }else if(kind==='train'){
      oval(c,780,105,62,62,'#e1d8b26b');glow(c,780,105,140,'#e3ddac1a');
      for(let i=0;i<4;i++){const x=(i*295-t*6+1300)%1280-140,y=410+i%2*42;oval(c,x,y,130,25,'#bdc8d729');oval(c,x+50,y-15,80,24,'#bdc8d724');}
      c.save();c.translate(0,Math.sin(t*.35)*5);
      for(let i=0;i<3;i++){
        const x=155+i*220;box(c,x,192,205,124,17,grad(c,x,190,0,130,'#67a5a7','#29496d'),'#e3d0a1');box(c,x+7,183,190,16,7,'#cfa674','#f3d69b');
        for(let k=0;k<4;k++){const xx=x+17+k*44;box(c,xx,211,31,50,13,grad(c,xx,211,0,50,'#ffe8b2','#b48d86'),'#183651');line(c,[[xx+15,212],[xx+15,260]],'#7d8b99',1);}
        line(c,[[x+4,279],[x+201,279]],'#e5c88a',3);for(const xx of [x+38,x+160]){oval(c,xx,320,19,19,'#1a344f','#ccba8b');oval(c,xx,320,8,8,'#8cafb0');}
        if(i<2)line(c,[[x+205,295],[x+220,295]],'#c5b58d',5);
      }
      box(c,782,226,62,77,14,'#568e98','#edcc97');box(c,805,178,19,54,3,'#c49e76','#efd1a0');
      for(let i=0;i<5;i++){const age=(t*.12+i/5)%1;oval(c,813-age*85,170-age*110,10+age*28,7+age*18,`rgba(222,235,217,${(1-age)*.16})`);}
      line(c,[[70,346],[910,346]],'#e2ce9c88',3);for(let x=70;x<920;x+=24)line(c,[[x,344],[x-8,353]],'#b7beac55',2);c.restore();
    }
    const v=c.createRadialGradient(480,230,90,480,270,640);v.addColorStop(0,'#10213800');v.addColorStop(1,'#0c19367a');c.fillStyle=v;c.fillRect(0,0,960,540);c.restore();
  }
  function control(c,def,state,i){
    const x=def.controls[i],color=ZDAdventures.colors[i];c.save();
    if(def.type==='filters'){
      const on=state.values[i],color=['#ff918d','#88f6af','#8dc7ff'][i];box(c,x-17,393,34,36,5,'#233e54',on?color:'#72818c');oval(c,x,404,7,7,on?color:'#455766');line(c,[[x-9,419],[x+9,419]],on?color:'#718b93',3);text(c,['R','G','B'][i],x,387,9,color);text(c,on?'WŁ.':'WYŁ.',x,443,8);
    }else if(def.type==='valves'){
      line(c,[[x,435],[x,404]],'#b4c6b5',5);oval(c,x,405,21,21,'#1b3449','#eddba8');
      for(let j=0;j<4;j++){const a=-Math.PI*.75+j*Math.PI*.5;line(c,[[x+Math.cos(a)*14,405+Math.sin(a)*14],[x+Math.cos(a)*18,405+Math.sin(a)*18]],'#f7e7b7',2);}
      const a=-Math.PI*.75+state.values[i]*Math.PI*.5;line(c,[[x,405],[x+Math.cos(a)*15,405+Math.sin(a)*15]],'#92f4df',3);oval(c,x,405,3,3,'#ffdf98');text(c,String(state.values[i]),x,437,11);text(c,`CEL ${def.target[i]}`,x,376,8);
    }else if(def.type==='tiles'){
      box(c,x-19,391,38,38,4,'#365669','#e3c89a');text(c,ZDAdventures.symbols[state.values[i]],x,417,23,ZDAdventures.colors[state.values[i]]);text(c,['1↔2','2↔3','1↔3'][i],x,443,9);
    }else if(def.type==='mirrors'){
      line(c,[[x,435],[x,398]],'#9abdb8',3);oval(c,x,411,16,16,'#1b3852','#cde4d0');const d=state.values[i]?1:-1;line(c,[[x-11,411-d*11],[x+11,411+d*11]],'#b9f6f0',4);text(c,String(i+1),x,443,9);
    }else{
      const on=state.values[i];box(c,x-14,405,on?28:24,28,5,on?'#a6c1a2':'#6c8090','#eed4a1');oval(c,x,403,5,5,'#293f52','#e0c796');text(c,String(def.weights[i]),x,425,13,on?'#20394b':'#f3dfb5');text(c,on?'−':'+',x,444,10);
    }c.restore();
  }
  function collectible(c,item,t){
    c.save();const x=item.x+12,y=item.y+13+Math.sin(t*2)*2;glow(c,x,y,24,item.kind==='clue'?'#efce8a35':'#8df7d23d');
    if(item.kind==='clue'){
      box(c,x-11,y-13,23,26,2,'#e9d7a7','#654e50');box(c,x-13,y-14,26,4,2,'#ffedbe');box(c,x-13,y+10,26,4,2,'#c3aa7b');for(let i=0;i<3;i++)line(c,[[x-6,y-6+i*5],[x+6-i*2,y-6+i*5]],'#766479',1.2);oval(c,x+7,y+7,3,3,'#659fa1');
    }else if(item.id==='prism'){
      c.beginPath();c.moveTo(x,y-18);c.lineTo(x+13,y+8);c.lineTo(x,y+15);c.lineTo(x-13,y+8);c.closePath();c.fillStyle=grad(c,x-13,y-18,26,33,'#e9e7ce','#63bcc5');c.fill();c.strokeStyle='#ffe8ad';c.stroke();line(c,[[x,y-18],[x,y+15]],'#fff1c9',1);
    }else{
      for(let i=0;i<7;i++){const a=Math.PI+i*Math.PI/6;line(c,[[x,y+10],[x+Math.cos(a)*13,y+4+Math.sin(a)*17]],['#e8c6ad','#c9b9e3'][i%2],4);}oval(c,x,y+9,13,3,'#edd9b4');
    }c.restore();
  }
  function board(c,world){
    const def=world.def.puzzle,state=world.puzzleState();c.clearRect(0,0,540,200);box(c,0,0,540,200,12,'#152e43','#88b6b0');
    if(def.type==='mirrors'){
      const xy=([x,y])=>[65+x*65,35+y*31];for(let x=0;x<7;x++)for(let y=0;y<5;y++){const [xx,yy]=xy([x,y]);oval(c,xx,yy,1.5,1.5,'#658399');}
      const trace=ZDAdventures.traceMirrors(state.values),path=trace.path.map(xy);line(c,path,'#fadd8780',9);line(c,path,'#fff1ac',3);
      text(c,'ŚWIATŁO',65,22,10);oval(c,65,97,8,8,'#ffe5a0');
      [[2,2],[2,0],[5,0]].forEach((p,i)=>{const [x,y]=xy(p),d=state.values[i]?1:-1;oval(c,x,y,16,16,'#254458','#a2d2d0');line(c,[[x-10,y-d*10],[x+10,y+d*10]],'#d5f8ea',4);text(c,String(i+1),x+23,y+5,13);});
      const [x,y]=xy([5,4]);oval(c,x,y,13,13,trace.hit?'#ffdf85':'#45687b','#d8bf8d');text(c,trace.hit?'OTWARTE ✓':'ODBIORNIK',x,187,11);
    }else{
      const mass=state.values.reduce((n,v,i)=>n+v*def.weights[i],0),tilt=Math.max(-.15,Math.min(.15,(mass-def.mass)*.025));
      line(c,[[270,155],[270,60]],'#dac79b',7);box(c,235,155,70,12,4,'#ae987d');
      c.save();c.translate(270,65);c.rotate(tilt);line(c,[[-150,0],[150,0]],'#e5d29f',5);for(const x of [-145,145]){line(c,[[x,0],[x-37,65],[x+37,65],[x,0]],'#86b7bd',1.5);line(c,[[x-40,65],[x+40,65]],'#d7c291',5);}c.restore();
      text(c,`${mass}`,125,100,20);text(c,String(def.mass),415,100,20);text(c,'WYBRANE ODWAŻNIKI',125,185,11);text(c,'WZORZEC',415,185,11);
    }
  }
  window.ZDExpeditionArt={background,control,collectible,board};
})();
