/* Original canvas-native illustrated artwork. All effects stay outside collision logic. */
(() => {
  const C={ink:'#292441',deep:'#24233e',purple:'#554169',mauve:'#8c5277',pink:'#df8190',coral:'#f08b75',cream:'#ffe8ad',gold:'#ffc45b',brass:'#c88447',teal:'#227c83',aqua:'#48b3a4',mint:'#8fdcaa'};
  function painter(ctx){
    const box=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
    const line=(points,c,width=1)=>{ctx.strokeStyle=c;ctx.lineWidth=width;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.stroke();};
    const poly=(points,c)=>{ctx.fillStyle=c;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();};
    const label=(s,x,y,size=10,c=C.cream)=>{ctx.font=`bold ${size}px monospace`;ctx.fillStyle=C.ink;ctx.fillText(s,Math.round(x+1),Math.round(y+2));ctx.fillStyle=c;ctx.fillText(s,Math.round(x),Math.round(y));};
    const glow=(x,y,r,color)=>{const g=ctx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'#ffc45b00');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);};
    return {box,line,poly,label,glow};
  }
  function arch(ctx,x,y,w,h,color){const {box}=painter(ctx);box(x+4,y,w-8,h,color);box(x,y+7,w,h-7,color);box(x+2,y+3,w-4,h-3,color);}
  const materials={canal:['#6eafa5','#265769','#b9e2b8'],casino:['#b98763','#61354f','#ffcf82'],garden:['#a4be72','#477b5d','#e3eca8'],workshop:['#839eae','#354e71','#e9c781'],library:['#b18369','#623b54','#f1cf98'],cavern:['#77bbbf','#355979','#b1efe0']};
  function round(ctx,x,y,w,h,r,fill,stroke=null){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.8;ctx.stroke();}}
  function gradient(ctx,x,y,w,h,a,b){const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
  function oval(ctx,x,y,rx,ry,fill,stroke=null){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke();}}
  function platform(ctx,s,index,theme){
    const {box,line,poly}=painter(ctx),[light,dark,trim]=materials[theme],{x,y,w}=s;
    ctx.fillStyle=gradient(ctx,0,y+10,0,35,'#07152180','#07152100');ctx.fillRect(x+3,y+10,w-6,35);
    if(s.h>30){
      box(x,y,w,110,'#152737');box(x+2,y+9,w-4,100,gradient(ctx,x,y,0,100,light,dark));
      for(let row=0;row<4;row++)for(let col=-1;col<Math.ceil(w/39);col++){
        const xx=x+col*39+(row%2)*19,yy=y+17+row*22,l=Math.max(x+3,xx+1),right=Math.min(x+w-3,xx+37);
        if(right<=l)continue;round(ctx,l,yy,right-l,20,2,gradient(ctx,l,yy,0,20,light+'6a',dark+'aa'));
        line([[l+2,yy+1],[right-2,yy+1]],trim+'43',.7);line([[l+5,yy+16],[l+11,yy+16],[l+14,yy+18]],'#112b3525',.6);
      }
      if(theme==='garden'||theme==='canal')for(let i=0;i<4;i++){const xx=x+11+i*6;line([[xx,y+13],[xx+2,y+25+i*3],[xx-2,y+35+i*2]],'#386f63',1);oval(ctx,xx-1,y+22+i*3,2.5,1.5,'#82a882');}
    }else{
      round(ctx,x-1,y,w+2,18,2,'#102335');round(ctx,x+1,y+4,w-2,12,1.5,gradient(ctx,x,y,0,15,light,dark));
      line([[x+5,y+8],[x+w-5,y+8]],trim+'75',.6);
      for(const xx of [x+9,x+w-22]){
        poly([[xx,y+17],[xx+13,y+17],[xx+3,y+33]],dark);line([[xx+2,y+18],[xx+10,y+18],[xx+3,y+28]],light,1);
        oval(ctx,xx+3,y+19,1,1,trim);
      }
      if(theme==='casino'||theme==='library')for(let xx=x+25;xx<x+w-17;xx+=22){ctx.strokeStyle=trim+'88';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(xx-5,y+11);ctx.quadraticCurveTo(xx,y+6,xx+5,y+11);ctx.quadraticCurveTo(xx,y+15,xx-5,y+11);ctx.stroke();}
      if(theme==='workshop')for(let xx=x+20;xx<x+w-12;xx+=12)line([[xx,y+9],[xx+4,y+12]],'#dce4c433',.7);
    }
    // A single continuous bright edge always matches the collider exactly.
    box(x,y,w,2.3,'#ffeac0');box(x,y+2.3,w,2,trim);box(x,y+5,w,1,'#162a3577');
    for(const xx of [x+6,x+w-7]){oval(ctx,xx,y+10,1.8,1.8,'#1e303e');oval(ctx,xx-.3,y+9.6,1.1,1.1,trim);}
  }
  function ladder(ctx,l){
    const {line}=painter(ctx);
    for(const x of [l.x-11,l.x+10]){
      round(ctx,x-2,l.top-7,5,l.bottom-l.top+7,1.5,'#102637');
      round(ctx,x-1,l.top-7,3,l.bottom-l.top+7,1,gradient(ctx,x-1,0,3,0,'#b3d6c3','#427580'));
      for(const y of [l.top-6,l.bottom-5])round(ctx,x-2,y,5,4,1,'#e5c18c');
    }
    for(let y=l.top+4;y<l.bottom-2;y+=12){
      round(ctx,l.x-9,y,18,4,1.2,'#132b3c');round(ctx,l.x-9,y,18,2.1,.7,gradient(ctx,l.x-9,y,18,0,'#a88967','#f8dfae'));
      line([[l.x-7,y+.3],[l.x+7,y+.3]],'#fff0c0',.6);
    }
  }
  function key(ctx,x,y,color){
    const {line}=painter(ctx);ctx.save();ctx.shadowColor='#0a1626';ctx.shadowBlur=2;
    oval(ctx,x+5,y+6,6.8,6.8,color,'#28323e');oval(ctx,x+5,y+6,3.7,3.7,'#203543');
    round(ctx,x+10,y+4,17,4,1,color);round(ctx,x+22,y+7,3,6,.4,color);round(ctx,x+17,y+7,3,4,.4,color);
    line([[x+1,y+1],[x+5,y],[x+9,y+2]],'#fff4cd',.8);line([[x+12,y+4.5],[x+26,y+4.5]],'#fff4cd',.7);ctx.restore();
  }
  function sparkle(ctx,x,y,size,color){
    const {poly}=painter(ctx);poly([[x,y-size],[x+size*.22,y-size*.22],[x+size,y],[x+size*.22,y+size*.22],[x,y+size],[x-size*.22,y+size*.22],[x-size,y],[x-size*.22,y-size*.22]],color);
  }
  function chest(ctx,x,y,open=false){
    const {line}=painter(ctx);
    oval(ctx,x+12,y+23,17,2.8,'#081b2866');
    round(ctx,x-2,y+5,29,18,3,gradient(ctx,x,y,0,24,'#b06e55','#543344'),'#112537');
    round(ctx,x,y+(open?-3:3),25,open?8:11,3,gradient(ctx,x,y,0,12,'#d39a66','#855145'),'#382b3b');
    if(open)round(ctx,x+2,y-1,21,4,1,'#27263d');
    else line([[x+1,y+13],[x+24,y+13]],'#422f3d',1);
    for(const xx of [x+3,x+20]){round(ctx,xx,y+5,3,16,.8,gradient(ctx,xx,y,3,0,'#ffe1a0','#c08b43'));for(const yy of [y+8,y+18])oval(ctx,xx+1.5,yy,.6,.6,'#664525');}
    round(ctx,x+10,y+11,6,7,1.2,'#ffce78','#7e552f');oval(ctx,x+13,y+14,1,1.4,'#62432e');
  }
  function seal(ctx,x,y,time){
    const {poly,line,glow}=painter(ctx);glow(x+12,y+11,26,'#51e4ce32');
    poly([[x+12,y-4],[x+26,y+10],[x+12,y+28],[x-2,y+10]],'#573957');
    poly([[x+12,y-2],[x+24,y+10],[x+12,y+26],[x,y+10]],'#ffd991');
    poly([[x+12,y+2],[x+20,y+10],[x+12,y+22],[x+4,y+10]],'#298f9b');
    poly([[x+12,y+2],[x+12,y+13],[x+4,y+10]],'#b0ffde');
    poly([[x+12,y+2],[x+20,y+10],[x+12,y+13]],'#63dacc');
    poly([[x+4,y+10],[x+12,y+13],[x+12,y+22]],'#58bcb6');
    line([[x+3,y+10],[x+12,y],[x+22,y+10]],'#fff3bf',.7);
    sparkle(ctx,x+10,y+5,2+Math.sin(time*2)*.5,'#fff7d0');
  }
  function render(ctx,world,particles,{reducedMotion=false}={}){
    ctx.setTransform(ctx.canvas.width/960,0,0,ctx.canvas.height/540,0,0);
    const {box,line,poly,label,glow}=painter(ctx),p=world.p,t=reducedMotion?0:world.time;
    if(world.def.secret)ZDAdventureArt.background(ctx,world,t);else if(world.def.look)ZDWorldScenery.background(ctx,world,t);else ZDScenery.background(ctx,world.def.theme,world.def.index,t);
    if(!world.def.look&&!world.def.backdrop)ZDEnvironmentDetails.background(ctx,world,t);
    ZDMaterialDetail.background(ctx,world,t);
    // A room fits horizontally without shrinking Marian. The camera only follows shaft descent.
    const cameraTop=Math.max(150,p.y-245);
    ctx.save();ctx.scale(960/576,960/576);ctx.translate(0,-cameraTop);
    // Dark edge masonry frames readable passage silhouettes.
    for(const side of ['left','right']){
      const x=side==='left'?0:555;box(x,160,21,290,'#1b293be8');
      for(let y=165;y<440;y+=22){box(x+1,y,18,2,'#8d98924a');}
      if(world.def.links[side]){const link=world.def.links[side],locked=link.requiresPuzzle&&!world.puzzles[link.requiresPuzzle]?.solved;arch(ctx,x-1,378,23,72,'#111e2c');if(locked){for(let y=389;y<447;y+=12)box(x+2,y,17,3,'#d3b77c');}else label(side==='left'?'‹':'›',x+4,417,23,'#ffe0a0');ZDMaterialDetail.passage(ctx,x,!locked);}
    }
    for(const [i,s] of world.platforms.entries()){
      if(s.missing){ctx.save();ctx.setLineDash([3,4]);line([[s.x,s.y+2],[s.x+s.w,s.y+2]],'#b3d4bf66',1);ctx.restore();continue;}
      ZDMaterialDetail.shadow(ctx,s);
      platform(ctx,s,i,world.def.theme);
      ZDMaterialDetail.platform(ctx,s,world);
      if(s.crumble){
        for(let x=s.x+3;x<s.x+s.w-2;x+=12){box(x,s.y+5,10,10,s.crumbleTime>0?'#d6a16a':'#a58765');line([[x+4,s.y+5],[x+2,s.y+10],[x+6,s.y+14]],'#644657',1);}
        if(s.crumbleTime>0){box(s.x,s.y+2,s.w*Math.max(0,1-s.crumbleTime/1.1),2,'#ffb575');}
      }
      if(s.belt)for(let x=s.beltStart;x<s.beltEnd;x+=25)label(s.belt>0?'›':'‹',x,s.y+9,12,'#70483d');
    }
    for(const l of world.ladders){
      if(l.direction==='down'){
        const locked=l.requires&&!world.inventory.includes(l.requires);
        box(l.x-16,450,32,70,'#112635');box(l.x-19,447,38,4,l.color);
        if(locked){box(l.x-17,443,34,7,'#40515c');key(ctx,l.x-10,417,l.color);}
      }
      if(l.kind==='rope'){
        line([[l.x,l.top-7],[l.x,l.bottom-1]],'#132638',6);
        line([[l.x,l.top-7],[l.x,l.bottom-1]],'#e2bc77',3);
        for(let y=l.top-3;y<l.bottom;y+=6)line([[l.x-1,y],[l.x+1,y+2]],'#855d43',.8);
        for(let y=l.top+20;y<l.bottom-6;y+=32)round(ctx,l.x-3,y,6,3,1,'#f3d391','#956c4c');
        round(ctx,l.x-5,l.top-8,10,5,1,'#bdcebd','#1c3a48');
      }else ladder(ctx,l);
      if(l.to)label(l.direction==='up'?'↑':'↓',l.x-4,l.direction==='up'?l.top-15:433,16,l.color||'#b1edcf');
    }
    for(const item of world.items)if(item.taken&&item.kind==='treasure')ZDEnvironmentDetails.opened(ctx,item);
    ZDAdventureArt.mechanisms(ctx,world,t);
    for(const n of world.notes)if(!n.taken){
      const y=n.y+Math.sin(t*3+n.x)*2;glow(n.x+9,y+8,18,'#ffcb6035');
      ctx.save();ctx.translate(n.x+8,y+9);ctx.rotate(-.15);
      oval(ctx,-3,6,5,3.3,'#d49a43','#142636');oval(ctx,-3,5,4.5,2.6,gradient(ctx,-5,2,4,6,'#fff0b2','#daa044'));
      round(ctx,.5,-8,2.3,15,.5,'#ffe2a1');ctx.beginPath();ctx.moveTo(2,-8);ctx.bezierCurveTo(9,-7,9,-2,3,0);ctx.lineTo(3,-2);ctx.quadraticCurveTo(6,-4,2,-5);ctx.fillStyle='#e8b457';ctx.fill();ctx.restore();
    }
    for(const item of world.items)if(!item.taken){
      const y=item.y+Math.sin(t*2)*2;glow(item.x+10,y+10,25,'#ffe39944');
      if(item.kind==='clue'||item.kind==='relic')ZDExpeditionArt.collectible(ctx,item,t);
      else if(item.kind==='fragment')ZDAdventureArt.fragment(ctx,item,t);
      else if(item.kind==='key')key(ctx,item.x,y,item.color);
      else if(item.kind==='seal'){
        seal(ctx,item.x,y,t);
      }else chest(ctx,item.x,y);
    }
    const cache=world.def.saxCache;
    if(cache){
      const {x,y}=cache;box(x-10,y-24,52,51,'#112737');box(x-13,y-27,58,4,'#819a91');
      box(x-13,y-23,3,50,'#607d78');box(x+42,y-23,3,50,'#456370');box(x-9,y+24,50,4,'#cab285');
      // Leather case with a lifted, velvet-lined lid after discovery.
      oval(ctx,x+16,y+25,21,2.5,'#071d2988');
      round(ctx,x-2,y+9,37,16,4,gradient(ctx,x,y+9,0,16,'#b47653','#613c42'),'#132737');
      round(ctx,x,y+11,33,11,2,'#8d5947');
      for(const xx of [x+5,x+27]){round(ctx,xx,y+10,2,13,.5,'#cfaa69');round(ctx,xx-1,y+16,4,4,.5,'#ffcf77','#715333');}
      line([[x+3,y+23],[x+29,y+23]],'#d8a578',.6);
      if(world.saxFound){
        round(ctx,x-2,y-4,37,14,4,gradient(ctx,x,y-4,0,14,'#b48162','#674455'),'#182938');
        round(ctx,x+1,y-1,31,8,2,'#3c2947','#c3916977');
        label('✓',x+10,y-10,15,'#b8ffd5');
      }else{
        round(ctx,x-2,y+4,37,10,4,gradient(ctx,x,y+4,0,10,'#c18d66','#855245'),'#3d303e');
        round(ctx,x+10,y,13,7,2,'#d0aa73');round(ctx,x+12,y+2,9,4,1,'#233240');
        line([[x+3,y+6],[x+30,y+6]],'#f1c38b88',.7);glow(x+16,y+10,27,'#f8cd643b');
        sparkle(ctx,x+29,y+4,2.5+Math.sin(t*2)*.5,'#fff1c0');
      }
      if(Math.abs(p.x-x)<90)label(world.saxFound?'ZABRANY ✓':'↑ OTWÓRZ',x-9,y-34,9,C.cream);
    }
    for(const s of world.spikes){box(s.x,s.y+s.h-2,s.w,3,C.ink);for(let x=s.x;x<s.x+s.w;x+=10){poly([[x,s.y+s.h],[x+5,s.y],[x+10,s.y+s.h]],C.ink);poly([[x+2,s.y+s.h-1],[x+5,s.y+2],[x+8,s.y+s.h-1]],'#ff7977');}}
    for(const b of world.barriers){
      box(b.x-5,b.y-7,22,9,'#2a2b42');box(b.x-3,b.y-5,18,4,b.active?'#ff8b7e':b.warning?'#ffd57d':'#89d6b2');
      if(b.active){glow(b.x+6,b.y+30,36,'#ff746638');box(b.x,b.y,b.w,b.h,'#ef8c76');box(b.x+4,b.y,3,b.h,'#ffedb9');}
      else{ctx.save();ctx.setLineDash([3,6]);line([[b.x+6,b.y],[b.x+6,b.y+b.h]],b.warning?'#ffd57d':'#73978e',1);ctx.restore();}
    }
    for(const e of world.patrols){
      ctx.save();ctx.translate(e.x+10,e.y+8);ctx.scale(e.dir,1);
      for(let i=-1;i<=1;i++){const stride=Math.sin(t*12+i)*2;line([[i*5,-1],[i*6-3,3],[i*7+stride,6]],'#ad8875',1.3);}
      oval(ctx,-1,-1,9,6.2,gradient(ctx,0,-7,0,12,'#eab384','#905866'),'#132b3b');
      ctx.strokeStyle='#6d454c';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(-7,-3);ctx.quadraticCurveTo(-1,-7,5,-3);ctx.moveTo(-1,-6);ctx.lineTo(-1,4);ctx.stroke();
      oval(ctx,-4,-4,3,1,'#f5d09b99');oval(ctx,8,0,3.8,3.4,'#60515b','#192d3a');oval(ctx,9,-1,1.1,1.1,'#ffc18b');
      line([[9,-2],[12,-6],[14,-7]],'#c79984',.7);ctx.restore();
    }
    if(world.def.exit){
      const e=world.def.exit,ready=world.saxFound&&world.seals.length===3;
      round(ctx,e.x-5,e.y-7,e.w+10,e.h+7,14,gradient(ctx,e.x,e.y,e.w,e.h,'#dfb57e','#756478'),'#182c3c');
      round(ctx,e.x,e.y,e.w,e.h,11,gradient(ctx,e.x,e.y,0,e.h,ready?'#236c73':'#213b55','#142b41'));
      ctx.save();ctx.beginPath();ctx.roundRect(e.x+2,e.y+2,e.w-4,e.h-2,10);ctx.clip();
      if(ready){glow(e.x+e.w/2,e.y+50,45,'#85ffcb55');for(let i=0;i<7;i++){const a=(t*.22+i/7)%1;sparkle(ctx,e.x+8+i*5,e.y+e.h-a*e.h,1.6,'#b8ffe2');}}
      ctx.restore();
      for(let i=0;i<3;i++){oval(ctx,e.x+11+i*11,e.y+23,3.5,4.5,i<world.seals.length?'#93ffd0':'#4c6177','#e9c480');}
      for(const xx of [e.x-3,e.x+e.w+1]){line([[xx,e.y+18],[xx,e.y+e.h-2]],'#eed4a377',1);}
      label('↑',e.x+16,e.y+64,17,C.cream);
    }

    const floor=world.platforms.filter(s=>!s.missing&&p.x+p.w>s.x&&p.x<s.x+s.w&&s.y>=p.y+p.h-1).sort((a,b)=>a.y-b.y)[0];
    if(floor){const distance=floor.y-p.y-p.h;oval(ctx,p.x+11,floor.y+2,Math.max(5,13-distance/20),2.2,`rgba(7,20,34,${Math.max(.04,.35-distance/420)})`);}
    ZDCharacter.draw(ctx,p,t,world);
    if(world.playingSax)for(let i=0;i<3;i++){const age=(t*.7+i/3)%1;ctx.save();ctx.globalAlpha=1-age;label('♪',p.x+25+age*20,p.y+10-age*25,12);ctx.restore();}
    for(const a of particles){ctx.save();ctx.globalAlpha=Math.min(1,a.life*2);if(a.star)sparkle(ctx,a.x,a.y,a.size||2,a.c);else oval(ctx,a.x,a.y,1.2,1.2,a.c);ctx.restore();}
    ctx.restore();
  }
  window.ZDArt={render};
})();
