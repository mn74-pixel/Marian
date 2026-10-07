/* Hand-drawn secret worlds and readable, symbol-coded musical mechanisms. */
(() => {
  const TAU=Math.PI*2,ink='#15263f';
  function line(c,pts,color,width=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
  function ellipse(c,x,y,rx,ry,color,stroke=null){c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
  function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,color.slice(0,7)+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
  function grad(c,x,y,w,h,a,b){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
  function box(c,x,y,w,h,r,color,stroke=null){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
  function star(c,x,y,r,color){c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.28:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();c.fillStyle=color;c.fill();}
  function glyph(c,index,x,y,r,color){if(index===0)ellipse(c,x,y,r*.7,r*.7,color);else if(index===1){c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.75,y);c.lineTo(x,y+r);c.lineTo(x-r*.75,y);c.closePath();c.fillStyle=color;c.fill();}else star(c,x,y,r,color);}
  function text(c,s,x,y,size=9,color='#ffedc4'){c.font=`bold ${size}px system-ui`;c.textAlign='center';c.fillStyle=ink;c.fillText(s,x+1,y+1);c.fillStyle=color;c.fillText(s,x,y);}
  function whale(c,x,y,t,awake){
    c.save();c.translate(x,y+Math.sin(t*.45)*5);const bright=awake?'#78dce0':'#416f9f';
    glow(c,-20,15,250,awake?'#7fc9ee35':'#716eea1c');
    c.beginPath();c.moveTo(-210,-30);c.bezierCurveTo(-175,-112,19,-97,100,-13);c.bezierCurveTo(141,24,177,-12,212,-40);c.quadraticCurveTo(207,3,233,14);c.quadraticCurveTo(177,48,145,34);c.bezierCurveTo(87,73,-82,104,-181,40);c.quadraticCurveTo(-218,17,-210,-30);c.closePath();c.fillStyle=grad(c,0,-80,0,170,bright,'#283556');c.fill();c.strokeStyle=awake?'#bdfae9':'#879ccba0';c.lineWidth=2;c.stroke();
    c.save();c.clip();
    for(let i=0;i<32;i++){const xx=-200+(i*73)%380,yy=-77+(i*47)%160;star(c,xx,yy,i%4?1.8:3.5,awake?'#edffe0':'#b8cbe67a');}
    for(let j=0;j<6;j++){c.beginPath();c.moveTo(-190+j*10,20);c.quadraticCurveTo(-80,83-j*6,65,42-j*5);c.strokeStyle='#a2f0e24a';c.lineWidth=1;c.stroke();}
    c.restore();
    c.beginPath();c.moveTo(-32,25);c.quadraticCurveTo(20,109,75,110);c.quadraticCurveTo(59,49,10,16);c.fillStyle=grad(c,0,20,40,80,'#63afbb','#303453');c.fill();
    line(c,[[-192,24],[-140,35],[-102,30]],'#b7f8de88',1.4);
    if(awake){ellipse(c,-148,-4,6,6,'#ffe9a9');ellipse(c,-147,-4,2.5,3,'#142b49');}else{c.beginPath();c.moveTo(-155,-3);c.quadraticCurveTo(-148,3,-140,-3);c.strokeStyle='#b5d4e3';c.lineWidth=2;c.stroke();}
    if(awake)for(let i=0;i<12;i++){const age=(t*.16+i/12)%1;star(c,-104+Math.sin(age*7+i)*45,-74-age*120,2+age*2,`rgba(209,255,222,${1-age})`);}
    c.restore();
  }
  function background(c,world,t){
    const kind=world.def.wonder;
    if(['locks','archive','foundry','clockgarden'].includes(kind)){ZDMechanismArt.background(c,world,t);return;}
    if(['glass','aurora','tide','reef','train','workshop','aviary','prism'].includes(kind)){ZDExpeditionArt.background(c,world,t);return;}
    c.save();c.fillStyle=grad(c,0,0,0,540,kind==='bloom'?'#143854':'#101a3c',kind==='bloom'?'#33776c':kind==='orbit'?'#4b365f':'#224564');c.fillRect(0,0,960,540);
    for(let i=0;i<70;i++){const x=(i*137+31)%960,y=(i*79+47)%470;const a=.25+(Math.sin(t*.7+i)+1)*.15;c.globalAlpha=a;star(c,x,y,i%7?1:2.5,'#cceddf');}c.globalAlpha=1;
    if(kind==='bloom'){
      glow(c,530,215,350,'#8bdab82c');
      for(let i=0;i<7;i++){
        const x=125+i*118,y=150+(i*61)%180,sway=Math.sin(t*.6+i)*6;
        c.beginPath();c.moveTo(x,510);c.bezierCurveTo(x-40,350,x+40,y+90,x+sway,y);c.strokeStyle='#24756d';c.lineWidth=12;c.stroke();c.strokeStyle='#80b58c';c.lineWidth=2;c.stroke();
        for(let j=0;j<2;j++){c.save();c.translate(x,360+j*66);c.rotate(j?-.65:.65);ellipse(c,24,-8,40,12,j?'#39937d':'#65b582');line(c,[[0,0],[54,-10]],'#b6e4a25a');c.restore();}
        c.save();c.translate(x+sway,y);c.rotate(Math.sin(t*.3+i)*.07);
        for(let k=0;k<6;k++){c.save();c.rotate(k*TAU/6);ellipse(c,0,-30,17,38,grad(c,-18,-60,35,60,i%2?'#ffc799':'#e6b0dd',i%2?'#b46c7f':'#8277bb'),'#ffdfa55a');c.restore();}
        ellipse(c,0,0,21,21,'#c9a56c','#ffe0a6');ellipse(c,0,0,15,15,'#365e65');for(let k=0;k<9;k++)ellipse(c,Math.cos(k)*10,Math.sin(k)*10,1.5,1.5,'#f9d37c');glow(c,0,0,60,'#ffe6a02b');c.restore();
      }
      for(let i=0;i<9;i++){const x=40+i*110,y=430+Math.sin(t+i)*8;c.save();c.translate(x,y);c.rotate(Math.sin(t*.5+i)*.2);ellipse(c,0,0,36,9,'#264f6688','#8dccbf44');c.restore();}
    }else if(kind==='orbit'){
      const x=510,y=245;glow(c,x,y,300,'#daa8f126');
      for(let i=0;i<4;i++){c.save();c.translate(x,y);c.rotate(-.4+i*.36);c.beginPath();c.ellipse(0,0,120+i*52,65+i*23,0,0,TAU);c.strokeStyle='#d9be8677';c.lineWidth=2;c.stroke();const a=t*(.13+i*.025)+i*1.8,px=Math.cos(a)*(120+i*52),py=Math.sin(a)*(65+i*23);glow(c,px,py,35,['#80e5d24a','#ffc87c4a','#d6acff4a'][i%3]);ellipse(c,px,py,12+i*3,12+i*3,['#80c5bc','#dcaa78','#aa9ddb','#d3d391'][i], '#fff0c8');c.restore();}
      ellipse(c,x,y,45,45,grad(c,x-40,y-40,80,80,'#ffdc99','#b87868'),'#ffefbd');for(let i=0;i<8;i++){const a=i*TAU/8+t*.08;line(c,[[x+Math.cos(a)*50,y+Math.sin(a)*50],[x+Math.cos(a)*64,y+Math.sin(a)*64]],'#e8c593',2);}
      for(const xx of [170,790]){line(c,[[xx,0],[xx,480]],'#798ea055',3);for(let k=0;k<5;k++){const yy=80+k*83;box(c,xx-28,yy,56,9,3,'#d2b57f55');}}
    }else{
      for(let i=0;i<5;i++){c.beginPath();c.moveTo(0,125+i*33);c.bezierCurveTo(270,15+i*20,520,300-i*23,960,55+i*45);c.strokeStyle=['#74d8d01a','#a795e323','#a3e2b91a'][i%3];c.lineWidth=26;c.stroke();}
      whale(c,535,210,t,world.encore);
      ellipse(c,480,497,205,25,'#122e4c','#86d4d177');ellipse(c,480,495,142,14,'#214c62','#ddc88d55');
    }
    const v=c.createRadialGradient(480,230,100,480,270,640);v.addColorStop(0,'#10213800');v.addColorStop(1,'#0b163e88');c.fillStyle=v;c.fillRect(0,0,960,540);c.restore();
  }
  function mechanisms(c,world,t){
    c.save();const def=world.def.puzzle;
    if(def&&['interlock','towers'].includes(def.type))ZDMechanismArt.draw(c,world);
    if(def&&!['interlock','towers'].includes(def.type)){const state=world.puzzleState();
      for(let i=0;i<3;i++){
        const x=def.controls[i],pressed=state.last===i&&state.flash>0,lit=state.solved||pressed,color=ZDAdventures.colors[i];
        if(pressed){ellipse(c,x,410,25,29,'#ffffff18','#fff2bd');}
        if(state.solved){text(c,'✓',x,365,15,'#a9ffcc');}
        box(c,x-15,436,30,14,3,grad(c,x,436,0,14,'#b49b7c','#435569'),ink);
        if(lit)glow(c,x,410,34,color+'50');
        if(['mirrors','weights','valves','tiles','filters'].includes(def.type)){ZDExpeditionArt.control(c,def,state,i);}
        else if(def.type==='sequence'){
          line(c,[[x-13,436],[x-13,390],[x+13,390],[x+13,436]],state.solved?'#9df3bc':'#d1c598',3);
          c.save();c.translate(x,396);c.rotate(pressed?Math.sin((.7-state.flash)*28)*state.flash*.35:0);c.translate(-x,-396);
          c.beginPath();c.moveTo(x-9,419);c.quadraticCurveTo(x-5,411,x-6,403);c.quadraticCurveTo(x,395,x+6,403);c.quadraticCurveTo(x+5,411,x+9,419);c.closePath();c.fillStyle=grad(c,x-8,0,16,0,'#f4d99c','#b58051');c.fill();ellipse(c,x,420,10,3,'#ffe4ad');ellipse(c,x,423,2,2,'#c5a57c');glyph(c,i,x,406,6,color);c.restore();
          box(c,x-12,429,24,4,1,state.solved?'#98f0b8':pressed?'#fff1b0':'#536879');
        }else if(def.type==='dials'){
          ellipse(c,x,413,19,19,'#16293f','#d9b57f');ellipse(c,x,413,16,16,grad(c,x-16,400,32,30,'#6b758b','#273e57'));glyph(c,state.values[i],x,413,10,ZDAdventures.colors[state.values[i]]);
          text(c,'↻',x,443,10,'#ffe0a6');
        }else{
          const active=state.values[i];line(c,[[x,436],[x,390]],'#779b9b',2);glow(c,x,390,23,active?'#ffd99a44':'#9daec011');glyph(c,2,x,390,10,active?'#ffe3a2':'#536982');
          const links=[[0,1],[1,2],[2]][i];for(const target of links){line(c,[[x,435],[x,431-i*3],[def.controls[target],431-i*3],[def.controls[target],410]],ZDAdventures.colors[i]+'66',.8);}
          box(c,x-9,435,18,8,2,color);text(c,['1+2','2+3','3'][i],x,427,8);
        }
        if(Math.abs(world.p.x+11-x)<=23&&world.p.ground)text(c,'↑',x,378,13);
      }
      if(def.type==='sequence'){
        const known=!def.requiresClue||world.journal.includes(def.requiresClue),n=def.target.length,start=288-(n-1)*17;
        box(c,start-17,324,n*34,31,5,'#162c43e8','#9aaeb2');
        for(let j=0;j<n;j++){const x=start+j*34,filled=j<state.progress;ellipse(c,x,339,11,11,filled?'#537f73':'#263a50',filled?'#c7ffb8':'#718394');if(filled)glyph(c,def.target[j],x,339,7,ZDAdventures.colors[def.target[j]]);else text(c,known?'·':'?',x,342,12);}
        text(c,state.solved?'MELODIA PRZYJĘTA ✓':`ZAGRANE ${state.progress}/${n}`,288,317,9,state.solved?'#b7ffd2':'#ffe4ac');
      }
    }
    if(def?.type==='filters'){
      const state=world.puzzleState(),colors=['#ff918d','#88f6af','#8dc7ff'];
      for(let i=0;i<3;i++){const x=def.controls[i],on=state.values[i];ellipse(c,x,240,12,12,on?colors[i]:'#24384d','#b6c7bd');text(c,['R','G','B'][i],x,244,9,on?'#142a41':'#bfced4');line(c,[[x,253],[285,290]],on?colors[i]+'bb':'#5a6c7933',on?3:1);}
      const mixture=state.values.some(Boolean)?ZDAdventures.mixLight(state.values):'#192b40',target=ZDAdventures.mixLight(def.target);
      glow(c,285,292,40,mixture+'24');ellipse(c,285,292,23,23,mixture,'#dce8c1');text(c,'MIESZANKA',285,328,8);
      ellipse(c,385,292,27,27,target+'55',target);ellipse(c,385,292,17,17,state.solved?target:'#1c3147',target);text(c,state.solved?'SZKŁO ✓':'CEL',385,332,9);
      line(c,[[310,292],[356,292]],mixture,4);line(c,[[414,292],[490,292],[490,415],[562,415]],state.solved?'#b3fadb':'#496675',3);
    }
    if(def?.type==='mirrors'){
      const state=world.puzzleState(),trace=ZDAdventures.traceMirrors(state.values),xy=([x,y])=>[65+x*65,205+y*23];
      const beam=trace.path.map(xy);line(c,beam,'#152b4099',8);line(c,beam,'#ffe99588',5);line(c,beam,'#fff7ba',2);
      ellipse(c,65,251,9,9,'#ffe59f','#233b53');text(c,'ŹRÓDŁO',65,235,8);
      [[2,2],[2,0],[5,0]].forEach((pos,i)=>{const [x,y]=xy(pos),d=state.values[i]?1:-1;ellipse(c,x,y,13,13,'#24495e','#aadbd2');line(c,[[x-9,y-d*9],[x+9,y+d*9]],'#e4fff0',3);text(c,String(i+1),x+18,y+3,10);});
      ellipse(c,390,297,12,12,trace.hit?'#ffed9c':'#264357','#ecce94');text(c,trace.hit?'ZASILONY ✓':'ODBIORNIK',390,319,8);
      line(c,[[403,297],[493,297],[493,400],[520,400]],trace.hit?'#a5ffbd':'#587b83',trace.hit?3:2);
    }
    if(def?.type==='valves'||def?.type==='lights'){
      const state=world.puzzleState();line(c,[[65,385],[490,385],[490,415],[530,415]],state.solved?'#8df3c8':'#4c7885',4);
      text(c,state.solved?'ZASILANIE PŁYNIE ✓':'URUCHOM ZASILANIE',280,372,8,state.solved?'#bcffdc':'#c5dcdf');
    }
    const portal=world.def.portal;
    if(portal&&(!portal.hiddenUntilReady||world.portalOpen(portal))){const open=world.portalOpen(portal),{x,y,w,h}=portal;
      box(c,x-3,y-4,w+6,h+4,20,grad(c,x,y,w,h,'#e1c28d','#547789'),ink);
      box(c,x+2,y+2,w-4,h-2,17,grad(c,x,y,0,h,open?'#548b96':'#36435e',open?'#263d70':'#202e47'));
      if(open){glow(c,x+w/2,y+h/2,38,'#86e9d333');for(let i=0;i<6;i++){const a=(t*.2+i/6)%1;star(c,x+9+(i*11)%(w-15),y+8+a*(h-18),1.5,'#cafee0');}}
      else {line(c,[[x+10,y+25],[x+w-10,y+25]],'#dcbd84',2);glyph(c,2,x+w/2,y+38,7,'#dbb680');}
      text(c,open?'↑':'♫',x+w/2,y+h-8,13);
    }
    if(world.def.wonder==='whale'){
      ellipse(c,288,451,43,5,'#426e80','#d9d39b');text(c,'♫',288,440,19,'#e5dfaf');
      for(let i=0;i<3;i++)glyph(c,i,267+i*21,463,4,world.fragments.includes('fragment'+i)?ZDAdventures.colors[i]:'#4d6078');
    }
    c.restore();
  }
  function fragment(c,item,t){
    const x=item.x+12,y=item.y+11+Math.sin(t*2)*2,index=Number(item.id.at(-1)),color=ZDAdventures.colors[index];
    c.save();glow(c,x,y,30,color+'44');ellipse(c,x,y,12,14,'#203953','#ffe0a4');glyph(c,index,x,y,8,color);
    for(let i=0;i<3;i++){const a=t*.8+i*TAU/3;star(c,x+Math.cos(a)*17,y+Math.sin(a)*19,1.8,'#fff0bc');}c.restore();
  }
  window.ZDAdventureArt={background,mechanisms,fragment};
})();
