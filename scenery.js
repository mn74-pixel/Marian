/* Illustrated architecture, material texture and baked lighting. Eight-entry LRU cache. */
(() => {
  const cache=new Map(),W=960,H=540;
  const palettes={canal:['#10273b','#27696c','#77e3ba'],casino:['#271c42','#873b62','#ffd07b'],garden:['#12424a','#649952','#eff3ad'],workshop:['#172d46','#655652','#ffbd6d'],library:['#24223f','#734957','#f5c889'],cavern:['#122742','#315a7c','#7bece1']};
  function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
  const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h);};
  function gradient(c,x,y,w,h,a,b){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
  function path(c,points,fill,stroke=null,width=1){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
  function line(c,points,color,width=1){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
  function ellipse(c,x,y,rx,ry,fill,stroke=null,width=1){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
  function arch(c,x,y,w,h,fill,stroke=null,width=2){c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.arc(x+w/2,y+w/2,w/2,Math.PI,0);c.lineTo(x+w,y+h);c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
  function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color.slice(0,7)+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
  function lamp(c,x,y,color='#ffce87'){
    glow(c,x,y,125,color+'19');glow(c,x,y,45,color+'29');rect(c,x-7,y-13,14,25,'#16232b');rect(c,x-4,y-10,8,17,gradient(c,x,y,0,17,color,'#b98551'));line(c,[[x,y-12],[x,y+9]],'#534938',2);rect(c,x-10,y+10,20,3,'#a08463');path(c,[[x-10,y-13],[x,y-21],[x+10,y-13]],'#766553');
  }
  function masonry(c,r,base='#78958c',y0=0,y1=490){
    for(let row=0;row<(y1-y0)/27;row++)for(let col=-1;col<22;col++){
      const x=col*51+(row%2)*25,y=y0+row*27;
      rect(c,x+2,y+1,47,24,base+(r()>.5?'12':'09'));line(c,[[x+2,y+24],[x+49,y+24],[x+49,y+1]],'#0718242b',1.2);line(c,[[x+3,y+2],[x+48,y+2]],'#c8d5b913',.7);
      if(r()>.72)line(c,[[x+18,y+3],[x+22,y+9],[x+19,y+13]],'#152e333a',.6);
    }
  }
  function voussoirs(c,x,y,w,color){
    for(let i=0;i<13;i++){const a=Math.PI+i*Math.PI/13,b=a+Math.PI/13-.017,rad=w/2;
      path(c,[[x+rad+Math.cos(a)*(rad+13),y+rad+Math.sin(a)*(rad+13)],[x+rad+Math.cos(b)*(rad+13),y+rad+Math.sin(b)*(rad+13)],[x+rad+Math.cos(b)*(rad+1),y+rad+Math.sin(b)*(rad+1)],[x+rad+Math.cos(a)*(rad+1),y+rad+Math.sin(a)*(rad+1)]],color,'#10202b55',.8);}
  }
  function leaf(c,x,y,size,angle,color){c.save();c.translate(x,y);c.rotate(angle);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-size*.9,-size*.35,-size*.8,-size,0,-size);c.bezierCurveTo(size*.7,-size*.75,size*.45,-size*.25,0,0);c.fillStyle=color;c.fill();line(c,[[0,0],[0,-size*.85]],'#b5cf9222',.7);c.restore();}
  function plant(c,x,y,size,r,bright=false){
    for(let i=0;i<8;i++){const a=(i-3.5)*.21,len=size*(.55+r()*.45),endx=x+Math.sin(a)*len,endy=y-Math.cos(a)*len;
      c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+(endx-x)*.2,endy,endx,endy);c.strokeStyle=bright?'#648369':'#345953';c.lineWidth=1.5;c.stroke();
      for(let k=1;k<7;k++){const f=k/7,xx=x+(endx-x)*f*f,yy=y-(y-endy)*f;for(const side of [-1,1])leaf(c,xx,yy,size*.16*(1-f*.55),a+side*.8,bright?(side<0?'#9bca6b':'#44975f'):(side<0?'#246857':'#39825b'));}
    }
  }
  function gear(c,x,y,r,n=14){
    c.save();c.translate(x,y);const pts=[];for(let i=0;i<n*4;i++){const a=i*Math.PI*2/(n*4),rad=i%4===0||i%4===3?r*.83:r;pts.push([Math.cos(a)*rad,Math.sin(a)*rad]);}path(c,pts,gradient(c,-r,-r,r*2,r*2,'#978065','#384a50'),'#172733',2);
    ellipse(c,0,0,r*.58,r*.58,'#273640','#ba98694a',1.4);for(let i=0;i<6;i++){const a=i*Math.PI/3;line(c,[[0,0],[Math.cos(a)*r*.64,Math.sin(a)*r*.64]],'#6d6d60',r*.12);}ellipse(c,0,0,r*.17,r*.17,'#a18c65','#273742',2);ellipse(c,-r*.04,-r*.04,r*.06,r*.06,'#e0c093');c.restore();
  }
  function make(theme,variant){
    const cv=document.createElement('canvas');cv.width=1440;cv.height=810;const c=cv.getContext('2d');c.scale(1.5,1.5);
    const r=random(127+variant*991),pal=palettes[theme];rect(c,0,0,W,H,gradient(c,0,0,0,H,pal[0],pal[1]));
    if(theme==='canal'){
      masonry(c,r);const center=430+(variant%3)*45;
      arch(c,center-150,56,300,455,'#0c1c2a','#518f83',12);voussoirs(c,center-150,56,300,'#4e8679');
      for(let i=0;i<5;i++){const w=240-i*34,x=center-w/2,y=97+i*37;arch(c,x,y,w,410-i*37,gradient(c,x,y,0,330,'#172e39','#0c1e2c'),'#366d70',5-i*.65);line(c,[[x,y+w/2],[x+17,486]],'#9bb49c13',2);}
      for(const x of [-25,745]){arch(c,x,114,205,373,'#163d49','#45615e',8);voussoirs(c,x,114,205,'#405a57');for(let xx=x+25;xx<x+190;xx+=22)line(c,[[xx,195],[xx,471]],'#0f2430',7);}
      for(const y of [29,51]){line(c,[[0,y],[960,y]],'#0b1b28',15);line(c,[[0,y-1],[960,y-1]],gradient(c,0,y-6,0,12,'#a98a60','#435556'),10);line(c,[[0,y-5],[960,y-5]],'#c2b78b66',1);for(let x=50;x<960;x+=137){rect(c,x,y-9,9,18,'#59625b');rect(c,x+2,y-8,2,16,'#c3b99255');}}
      c.beginPath();c.moveTo(212,50);c.lineTo(212,275);c.quadraticCurveTo(212,302,242,302);c.strokeStyle='#152b35';c.lineWidth=22;c.stroke();c.strokeStyle=gradient(c,202,0,20,0,'#879581','#374f54');c.lineWidth=13;c.stroke();rect(c,236,291,10,23,'#8a957b');
      for(const x of [185,710]){rect(c,x-9,92,18,395,gradient(c,x,0,18,0,'#53665f','#253e46'));lamp(c,x,183);}
      rect(c,0,484,960,56,gradient(c,0,484,0,56,'#1d474d','#102936'));for(let i=0;i<70;i++){const x=r()*960,y=488+r()*50;rect(c,x,y,8+r()*40,.6,'#8fc5aa20');}
    }else if(theme==='casino'){
      for(let x=-20;x<960;x+=245){arch(c,x+15,33,210,460,'#211f32','#99794f',4);arch(c,x+28,49,184,444,'#332437','#ba925348',1);
        for(const side of [0,1])for(let k=0;k<7;k++){const xx=x+32+side*137+k*7;path(c,[[xx,56],[xx+8,56],[xx+10,460],[xx-2,460]],gradient(c,xx,0,9,0,'#943758','#43243f'));}
        c.fillStyle='#baa06e35';c.font='42px Georgia';c.fillText(['♠','♦','♣','♥'][(Math.floor((x+20)/245)+variant)%4],x+96,280);
        rect(c,x,24,11,470,gradient(c,x,0,11,0,'#927557','#382f39'));for(let yy=44;yy<480;yy+=70)rect(c,x-3,yy,17,4,'#a5866050');}
      rect(c,0,55,960,18,gradient(c,0,55,0,18,'#a78962','#483c42'));for(let x=0;x<960;x+=18){ellipse(c,x+8,64,2,2,'#d5b67e66');}
      for(const x of [150,480,810]){line(c,[[x,0],[x,111]],'#b09a74',2);ellipse(c,x,126,56,10,'#3b303b','#b3986c',2);for(let k=-2;k<=2;k++){const xx=x+k*21;line(c,[[x,108],[xx,122],[xx,112]],'#af9261',2);rect(c,xx-2,102,4,14,'#ffe1a1');glow(c,xx,102,22,'#ffd37d34');}glow(c,x,124,140,'#ffcf741b');}
      for(const x of [70,720]){ellipse(c,x+50,414,117,36,'#2a2731');ellipse(c,x+50,402,120,32,'#9b7751');ellipse(c,x+50,399,108,26,gradient(c,0,380,0,50,'#298665','#184b4b'),'#d1b27955');for(let i=0;i<5;i++){rect(c,x+i*17,392,11,15,'#c9b99b66');}rect(c,x+15,431,10,58,'#41353b');rect(c,x+87,431,10,58,'#41353b');}
    }else if(theme==='garden'){
      rect(c,0,0,960,490,gradient(c,0,0,0,490,'#164659','#a1c77466'));
      for(let i=0;i<4;i++){const x=-75+i*290;arch(c,x,21,272,472,'#86b8a01a','#819a852f',8);arch(c,x+10,33,252,460,'#d1e5b608','#b9c5a76b',2);
        for(let k=1;k<4;k++){const xx=x+k*68;line(c,[[xx,80],[xx,487]],'#b2c1a743',2);}for(const y of [181,280,379])line(c,[[x+8,y],[x+264,y]],'#bdc8a64f',2);
        for(let k=0;k<4;k++)line(c,[[x+10+k*65,180],[x+72+k*65,280]],'#b4d0b020',1);}
      for(let i=0;i<13;i++)plant(c,i*84-25,510,120+r()*160,r,false);
      for(const x of [50,820]){rect(c,x-20,438,91,54,gradient(c,x,438,91,54,'#7c8570','#3b5352'));rect(c,x-25,435,101,8,'#9aa087');plant(c,x+20,439,190,r,true);}
      glow(c,630,100,290,'#e4e7a32b');path(c,[[635,15],[705,20],[365,490],[70,490]],gradient(c,635,15,-290,480,'#ffefab12','#ffefab00'));
      for(let i=0;i<14;i++){const x=r()*960,y=380+r()*100;ellipse(c,x,y,3,2,'#b9bd7f33');}
    }else if(theme==='workshop'){
      masonry(c,r,'#9b9283');for(const x of [80,475,870]){rect(c,x,0,20,490,gradient(c,x,0,20,0,'#7d7966','#293b48'));for(let y=25;y<490;y+=47){ellipse(c,x+6,y,2,2,'#c0a77a77');ellipse(c,x+15,y,2,2,'#192b36');}}
      for(const x of [130,600]){rect(c,x,82,225,288,'#172b39');rect(c,x+8,89,209,270,gradient(c,x,89,0,270,'#55747d','#253b48'));for(let k=1;k<4;k++)line(c,[[x+8+k*51,89],[x+8+k*51,359]],'#192d3a',5);for(let y=136;y<360;y+=54)line(c,[[x+8,y],[x+217,y]],'#213642',6);}
      // Gears are drawn in the animated layer, behind the playable platforms.
      for(const y of [31,49]){line(c,[[0,y],[960,y]],'#151f2d',12);line(c,[[0,y-1],[960,y-1]],'#8d7b6088',6);}
      for(const x of [30,790]){rect(c,x,381,120,108,gradient(c,x,381,120,108,'#556366','#253947'));rect(c,x-5,376,130,11,'#9a876a');for(let i=0;i<6;i++)rect(c,x+12+i*17,396,8,38,'#172c3b');ellipse(c,x+47,350,21,21,'#b2a782','#283842',4);line(c,[[x+47,350],[x+55,337]],'#463b35',2);}
      lamp(c,240,128);lamp(c,750,128);
    }else if(theme==='library'){
      const center=480+(variant%3-1)*50;arch(c,center-95,57,190,430,'#141f32','#7f7163',10);
      for(let k=0;k<4;k++)arch(c,center-80+k*15,80+k*29,160-k*30,407-k*29,'#192637','#72685e44',3);
      for(const x of [-20,175,640,835]){rect(c,x,64,154,423,gradient(c,x,0,154,0,'#63544f','#262a39'));arch(c,x+9,68,136,409,'#202433','#ab866457',2);
        for(let y=173;y<482;y+=63){for(let k=0;k<13;k++){const h=25+r()*27,xx=x+14+k*9.5;rect(c,xx,y-h,7.5,h,['#468f7d','#a14c78','#b18d4d','#447ca6','#8a695c'][Math.floor(r()*5)]);rect(c,xx+1,y-h+6,5,1,'#e5cc9355');rect(c,xx+1,y-7,5,1,'#e5cc9340');}
          rect(c,x+10,y,135,7,gradient(c,0,y,0,7,'#98785d','#40343c'));}
      }
      for(const x of [350,605])lamp(c,x,193);ellipse(c,480,70,45,45,'#78979722','#b9ac7b44',3);for(let i=0;i<8;i++){const a=i*Math.PI/4;line(c,[[480,70],[480+Math.cos(a)*44,70+Math.sin(a)*44]],'#b9ac7b44',1);}
      glow(c,480,145,180,'#d3d2ad14');
    }else{
      for(let layer=0;layer<4;layer++){
        const inset=layer*72,top=25+layer*30;path(c,[[inset-50,540],[inset-24,top+130],[inset+34,top+35],[270+inset*.4,top],[570-inset*.2,top+18],[960-inset,top+85],[1020-inset,540]],['#385d75','#294e70','#254363','#142f50'][layer]);
        line(c,[[inset+34,top+35],[270+inset*.4,top],[570-inset*.2,top+18]],'#93aba31b',2);
      }
      for(let i=0;i<19;i++){const x=i*57-20,h=30+r()*130;path(c,[[x,-10],[x+25,h],[x+59,-10]],gradient(c,x,0,45,h,'#47616a','#283e4d'),'#8da89a13');}
      for(const x of [30,770])for(let i=0;i<6;i++){const xx=x+i*24,h=25+r()*100;path(c,[[xx,490],[xx+12,490-h],[xx+30,490]],'#479dab77');path(c,[[xx+12,490-h],[xx+30,490],[xx+17,480]],'#7ef3d569');}
      for(const x of [160,795]){glow(c,x,397,115,'#65dcd529');ellipse(c,x,487,110,10,'#7bcbc618');}
      rect(c,0,496,960,44,gradient(c,0,496,0,44,'#315460','#122c3c'));
    }
    // Small architectural accents stay behind the playable silhouettes.
    if(theme==='garden')for(const x of [52,90,822,862]){
      const y=428-(x%3)*8;line(c,[[x,440],[x,y-20]],'#548953',2);
      for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ellipse(c,x+Math.cos(a)*6,y-22+Math.sin(a)*6,5,4,x<100?'#ef9b91':'#ddb9ed');}ellipse(c,x,y-22,3,3,'#ffe6a2');
    }
    if(theme==='casino')for(const x of [14,259,504,749]){
      line(c,[[x,89],[x,352]],'#edb86050',1);for(const y of [100,335])path(c,[[x,y-7],[x+4,y],[x,y+7],[x-4,y]],'#e5ac6866');
    }
    if(theme==='library')for(const x of [307,626]){
      path(c,[[x,54],[x+28,54],[x+28,149],[x+14,138],[x,149]],gradient(c,x,54,28,80,'#8a4162','#452d4b'),'#b48d6566');
      line(c,[[x+4,61],[x+4,130]],'#e1b77960',1);ellipse(c,x+14,86,7,10,'#e8be7244');
    }
    // Fine material grain, then atmospheric depth. Cached, never recalculated per frame.
    for(let i=0;i<8000;i++){const x=r()*W,y=r()*H;rect(c,x,y,.4+r()*1.1,.4+r()*.7,r()>.5?'#fff1c708':'#0714210c');}
    const vignette=c.createRadialGradient(480,230,90,480,250,600);vignette.addColorStop(0,'#10192500');vignette.addColorStop(1,'#0d152653');rect(c,0,0,W,H,vignette);
    rect(c,0,365,960,175,gradient(c,0,365,0,175,'#13263600','#13263635'));
    return cv;
  }
  function atmosphere(c,id,variant,time){
    c.save();
    // Decorative motion uses world time: pause freezes it, reduced motion uses zero.
    if(id==='workshop'){
      for(const [x,y,r,n,dir] of [[442,179,57,14,1],[365,243,43,11,-1],[522,254,61,16,-1]]){
        c.save();c.translate(x,y);c.rotate(time*.12*dir);gear(c,0,0,r,n);c.restore();
      }
      for(let i=0;i<5;i++){const age=(time*.12+i/5)%1;c.globalAlpha=Math.sin(age*Math.PI)*.11;ellipse(c,838+Math.sin(age*5+i)*12,355-age*90,6+age*17,4+age*13,'#c3e4df');}c.globalAlpha=1;
    }
    if(id==='canal'||id==='cavern'){
      for(let i=0;i<16;i++){const x=(i*79+time*4)%960,y=502+(i%6)*6;line(c,[[x,y],[x+18+Math.sin(time+i)*9,y]],'#74e5cf55',1);}
      for(let i=0;i<4;i++){const age=(time*.26+i*.27)%1,x=130+i*218;ellipse(c,x,492+i%2*6,2+age*18,1+age*3,'#00000000',`rgba(132,235,217,${(1-age)*.27})`,.7);}
    }
    const colors={canal:'#79e6c3',casino:'#ffca7b',garden:'#e0f29f',workshop:'#ffbd71',library:'#eebd84',cavern:'#6ceded'};
    const accent=colors[id];
    for(let i=0;i<12;i++){
      const x=35+((i*137+variant*31)%890)+Math.sin(time*.3+i)*10;
      const y=95+((i*73+variant*17)%340)+Math.cos(time*.35+i*2)*7;
      const alpha=.13+(Math.sin(time*.9+i)+1)*.12;
      c.globalAlpha=alpha;glow(c,x,y,8,accent+'66');ellipse(c,x,y,id==='garden'?1.5:.9,id==='garden'?1.1:.9,accent);
    }
    c.globalAlpha=1;
    if(id==='cavern')for(const x of [65,815]){
      glow(c,x,432,70,accent+'18');
      for(let i=0;i<3;i++){const xx=x+i*13,yy=455+i%2*12;
        path(c,[[xx,yy],[xx-6,yy-26],[xx,yy-43],[xx+7,yy-27]],gradient(c,xx-6,yy-43,13,43,'#9ceee0','#286785'),'#b3ffe64a',.8);
        line(c,[[xx,yy-40],[xx+1,yy-5]],'#c9fff19a',.8);
      }
    }
    // Warm lamp light contrasts with cool architecture without covering the play field.
    const lights=id==='canal'?[[185,183],[710,183]]:id==='library'?[[350,193],[605,193]]:id==='casino'?[[150,110],[480,110],[810,110]]:[];
    for(const [x,y] of lights){c.globalAlpha=.8+Math.sin(time*1.6+x)*.12;glow(c,x,y,48,'#ffd27d24');}c.restore();
  }
  function background(c,id,variant,time){
    const key=id+':'+variant;let cv=cache.get(key);
    if(!cv){cv=make(id,variant);cache.set(key,cv);if(cache.size>8)cache.delete(cache.keys().next().value);}else{cache.delete(key);cache.set(key,cv);}
    c.drawImage(cv,0,0,W,H);
    atmosphere(c,id,variant,time);
  }
  window.ZDScenery={background};
})();
