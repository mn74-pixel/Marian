/* Twelve distinct architectural silhouettes; cached static paint, restrained ambient motion. */
(() => {
 const cache=new Map(),W=960,H=540;
 const line=(c,p,col,w=1)=>{c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=col;c.lineWidth=w;c.stroke();};
 const box=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};
 const oval=(c,x,y,rx,ry,col,stroke)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}};
 const poly=(c,p,col)=>{c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=col;c.fill();};
 const palettes={reservoir:['#102d43','#356779'],rooftops:['#29374e','#c18c78'],observatory:['#111d3c','#515e85'],forest:['#173a45','#548774'],trainyard:['#26374b','#956d62'],archive:['#302944','#806775'],forge:['#263449','#89594e'],aquarium:['#102d48','#2f807d'],ruins:['#273d50','#90856c'],stage:['#30213f','#81576a'],ice:['#193c60','#84adbb'],hangar:['#183747','#657b87']};
 function lamp(c,x,y,col='#f1c88e'){box(c,x-4,y-9,8,18,col);box(c,x-8,y+9,16,3,'#82766a');}
 function make(kind,index){const cv=document.createElement('canvas');cv.width=1440;cv.height=810;const c=cv.getContext('2d');c.scale(1.5,1.5);const p=palettes[kind],g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,p[0]);g.addColorStop(1,p[1]);box(c,0,0,W,H,g);const shift=(index%3-1)*40;
  if(kind==='rooftops'){
   oval(c,735,105,48,48,'#f1d5ae88');for(let row=0;row<2;row++)for(let i=0;i<9;i++){const x=i*125+shift-row*35,y=210+((i*37+index*11)%85)+row*100;box(c,x,y,105,330,row?'#253745':'#415267');poly(c,[[x-8,y],[x+52,y-48],[x+114,y]],row?'#594958':'#686575');for(let j=0;j<4;j++)for(let k=0;k<3;k++)box(c,x+16+k*29,y+24+j*48,11,19,(i+j+k)%4?'#aac2c12e':'#efc08a88');}line(c,[[40,85],[240,145],[490,110],[770,158],[940,106]],'#151f33',2);for(let x=80;x<900;x+=90)lamp(c,x,110+Math.sin(x)*17,'#ffd695');
  }else if(kind==='reservoir'){
   for(let i=0;i<5;i++){const x=45+i*200;box(c,x,125,121,360,'#183c50');box(c,x+8,125,105,345,'#265467');oval(c,x+60,125,60,18,'#557a81');oval(c,x+60,470,60,18,'#173e51');for(let y=174;y<460;y+=58)line(c,[[x+8,y],[x+111,y]],'#92b7ab44',3);box(c,x+48,185,24,230,'#132f43');box(c,x+54,272,12,133,'#81cbbb66');}for(const y of [39,60])line(c,[[0,y],[960,y]],'#8b9c8777',8);line(c,[[65,62],[65,95],[870,95],[870,125]],'#a6b29777',7);box(c,0,485,960,55,'#226074');
  }else if(kind==='observatory'){
   for(let i=0;i<85;i++)box(c,(i*137+index*13)%950,(i*67)%400,1+(i%4===0),1+(i%4===0),'#d3e9d788');oval(c,510+shift,210,205,205,'#192b4433','#a3b9ad55');for(let i=0;i<5;i++){c.save();c.translate(510+shift,210);c.rotate(i*.32-.7);c.beginPath();c.ellipse(0,0,190,70+i*16,0,0,Math.PI*2);c.strokeStyle='#bdc99b55';c.stroke();c.restore();}oval(c,510+shift,210,45,45,'#a7d7c755');line(c,[[90,490],[240,340],[440,400]],'#1b314b',18);line(c,[[240,340],[312,202]],'#92a8ad77',17);oval(c,320,190,25,25,'#667e9366','#d5c49c77');
  }else if(kind==='forest'){
   for(let i=0;i<12;i++){const x=i*94+shift,h=340+(i*53)%180;line(c,[[x,540],[x+14,540-h]],'#193d43',18+i%3*7);line(c,[[x+9,320],[x-48,210],[x-75,190]],'#214f4a',9);oval(c,x,90+(i%3)*35,110,70,['#4c796755','#6c9b7144','#8aa37d33'][i%3]);}for(let i=0;i<8;i++){const x=80+i*124,y=420+(i%3)*23;line(c,[[x,y+55],[x,y]],'#4e827777',5);oval(c,x,y,40,13,'#8ec3ab66');oval(c,x,y-4,36,10,'#c3ccb066');}line(c,[[140,0],[130,200],[170,345]],'#b1c6a43b',3);line(c,[[750,0],[770,180],[740,355]],'#b1c6a43b',3);
  }else if(kind==='trainyard'){
   for(let i=0;i<5;i++){const x=i*230+shift;box(c,x,170,190,210,'#203849');box(c,x+10,180,170,183,'#53716c44');for(let k=0;k<4;k++){box(c,x+20+k*42,211,30,54,'#b5c3af44');line(c,[[x+20+k*42,290],[x+50+k*42,290]],'#c4aa7b66',2);}for(const xx of [x+42,x+149])oval(c,xx,380,26,26,'#142d40','#9ba68b');}for(const y of [420,450])line(c,[[0,y],[960,y-15]],'#cab18a55',3);for(let x=0;x<960;x+=46)line(c,[[x,438],[x+17,455]],'#273c4c',6);for(const x of [95,830]){line(c,[[x,40],[x,420]],'#203348',8);lamp(c,x,88);}
  }else if(kind==='archive'){
   for(let i=0;i<6;i++){const x=i*175+shift;box(c,x,60,145,420,'#242a3c');for(let y=120;y<470;y+=61){for(let k=0;k<9;k++){const h=24+(i*19+k*11+y)%23;box(c,x+12+k*13,y-h,10,h,['#769b88','#b28d74','#8b7da7','#62899d'][k%4]);box(c,x+14+k*13,y-h+6,6,1,'#edcfaa55');}line(c,[[x+4,y],[x+140,y]],'#b9987655',5);}}for(const x of [160,700]){box(c,x,250,95,55,'#cbb99588');for(let j=0;j<4;j++)line(c,[[x+8,260+j*10],[x+83,260+j*10]],'#61566b66');}
  }else if(kind==='forge'){
   for(let i=0;i<3;i++){const x=90+i*340;box(c,x,185,180,265,'#25343f');box(c,x+18,202,144,178,'#2f292f');const hot=c.createLinearGradient(x,230,x,380);hot.addColorStop(0,'#dba35a33');hot.addColorStop(1,'#e4765366');box(c,x+27,218,126,148,hot);for(let y=230;y<366;y+=26)line(c,[[x+22,y],[x+157,y]],'#142a39',7);box(c,x+65,35,50,150,'#44555c');}for(const y of [46,69])line(c,[[0,y],[960,y]],'#a78f7866',8);for(const x of [30,810]){box(c,x,396,120,25,'#536c7177');poly(c,[[x+24,421],[x+55,421],[x+80,475],[x+43,475]],'#36495c');}
  }else if(kind==='aquarium'){
   oval(c,480,260,375,218,'#277c8055','#9ccbbe77');oval(c,480,260,353,198,'#134b6866','#9ccbbe33');for(const x of [190,400,610,820])line(c,[[x,91],[x,428]],'#8db6b33b',9);for(let i=0;i<16;i++){const x=110+i*53;line(c,[[x,437],[x+Math.sin(i)*28,345],[x+19,280]],'#73ad8e55',4);oval(c,x+14,359,18,5,'#98caa644');}for(let i=0;i<7;i++){const x=180+i*107,y=160+(i%3)*64;oval(c,x,y,24,8,'#afdfcd55');poly(c,[[x-21,y],[x-39,y-12],[x-39,y+12]],'#afdfcd55');}
  }else if(kind==='ruins'){
   for(let i=0;i<7;i++){const x=30+i*151,h=220+(i*47)%180;box(c,x,485-h,58,h,'#63777577');box(c,x-11,475-h,80,16,'#bac1a777');for(let y=500-h;y<480;y+=34)line(c,[[x+4,y],[x+52,y]],'#2e45484b',1);for(let k=0;k<3;k++)line(c,[[x+11+k*16,487-h],[x+11+k*16,480]],'#c0c8aa2b',2);}poly(c,[[0,502],[80,461],[129,483],[225,452],[323,480],[421,454],[550,483],[720,460],[960,498]],'#334c58');for(let i=0;i<5;i++){const x=120+i*180;line(c,[[x,0],[x+14,150],[x-12,300]],'#8fac8c55',3);}
  }else if(kind==='stage'){
   for(const x of [0,730])for(let k=0;k<12;k++){const xx=x+k*20;box(c,xx,20,17,450,k%2?'#85496b77':'#462d4f');line(c,[[xx,22],[xx,458]],'#dca08a22',1);}poly(c,[[230,0],[500,0],[710,470],[80,470]],'#d8c3a513');for(const x of [125,825]){box(c,x-35,290,70,150,'#263241');for(let y=321;y<425;y+=50)oval(c,x,y,22,22,'#1b2638','#9da48b66');}for(let i=0;i<12;i++)oval(c,35+i*84,490+(i%2)*12,25,14,'#241f38');line(c,[[200,76],[760,76]],'#c2ac8655',3);
  }else if(kind==='ice'){
   for(let i=0;i<10;i++){const x=i*109+shift,h=100+(i*31)%120;poly(c,[[x,0],[x+70,0],[x+42,h],[x+30,h+35]],'#c3e7ec33');poly(c,[[x,510],[x+12,372],[x+42,330],[x+71,490]],'#acd3db44');line(c,[[x+42,330],[x+48,490]],'#e8f4e766',1);}for(let y=150;y<450;y+=63)line(c,[[0,y],[200,y-25],[470,y+9],[720,y-31],[960,y+5]],'#c3e9e72b',3);
  }else if(kind==='hangar'){
   for(const x of [80,375,710]){poly(c,[[x,0],[x+15,0],[x+260,475],[x+241,475]],'#112c4055');poly(c,[[x+260,0],[x+279,0],[x+15,475],[x,475]],'#829e9a22');}line(c,[[0,68],[960,68]],'#a9bbab77',8);line(c,[[680,68],[680,184]],'#d0c2a16b',3);oval(c,680,202,22,22,'#526f7c','#c9c39c77');line(c,[[683,222],[660,239],[646,229]],'#c9c39c77',4);for(let i=0;i<5;i++){const x=40+i*205;box(c,x,377,140,100,'#304d5f');box(c,x+7,384,126,84,'#71928433');for(let j=0;j<4;j++)line(c,[[x+20+j*30,384],[x+20+j*30,466]],'#c4c0a13b',2);}}
  const v=c.createRadialGradient(480,230,80,480,270,680);v.addColorStop(0,'#0a183600');v.addColorStop(1,'#07172e66');box(c,0,0,W,H,v);return cv;
 }
 function background(c,w,t){const kind=w.def.look,key=kind+':'+w.def.index;let cv=cache.get(key);if(!cv){cv=make(kind,w.def.index);cache.set(key,cv);if(cache.size>8)cache.delete(cache.keys().next().value);}else{cache.delete(key);cache.set(key,cv);}c.drawImage(cv,0,0,W,H);c.save();
  if(kind==='aquarium')for(let i=0;i<14;i++){const a=(t*.04+i/14)%1,x=130+(i*137)%700,y=470-a*390;oval(c,x,y,2+i%3,2+i%3,'#c9f3e91a','#c9f3e92b');}
  if(kind==='ice')for(let i=0;i<28;i++){const y=(t*6+i*37)%500,x=(i*131+Math.sin(t*.3+i)*12)%960;box(c,x,y,1.5,1.5,'#eaf8eb66');}
  if(kind==='forest')for(let i=0;i<7;i++){const x=120+i*121+Math.sin(t*.3+i)*10,y=130+(i%3)*95;oval(c,x,y,2,1,'#c4dec066');}
  c.restore();
 }
 window.ZDWorldScenery={background,kinds:Object.keys(palettes)};
})();
