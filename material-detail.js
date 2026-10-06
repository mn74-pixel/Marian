/* Material and architectural finishing; collision rectangles stay unchanged. */
(() => {
 const line=(c,p,color,w=1)=>{c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.stroke();};
 function shadow(c,s){c.save();const g=c.createLinearGradient(0,s.y+s.h,0,s.y+s.h+20);g.addColorStop(0,'#07142655');g.addColorStop(1,'#07142600');c.fillStyle=g;c.fillRect(s.x+3,s.y+s.h-1,Math.max(0,s.w-6),21);c.restore();}
 function platform(c,s,world){
  if(s.crumble||s.h>30)return;
  const theme=world.def.theme,metal=['workshop','canal'].includes(theme),seed=world.def.index;c.save();
  c.beginPath();c.rect(s.x+3,s.y+4,s.w-6,s.h-5);c.clip();
  for(let x=s.x+9;x<s.x+s.w-5;x+=31){
   const y=s.y+6+(Math.floor(x)+seed)%5;
   if(metal){line(c,[[x,y],[x+17,y]],'#d5e8cc24',.7);line(c,[[x+2,y+1],[x+14,y+1]],'#11283840',.7);}else{line(c,[[x,y],[x+19,y+1],[x+24,y]],'#efdaa52b',.6);line(c,[[x+6,y+4],[x+13,y+4]],'#27334630',.6);}
  }
  if(theme==='garden')for(let x=s.x+18;x<s.x+s.w-4;x+=56){line(c,[[x,s.y+7],[x+5,s.y+10],[x+9,s.y+7]],'#aacd8670',1.2);}
  c.restore();
  for(const x of [s.x+6,s.x+s.w-8]){line(c,[[x,s.y+6],[x+3,s.y+6]],'#fff4cd66',.7);}
 }
 function background(c,world,t){c.save();const cool=['canal','cavern'].includes(world.def.theme),x=150+(world.def.index%4)*210;
  const g=c.createLinearGradient(x,0,x-120,460);g.addColorStop(0,cool?'#b8e9ff0c':'#ffe7b510');g.addColorStop(1,'#fff3bc00');c.beginPath();c.moveTo(x,0);c.lineTo(x+42,0);c.lineTo(x-60,460);c.lineTo(x-210,460);c.closePath();c.fillStyle=g;c.fill();
  // Damp reflections stay low and quiet, with no glowing collectible-like shapes.
  if(cool){for(let i=0;i<6;i++){const xx=90+i*155,yy=495+Math.sin(t*.5+i)*2;line(c,[[xx,yy],[xx+49,yy],[xx+62,yy-1]],'#9ad9d520',1);}}
  c.restore();
 }
 function passage(c,x,open){c.save();line(c,[[x+1,376],[x+19,376]],'#efd69e66',2);for(const y of [383,402,421]){line(c,[[x-1,y],[x+3,y+3]],'#afbcaa77',1);line(c,[[x+18,y],[x+22,y+3]],'#60758288',1);}if(open){line(c,[[x+3,447],[x+19,447]],'#abefdca0',2);}c.restore();}
 window.ZDMaterialDetail={shadow,platform,background,passage};
})();
