/* Decorative layer only: stable landmarks, material wear and restrained ambient motion. */
(() => {
 const line=(c,p,col,w=1)=>{c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=col;c.lineWidth=w;c.stroke();};
 const box=(c,x,y,w,h,r,col,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=col;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}};
 const oval=(c,x,y,rx,ry,col)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill();};
 function background(c,world,t){
  const theme=world.def.theme,index=world.def.index,water=['canal'].includes(theme),secret=world.def.secret;c.save();
  // Details sit behind collisions and respect the empty central travel area.
  for(const x of [38,898]){
   box(c,x,156,24,307,6,'#10273839','#d2dfbd16');for(let y=178;y<460;y+=35){line(c,[[x+3,y],[x+21,y]],'#d2c7a52b',1);line(c,[[x+5,y+2],[x+18,y+2]],'#11263840',1);}
  }
  if(!secret&&index%4===1){
   const cx=480,cy=185;c.save();c.translate(cx,cy);oval(c,0,0,83,83,'#102b3e66');oval(c,0,0,74,74,'#86afa129');
   for(let j=0;j<12;j++){const a=j*Math.PI/6;line(c,[[Math.cos(a)*16,Math.sin(a)*16],[Math.cos(a)*70,Math.sin(a)*70]],'#d7cf9766',2);}oval(c,0,0,16,16,'#c9c39866');oval(c,0,0,80,80,'#00000000');c.beginPath();c.arc(0,0,80,0,Math.PI*2);c.strokeStyle='#e0bf8e55';c.lineWidth=4;c.stroke();c.restore();
  }else if(!secret&&index%4===2){
   for(const cx of [340,600]){box(c,cx-46,125,92,221,42,'#112b4166','#98c5b74b');for(let j=0;j<3;j++){const yy=155+j*60;line(c,[[cx-35,yy],[cx+35,yy]],'#a6c9b955',2);line(c,[[cx,yy-25],[cx,yy+25]],'#b8d5ac44',2);}line(c,[[cx-40,350],[cx+40,350]],'#d2c19c66',4);}
  }
  const x=index%2?810:90,y=240+(index%3)*34;
  if(theme==='garden'||world.def.wonder==='glass'){
   for(const xx of [90,840]){
    box(c,xx-20,414,40,30,5,'#a4786555','#f0d1a13b');box(c,xx-24,409,48,8,3,'#cfaa7b88');
    for(let j=0;j<5;j++){const a=j*.9,sway=Math.sin(t*.5+j)*3,px=xx+Math.sin(a)*22,py=390-j*8;line(c,[[xx,410],[px+sway,py]],'#72b29377',2);oval(c,px+sway,py,10,4,['#aed88677','#74bfb177','#c2d99677'][j%3]);}
   }
   c.save();c.translate(x,y);line(c,[[0,-50],[0,-20]],'#b3bba270',2);box(c,-21,-20,42,61,19,'#194a4d30','#d4d09f88');for(let i=-12;i<=12;i+=8)line(c,[[i,-14],[i,33]],'#c9c59466');line(c,[[-23,33],[23,33]],'#d4bc9099',3);oval(c,2,12,9,6,'#ead59899');line(c,[[4,15],[9,26]],'#ebc89999',2);c.restore();
  }else if(theme==='canal'){
   for(const xx of [97,857]){box(c,xx-8,218,16,210,6,'#263e5380','#90c7bb66');for(let k=0;k<5;k++)box(c,xx-12,230+k*41,24,6,2,'#91a7a677');
    oval(c,xx,286,22,22,'#233e4a');line(c,[[xx-14,286],[xx+14,286]],'#d0b88a',3);line(c,[[xx,272],[xx,300]],'#d0b88a',3);oval(c,xx,286,4,4,'#f1d39a');
    for(let i=0;i<5;i++){const phase=(t*.15+i*.2)%1;oval(c,xx+13,333+phase*73,1.4,2.6,'#b5f6eb66');}
   }
   for(let i=0;i<10;i++){const xx=30+i*100,yy=460+Math.sin(t*.7+i)*3;line(c,[[xx,yy],[xx+29,yy],[xx+37,yy-1]],'#9adbc331',1);}
  }else if(theme==='library'){
   box(c,x-32,y-44,64,87,5,'#2a354b88','#ddb78f88');box(c,x-26,y-38,52,75,3,'#b6a58d77');
   for(let i=0;i<5;i++)line(c,[[x-17,y-25+i*11],[x+16-i*2,y-25+i*11]],'#503f6355');
   c.save();c.translate(x,y);c.rotate(-.2);line(c,[[-16,24],[18,-24]],'#f0d8aa99',2);for(let i=0;i<7;i++)line(c,[[i*3-9,12-i*5],[i*3+2,7-i*5]],'#a9d5bcaa',2);c.restore();
   for(const xx of [120,840]){box(c,xx-25,432,50,11,2,'#cba57b77');box(c,xx-21,419,41,12,2,'#527f8b88');box(c,xx-28,412,55,7,2,'#bf889588');}
  }else if(theme==='casino'){
   for(const xx of [93,864]){box(c,xx-24,298,48,51,5,'#28444f88','#d8c08b88');for(let k=0;k<3;k++){oval(c,xx-13+k*13,317,4,4,['#f3cf8e','#94d5ba','#cfa3d3'][k]);line(c,[[xx-13+k*13,326],[xx-13+k*13,337]],'#be9c7d',2);}line(c,[[xx,349],[xx,426]],'#977b6e88',4);}
  }else if(theme==='workshop'||world.def.wonder==='workshop'||world.def.wonder==='aviary'){
   for(const xx of [85,860]){box(c,xx-31,270,62,91,6,'#24445566','#bfa78266');for(let j=0;j<4;j++){const px=xx-21+j*14;line(c,[[px,283],[px,324+j%2*12]],'#a7bfc077',3);oval(c,px,279,5,5,'#d4bc9288');line(c,[[px-4,327+j%2*12],[px+4,327+j%2*12]],'#d4bc9288',3);}}
  }else{
   for(const xx of [90,850]){line(c,[[xx,25],[xx+5,90],[xx,145]],'#76a1b73b',3);for(let i=0;i<6;i++)oval(c,xx+(i%2)*6,320+i*21,3,6,'#8bd5e832');}
  }
  // Small motes vary per room, but never resemble collectible gold notes.
  for(let i=0;i<12;i++){const px=(index*37+i*79)%920+20,py=75+(i*53+index*17)%345+Math.sin(t*.3+i)*6;c.globalAlpha=.15+(Math.sin(t*.8+i)+1)*.08;oval(c,px,py,water?1.8:1,water?1.8:1,'#c6eee4');}c.globalAlpha=1;
  if(!secret){const xx=index%2?730:220;line(c,[[xx,450],[xx+16,437],[xx+27,444],[xx+35,433]],'#d3ba8e26',1);}
  c.restore();
 }
 function opened(c,item){c.save();const x=item.x+12,y=item.y+20;box(c,x-12,y-6,24,12,2,'#425268','#b49b7d');box(c,x-12,y-16,24,7,2,'#8a735b','#dac392');box(c,x-9,y-4,18,7,1,'#1b3042');c.restore();}
 window.ZDEnvironmentDetails={background,opened};
})();
