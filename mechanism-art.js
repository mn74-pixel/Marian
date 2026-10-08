/* Animated architectural machinery and direct, state-driven puzzle diagrams. */
(() => {
 const line=(c,p,color,w=1)=>{c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.stroke();};
 const box=(c,x,y,w,h,r,color,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}};
 const oval=(c,x,y,rx,ry,color,stroke)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}};
 const label=(c,s,x,y,size=10,color='#f0dfb3')=>{c.textAlign='center';c.font=`bold ${size}px system-ui`;c.fillStyle='#142b40';c.fillText(s,x+1,y+1);c.fillStyle=color;c.fillText(s,x,y);};
 function background(c,w,t){c.save();const kind=w.def.wonder,g=c.createLinearGradient(0,0,0,540);g.addColorStop(0,kind==='clockgarden'?'#173b48':'#193149');g.addColorStop(1,kind==='clockgarden'?'#4f7567':'#655265');if(w.def.backdrop)ZDWorldScenery.background(c,{def:{...w.def,look:w.def.backdrop}},t);else{c.fillStyle=g;c.fillRect(0,0,960,540);}
  for(let i=0;i<(w.def.backdrop?0:6);i++){const x=20+i*185;box(c,x,45,124,410,58,'#0c293944','#acbfa944');line(c,[[x+62,50],[x+62,450]],'#bdd3b32b',3);}
  if(kind==='archive')for(let i=0;i<8;i++){const x=90+(i%4)*240,y=115+Math.floor(i/4)*185;box(c,x-44,y-35,88,125,4,'#95877377','#d8c49b');for(let j=0;j<5;j++)line(c,[[x-28,y+j*12],[x+26-j*3,y+j*12]],'#314c6555',2);oval(c,x,y+70,18,18,'#274e5b66','#b8c5a955');}
  else if(kind==='clockgarden'){
   c.save();c.translate(485,230);c.rotate(t*.025);for(let i=0;i<12;i++){c.save();c.rotate(i*Math.PI/6);oval(c,0,-93,21,59,i%2?'#a4d6bf88':'#e5c99b99','#dfe7bf99');line(c,[[0,-140],[0,-58]],'#648a8899',2);c.restore();}c.restore();
   oval(c,485,230,57,57,'#2f5660','#f2dfaa');for(let i=0;i<12;i++){const a=i*Math.PI/6;line(c,[[485+Math.cos(a)*44,230+Math.sin(a)*44],[485+Math.cos(a)*51,230+Math.sin(a)*51]],'#ebd79e',2);}line(c,[[485,230],[485+Math.cos(t*.03)*30,230+Math.sin(t*.03)*30]],'#e4f3ce',3);line(c,[[485,230],[485+Math.cos(t*.12)*43,230+Math.sin(t*.12)*43]],'#d6b982',2);oval(c,485,230,5,5,'#ffe7ac');
   for(let i=0;i<12;i++){const x=50+i*81;line(c,[[x,510],[x+Math.sin(t*.4+i)*9,395]],'#578c7966',5);oval(c,x+9,453,24,7,'#a1d6b266');}
  }else{
   for(let i=0;i<4;i++){const x=100+i*245,y=105+(i%2)*90;line(c,[[x,0],[x,y]],'#a9b99a66',7);box(c,x-33,y,66,162,15,'#294f6177','#bdc8a888');const offset=(Math.sin(t*.35+i)+1)*24;box(c,x-22,y+24+offset,44,52,5,'#a3b59b66','#e5d1a188');for(let k=0;k<5;k++)line(c,[[x-20,y+99+k*8],[x+20,y+99+k*8]],'#79999e77',2);line(c,[[x,y+162],[x,y+210]],'#aaafa588',6);}
  }
  for(let i=0;i<18;i++)oval(c,40+(i*137)%900,60+(i*73)%400+Math.sin(t*.3+i)*3,1,1,'#d4e6d735');c.restore();
 }
 function draw(c,w){const d=w.def.puzzle;if(!d||!['interlock','towers'].includes(d.type))return;const s=w.puzzleState();c.save();
  if(d.type==='interlock'){
   const xs=[180,285,390];for(let i=0;i<3;i++){const x=xs[i],open=s.values[i];box(c,x-29,251,58,59,6,'#16344a','#9ebdab');line(c,[[x-22,280],[x+22,280]],'#273f55',15);box(c,x-24+(open?22:0),274,27,12,3,open?'#8aeac4':'#c9a078','#e2d4af');label(c,String(i+1),x,242,12);label(c,open?'OTWARTY':'ZAMKNIĘTY',x,325,8);const dep=d.dependencies[i];if(dep){line(c,[[x,311],[x,339+i*5],[xs[dep[0]],339+i*5],[xs[dep[0]],313]],s.values[dep[0]]?'#a7f3ce':'#91795e',2);label(c,`${dep[0]+1} → ${i+1}`,x,378,8);}}
  }else{
   const xs=[185,285,385],height=[0,0,0];for(let i=0;i<3;i++){line(c,[[xs[i],250],[xs[i],313]],'#a9bca4',4);box(c,xs[i]-37,313,74,6,2,'#bca47e');label(c,['L','Ś','P · CEL'][i],xs[i],335,10);}
   for(let disk=2;disk>=0;disk--){const col=s.values[disk],x=xs[col],width=28+disk*15,y=303-height[col]*12;height[col]++;box(c,x-width/2,y,width,10,3,['#95ebcf','#c4b1ec','#efc58b'][disk],'#193c53');line(c,[[x-width/2+4,y+2],[x+width/2-4,y+2]],'#ffffff66',1);}
   label(c,`RUCHY: ${s.moves||0}`,285,379,9);label(c,s.solved?'PRZEKŁADNIA GOTOWA ✓':'MAŁY KRĄŻEK NA WIĘKSZYM',285,205,9);
  }
  for(let i=0;i<3;i++){const x=d.controls[i],active=s.last===i&&s.flash>0;box(c,x-16,396,32,35,5,'#2b485c',active?(s.blocked?'#efab8d':'#d9ffc9'):'#adc3ae');const a=active?-.45:.35;line(c,[[x,421],[x+Math.sin(a)*11,404]],'#e0bf8b',4);oval(c,x+Math.sin(a)*11,403,4,4,active?'#e2f9bd':'#bed4c2');label(c,d.type==='interlock'?String(i+1):['L↔Ś','Ś↔P','L↔P'][i],x,443,9);if(s.solved)label(c,'✓',x,378,15,'#b5ffd1');if(Math.abs(w.p.x+11-x)<23&&w.p.ground)label(c,'↑',x,389,12);}
  line(c,[[420,280],[490,280],[490,415],[562,415]],s.solved?'#b4ffd0':'#688081',3);c.restore();
 }
 window.ZDMechanismArt={background,draw};
})();
