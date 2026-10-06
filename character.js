/* A compact illustrated character, with a genuinely curved brass saxophone silhouette. */
(() => {
  const ellipse=(c,x,y,rx,ry,fill,stroke=null)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.7;c.stroke();}};
  // Alto proportions studied from Yamaha's component reference. Bounds: 0..40 × 0..84.
  function sax(c,x,y,scale=1){
    c.save();c.translate(x,y);c.scale(scale,scale);c.lineJoin='round';c.lineCap='round';
    const metal=(x1,x2)=>{const g=c.createLinearGradient(x1,0,x2,0);[[0,'#734019'],[.16,'#d59936'],[.34,'#fff0aa'],[.48,'#c38b2b'],[.64,'#ffe59b'],[.82,'#a7641e'],[1,'#f3c967']].forEach(([p,v])=>g.addColorStop(p,v));return g;};
    const path=(draw,fill,stroke='#6c481f',width=.55)=>{c.beginPath();draw();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}};
    // Conical body and tight return bow, not a constant-width U tube.
    path(()=>{c.moveTo(17,17);c.lineTo(21,17);c.lineTo(24,68);c.bezierCurveTo(24,79,31,76,30,67);c.lineTo(29,57);c.lineTo(36,56);c.lineTo(36,71);c.bezierCurveTo(36,87,14,87,13,71);c.closePath();},metal(12,37));
    path(()=>{c.moveTo(17.5,20);c.lineTo(16.6,69);c.bezierCurveTo(16,78,22,82,28,79);c.lineTo(27,77);c.bezierCurveTo(20,79,18,72,19,66);c.lineTo(19,20);},'#fff0ac77',null);
    // Bell rises only over the lower portion of the body and widens into a flare.
    path(()=>{c.moveTo(29,70);c.bezierCurveTo(30,63,29,53,26,47);c.quadraticCurveTo(32,42,40,49);c.bezierCurveTo(37,55,36,63,36,70);c.closePath();},metal(26,40));
    c.save();c.translate(33,47);c.rotate(.42);ellipse(c,0,0,9,4.6,metal(-8,8),'#775323');ellipse(c,0,0,7.8,3.5,'#8f591c');
    const inside=c.createLinearGradient(0,-3,0,3);inside.addColorStop(0,'#422914');inside.addColorStop(.6,'#a96c1d');inside.addColorStop(1,'#edb94f');ellipse(c,0,.15,6.9,2.9,inside);c.strokeStyle='#fff0b1';c.lineWidth=.6;c.beginPath();c.ellipse(0,0,8.5,4.2,0,Math.PI,Math.PI*2);c.stroke();c.restore();
    // Curved neck points away from the bell; cork, black mouthpiece and ligature are separate.
    path(()=>{c.moveTo(17,18);c.bezierCurveTo(18,11,15,8,7,5);c.lineTo(8,2.5);c.bezierCurveTo(19,5,23,11,21,18);c.closePath();},metal(7,23));
    c.strokeStyle='#fff3b4';c.lineWidth=.7;c.beginPath();c.moveTo(9,3.3);c.bezierCurveTo(20,7,20,11,19,15);c.stroke();
    path(()=>{c.moveTo(6,2);c.lineTo(9,3);c.lineTo(8,6);c.lineTo(5,5);c.closePath();},'#ba8c56');
    path(()=>{c.moveTo(0,0.7);c.lineTo(6.5,1.4);c.lineTo(7.2,5.1);c.lineTo(4.9,5.4);c.closePath();},'#202a31','#0e1720',.45);
    c.strokeStyle='#f6da88';c.lineWidth=.65;for(const xx of [4.6,5.8]){c.beginPath();c.moveTo(xx,1.8);c.lineTo(xx+.5,4.9);c.stroke();}
    // Neck socket, octave linkage, long key rods and six pearl finger touches.
    for(const yy of [17.5,19,70,73]){c.strokeStyle='#80501e';c.lineWidth=.7;c.beginPath();c.moveTo(14.8,yy);c.lineTo(23.5,yy);c.stroke();c.strokeStyle='#ffe9a3';c.lineWidth=.35;c.beginPath();c.moveTo(15,yy-.5);c.lineTo(23,yy-.5);c.stroke();}
    c.strokeStyle='#bd862e';c.lineWidth=.7;c.beginPath();c.moveTo(14,5);c.quadraticCurveTo(23,11,20,16);c.stroke();
    for(const xx of [14.3,22.7]){c.strokeStyle='#764b24';c.lineWidth=1.3;c.beginPath();c.moveTo(xx,22);c.lineTo(xx-1.6,72);c.stroke();c.strokeStyle='#fce6a0';c.lineWidth=.45;c.stroke();}
    for(let i=0;i<9;i++){
      const yy=24+i*5.1,xx=19-i*.18;ellipse(c,xx,yy,2.5+i*.08,2.05,metal(xx-3,xx+3),'#8a6127');
      c.strokeStyle='#e8bf61';c.lineWidth=.7;c.beginPath();c.moveTo(14-i*.1,yy+.4);c.lineTo(xx+2.4,yy+.4);c.stroke();
      if(i<6)ellipse(c,xx+2.5,yy-1,1.5,1.15,'#fff5d7','#c6b17c');
    }
    for(const yy of [58,65,72]){ellipse(c,29,yy,3.5,3,metal(25,33),'#83551d');c.strokeStyle='#fbe4a0';c.lineWidth=.6;c.strokeRect(25.6,yy-3.5,7,7);}
    c.strokeStyle='#e5bf6b';c.lineWidth=.6;c.beginPath();c.moveTo(22.5,47);c.lineTo(28,52);c.moveTo(22,52);c.lineTo(28,57);c.stroke();
    // Restrained engraving follows the bell; omitted logos keep the instrument original.
    c.strokeStyle='#885f2780';c.lineWidth=.25;for(let i=0;i<4;i++){c.beginPath();c.moveTo(32,54+i*2);c.bezierCurveTo(29,53+i*2,28,58+i*2,32,59+i*2);c.stroke();}
    ellipse(c,22,80,2.6,1.5,metal(19,25),'#986423');c.restore();
  }
  function draw(c,p,time,world){
    const speed=Math.min(1,Math.abs(p.vx)/180),walk=p.ground?Math.sin(time*17)*speed:0,climb=p.climbing?Math.sin(p.y*Math.PI/12):0;
    c.save();c.translate(p.x+11,p.y);c.scale(p.climbing?1:p.face,1);
    if(p.ground&&!world.playingSax)c.translate(0,-Math.abs(walk)*.65);c.lineCap='round';c.lineJoin='round';
    if(world.invuln>0&&Math.floor(time*14)%2)c.globalAlpha=.5;
    const limb=(pts,color,width)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle='#253045';c.lineWidth=width+1.7;c.stroke();c.strokeStyle=color;c.lineWidth=width;c.stroke();};
    // Articulated knees and rounded boots, inside the original collision box.
    for(const side of [-1,1]){
      const step=p.climbing?climb*side*3:walk*side*3;
      limb([[side*4,25],[side*4+step*.5,30],[side*5+step,34-Math.max(0,step*.5)]],side<0?'#495768':'#6a5365',4.2);
      ellipse(c,side*5+step+1,34-Math.max(0,step*.5),4.6,2.1,'#aa7854','#253045');
      c.strokeStyle='#e0b788';c.lineWidth=.8;c.beginPath();c.moveTo(side*5+step-2,34);c.lineTo(side*5+step+3,34);c.stroke();
    }
    const coat=c.createLinearGradient(-10,13,10,27);coat.addColorStop(0,'#167e8c');coat.addColorStop(.5,'#6ae8bd');coat.addColorStop(1,'#12818c');
    c.beginPath();c.moveTo(-6,12);c.quadraticCurveTo(-11,14,-9,26);c.quadraticCurveTo(0,29,9,26);c.quadraticCurveTo(10,14,5,12);c.closePath();c.fillStyle=coat;c.fill();c.strokeStyle='#20344a';c.lineWidth=1.3;c.stroke();
    c.beginPath();c.moveTo(1,16);c.lineTo(1,27);c.strokeStyle='#a6ecce';c.lineWidth=.8;c.stroke();
    if(!p.climbing){
      c.fillStyle='#287481';c.fillRect(-6,21,4,3);c.strokeStyle='#b5f2cf';c.lineWidth=.5;c.strokeRect(-6,21,4,3);
      c.fillStyle='#e9c98d';c.fillRect(3,14,2,2);
      for(const y of [19,23])ellipse(c,3,y,.65,.65,'#f9dfa3');c.strokeStyle='#376776';c.beginPath();c.moveTo(-6,22);c.lineTo(-2,22);c.stroke();}
    for(const side of [-1,1]){
      const reach=p.climbing?climb*side*3:walk*-side*2;
      const armWidth=p.climbing&&p.ladder?.kind==='rope'?3:12;
      limb([[side*8,16],[side*11,20+reach],[side*armWidth,p.climbing?10+reach:25+reach]],side<0?'#278693':'#55bfb0',3.2);
      ellipse(c,side*armWidth,p.climbing?9+reach:26+reach,2.2,2.5,'#f8c79c','#795350');
    }
    c.strokeStyle='#a7f0d066';c.lineWidth=.65;c.beginPath();c.moveTo(-8,16);c.quadraticCurveTo(-10,22,-7,26);c.stroke();
    c.fillStyle='#22616f';c.beginPath();c.moveTo(-5,14);c.lineTo(-1,20);c.lineTo(0,14);c.fill();
    c.strokeStyle='#e7bd7766';c.lineWidth=.55;c.beginPath();c.moveTo(-6,25);c.lineTo(7,25);c.stroke();
    const skin=c.createLinearGradient(-6,2,8,11);skin.addColorStop(0,'#ca947b');skin.addColorStop(.5,'#ffdcaf');skin.addColorStop(1,'#e6ad87');
    ellipse(c,0,6,7.4,8,skin,'#493c43');
    if(p.climbing){ellipse(c,0,4,6.6,4,'#765348');}else{
      ellipse(c,-5,7,2,2.5,'#d69979');ellipse(c,7,7,3,1.8,'#ffd7a5','#865c52');
      ellipse(c,4,4.6,1,1.3,'#293b49');ellipse(c,4.2,4.2,.35,.4,'#fffbe0');
      c.strokeStyle='#825449';c.lineWidth=1;c.beginPath();c.moveTo(1,10);c.quadraticCurveTo(3.5,11,6,9.7);c.stroke();
      c.strokeStyle='#a77866';c.lineWidth=.55;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-1+i*1.4,11);c.lineTo(-.4+i*1.4,12);c.stroke();}
    }
    const cap=c.createLinearGradient(0,-5,0,2);cap.addColorStop(0,'#f0af77');cap.addColorStop(1,'#ac6657');
    c.beginPath();c.moveTo(-8,1);c.quadraticCurveTo(-8,-6,0,-4.5);c.quadraticCurveTo(8,-5,8,1);c.closePath();c.fillStyle=cap;c.fill();c.strokeStyle='#3e3445';c.lineWidth=1;c.stroke();
    c.strokeStyle='#f8d09a';c.lineWidth=.7;c.beginPath();c.moveTo(-5,-2);c.quadraticCurveTo(0,-5,5,-2);c.stroke();
    for(let i=-4;i<5;i+=2){c.strokeStyle='#a3655655';c.lineWidth=.4;c.beginPath();c.moveTo(i,-3);c.lineTo(i+1,0);c.stroke();}
    ellipse(c,2,1,11,1.9,'#f0b582','#69474a');
    c.beginPath();c.moveTo(-6,13);c.quadraticCurveTo(0,16,7,13);c.strokeStyle='#f4c46e';c.lineWidth=3;c.stroke();
    const flutter=Math.sin(time*7)*speed*2;
    c.beginPath();c.moveTo(-5,14);c.quadraticCurveTo(-8-speed*3,17+flutter,-8-speed*5,22+flutter);c.lineTo(-3-speed*2,20+flutter*.5);c.closePath();c.fillStyle='#f1a458';c.fill();
    c.strokeStyle='#ffe2a0';c.lineWidth=.65;c.beginPath();c.moveTo(-5,15);c.lineTo(-7-speed*4,20+flutter);c.stroke();
    // The instrument stays in inventory while walking; it appears only in the playing pose.
    if(world.playingSax){
      c.strokeStyle='#654837';c.lineWidth=.7;c.beginPath();c.moveTo(1,13);c.lineTo(13,21);c.stroke();
      sax(c,6,7,.335);
      limb([[-8,16],[1,20],[12,17]],'#278693',3.2);
      limb([[8,16],[18,23],[13,26]],'#55bfb0',3.2);
      ellipse(c,12,17,2.2,2.1,'#f8c79c');ellipse(c,13,26,2.2,2.1,'#f8c79c');
    }
    c.restore();
  }
  window.ZDCharacter={draw,sax};
})();
