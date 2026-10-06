/* Fixed-step simulation. Persistent room state is separate from transient motion. */
(() => {
  const realms=window.ZDRealms,overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
  const bounded=(n,max=1e8)=>Number.isFinite(n)?Math.max(0,Math.min(max,n)):0;
  class World {
    constructor(){this.reset();}
    reset(){
      this.p={x:40,y:414,w:22,h:36,vx:0,vy:0,ground:false,face:1,climbing:false,ladder:null};
      this.time=0;this.score=0;this.deaths=0;this.won=false;this.saxFound=false;this.saxAcknowledged=false;this.playingSax=false;
      this.inventory=[];this.seals=[];this.fragments=[];this.journal=[];this.relics=[];this.puzzles={};this.encore=false;this.realmStates={};this.realmId=null;this.events=[];this.prev={};this.discovery=null;
      this.enterRealm(ZDCampaign.start,null,false);
    }
    emit(type){this.events.push(type);}
    rememberRealm(){
      if(this.realmId)this.realmStates[this.realmId]={taken:this.notes.map(n=>n.taken),items:this.items.filter(i=>i.taken).map(i=>i.id)};
    }
    enterRealm(id,spawn=null,announce=true){
      if(!Object.hasOwn(realms,id))return false;
      this.rememberRealm();const def=realms[id],state=this.realmStates[id];
      this.realmId=id;this.def=def;this.platforms=def.platforms.map(s=>({...s,crumbleTime:0,missing:0}));this.ladders=def.ladders;this.spikes=def.spikes;
      this.notes=def.notes.map((n,i)=>({...n,taken:!!state?.taken?.[i]}));
      this.items=def.items.map(i=>({...i,taken:state?.items?.includes(i.id)||this.inventory.includes(i.id)||this.seals.includes(i.id)||this.fragments.includes(i.id)||this.journal.includes(i.id)||this.relics.includes(i.id)}));
      this.patrols=def.patrols.map(p=>({...p,dir:1}));this.barriers=def.barriers.map(b=>({...b,active:false,warning:false}));
      const entry=spawn||def.spawn;this.respawn={x:entry.x,y:entry.y};
      Object.assign(this.p,{...entry,vx:0,vy:0,ground:false,climbing:false,ladder:null});
      this.playingSax=false;this.ladderPass=null;this.ladderCooldown=0;this.buffer=0;this.coyote=0;this.invuln=1;
      this.transitionLock=.35;this.portalCooldown=.45;this.roomTime=0;this.noticeCooldown=0;
      if(announce){this.emit('realm');if(!state){this.score+=50;this.emit('discovery');}}
      this.rememberRealm();return true;
    }
    get noteCount(){return Object.entries(this.realmStates).reduce((sum,[id,state])=>sum+(id===this.realmId?this.notes:state.taken).filter(v=>id===this.realmId?v.taken:v===true).length,0);}
    snapshot(){
      this.rememberRealm();return {version:3,realmId:this.realmId,realmStates:this.realmStates,noteStats:{collected:this.noteCount,points:this.noteCount*100},score:this.score,deaths:this.deaths,time:this.time,
        saxFound:this.saxFound,saxAcknowledged:this.saxAcknowledged,inventory:this.inventory,seals:this.seals,fragments:this.fragments,journal:this.journal,relics:this.relics,puzzles:this.puzzles,encore:this.encore,won:this.won};
    }
    restore(data){
      if(!data||data.version!==3||!Object.hasOwn(realms,data.realmId))return false;
      this.reset();this.realmStates={};
      for(const [id,def] of Object.entries(realms)){
        const state=data.realmStates?.[id];if(!state||typeof state!=='object')continue;
        this.realmStates[id]={taken:def.notes.map((n,i)=>!!state.taken?.[i]),items:def.items.filter(i=>Array.isArray(state.items)&&state.items.includes(i.id)).map(i=>i.id)};
      }
      this.realmId=null;this.score=bounded(data.score);this.deaths=bounded(data.deaths);this.time=bounded(data.time);
      this.saxFound=!!data.saxFound;this.saxAcknowledged=this.saxFound&&!!data.saxAcknowledged;
      this.inventory=['key0','key1','key2','key3','key4'].filter(k=>Array.isArray(data.inventory)&&data.inventory.includes(k));
      this.seals=['seal1','seal3','seal5'].filter(k=>Array.isArray(data.seals)&&data.seals.includes(k));
      this.fragments=['fragment0','fragment1','fragment2'].filter(k=>Array.isArray(data.fragments)&&data.fragments.includes(k));
      this.journal=Object.keys(ZDAdventures.clues||{}).filter(k=>Array.isArray(data.journal)&&data.journal.includes(k));
      this.relics=Object.keys(ZDAdventures.relics||{}).filter(k=>Array.isArray(data.relics)&&data.relics.includes(k));
      for(const def of (window.ZDAdventures?.definitions||[])){
        const v=data.puzzles?.[def.id];if(!v||typeof v!=='object')continue;
        this.puzzles[def.id]={solved:v.solved===true,progress:Math.floor(bounded(v.progress,def.type==='sequence'?def.target.length:0)),values:[0,1,2].map(i=>Math.floor(bounded(v.values?.[i],def.type==='valves'?3:['dials','tiles'].includes(def.type)?2:1))),last:-1,flash:0};
        if(this.puzzles[def.id].solved){this.puzzles[def.id].progress=def.target.length;this.puzzles[def.id].values=[...def.target];}
      }
      this.encore=!!data.encore&&this.fragments.length===3&&this.saxFound;
      this.enterRealm(data.realmId,null,false);this.won=!!data.won;this.events=[];
      if(this.saxFound&&!this.saxAcknowledged)this.discovery={kind:'sax',recovered:true};
      return true;
    }
    importLegacy(data){
      if(!data||data.version!==2)return false;
      this.reset();this.saxFound=!!data.saxFound;this.score=bounded(data.score);this.deaths=bounded(data.deaths);
      if(this.saxFound)this.discovery={kind:'sax',recovered:true};
      return true;
    }
    acknowledge(){if(this.discovery?.kind==='sax')this.saxAcknowledged=true;this.discovery=null;this.prev={};}
    die(){
      if(this.won||this.discovery)return;
      this.deaths++;this.playingSax=false;this.emit('death');
      Object.assign(this.p,{...this.respawn,vx:0,vy:0,ground:false,climbing:false,ladder:null});
      this.ladderPass=null;this.ladderCooldown=0;this.coyote=0;this.buffer=0;this.invuln=1.2;
      this.roomTime=0;this.platforms=this.def.platforms.map(s=>({...s,crumbleTime:0,missing:0}));this.patrols=this.def.patrols.map(p=>({...p,dir:1}));
    }
    notice(type){if(this.noticeCooldown<=0){this.emit(type);this.noticeCooldown=2;}}
    puzzleState(def=this.def.puzzle){
      if(!def)return null;
      return this.puzzles[def.id]||(this.puzzles[def.id]={solved:false,progress:0,values:[...(def.initial||[0,0,0])],last:-1,flash:0});
    }
    pressPuzzle(index){
      const def=this.def.puzzle;if(!def||!Number.isInteger(index)||index<0||index>2)return;
      if(def.requiresPuzzles?.some(id=>!this.puzzles[id]?.solved)){this.notice('powerMissing');return;}
      if(def.requiresClue&&!this.journal.includes(def.requiresClue)){this.notice('clueMissing');return;}
      const state=this.puzzleState(def);state.last=index;state.flash=.7;
      this.emit('bell'+index);
      if(state.solved)return;
      if(def.type==='sequence'){
        if(index===def.target[state.progress])state.progress++;
        else{state.progress=index===def.target[0]?1:0;this.emit('puzzleRetry');}
        state.solved=state.progress===def.target.length;
      }else if(def.type==='filters'){
        state.values[index]=1-state.values[index];state.solved=state.values.every((v,i)=>v===def.target[i]);
      }else if(def.type==='valves'){
        state.values[index]=(state.values[index]+1)%4;state.solved=state.values.every((v,i)=>v===def.target[i]);
      }else if(def.type==='tiles'){
        const [a,b]=[[0,1],[1,2],[0,2]][index];[state.values[a],state.values[b]]=[state.values[b],state.values[a]];state.solved=state.values.every((v,i)=>v===def.target[i]);
      }else if(def.type==='mirrors'){
        state.values[index]=1-state.values[index];state.solved=ZDAdventures.traceMirrors(state.values).hit;
      }else if(def.type==='weights'){
        state.values[index]=1-state.values[index];state.solved=state.values.reduce((n,v,i)=>n+v*def.weights[i],0)===def.mass;
      }else{
        if(def.type==='dials')for(const i of [index,(index+1)%3])state.values[i]=(state.values[i]+1)%3;
        else for(const bit of [[0,1],[1,2],[2]][index])state.values[bit]=1-state.values[bit];
        state.solved=state.values.every((v,i)=>v===def.target[i]);
      }
      this.emit('puzzleChanged');
      if(state.solved){this.score+=600;this.emit('puzzleSolved');}
    }
    portalOpen(portal){
      if(portal.requiresPuzzles?.some(id=>!this.puzzles[id]?.solved))return false;
      if(portal.requiresRelic&&!this.relics.includes(portal.requiresRelic))return false;
      if(portal.requiresPuzzles?.some(id=>!this.puzzles[id]?.solved))return false;
      if(portal.requiresRelics&&this.relics.length<portal.requiresRelics)return false;
      return !!(portal.return||portal.requiresRelics||portal.requiresPuzzles||this.puzzles[portal.puzzle]?.solved);
    }
    adventureInteraction(input){
      if(!input.up||this.prev.up||!this.p.ground||this.p.climbing)return false;
      const p=this.p,portal=this.def.portal;
      if(portal&&(!portal.hiddenUntilReady||this.portalOpen(portal))&&this.portalCooldown===0&&overlap(p,portal)){
        if(this.portalOpen(portal)){
          this.enterRealm(portal.to,portal.return?{x:476,y:414}:null);this.prev={...input};return true;
        }
        this.notice('puzzleLocked');return true;
      }
      const puzzle=this.def.puzzle;
      if(puzzle&&Math.abs(p.y+p.h-450)<2){
        const index=puzzle.controls.findIndex(x=>Math.abs(p.x+p.w/2-x)<=23);
        if(index>=0){this.pressPuzzle(index);this.prev={...input};return true;}
      }
      return false;
    }
    step(dt,input={}){
      if(this.won||this.discovery)return;
      const p=this.p;this.time+=dt;this.roomTime+=dt;
      for(const k of ['invuln','coyote','buffer','ladderCooldown','transitionLock','portalCooldown','noticeCooldown'])this[k]=Math.max(0,this[k]-dt);
      const puzzle=this.def.puzzle&&this.puzzleState();if(puzzle)puzzle.flash=Math.max(0,puzzle.flash-dt);
      if(this.adventureInteraction(input)){this.prev={...input};return;}
      for(const s of this.platforms)if(s.crumble){
        if(s.missing>0){s.missing=Math.max(0,s.missing-dt);if(s.missing===0){if(overlap(p,s))s.missing=.15;else s.crumbleTime=0;}}
        else if(s.crumbleTime>0){s.crumbleTime+=dt;if(s.crumbleTime>=1.1){s.missing=2.8;this.emit('crumble');}}
        else if(p.ground&&Math.abs(p.y+p.h-s.y)<1&&p.x+p.w>s.x&&p.x<s.x+s.w)s.crumbleTime=dt;
      }
      if(input.jump&&!this.prev.jump)this.buffer=.13;
      const moving=input.left||input.right||input.up||input.down||input.jump;
      if(moving||!p.ground||p.climbing)this.playingSax=false;
      if(input.sax&&!this.prev.sax){
        if(!this.saxFound)this.emit('saxMissing');
        else if(!p.ground||p.climbing||moving)this.emit('saxUnsafe');
        else{this.playingSax=!this.playingSax;if(this.playingSax){p.vx=0;this.emit('playSax');if(this.def.wonder==='whale'&&Math.abs(p.x+11-288)<43&&Math.abs(p.y+p.h-450)<2&&this.fragments.length===3&&!this.encore){this.encore=true;this.score+=1500;this.emit('encore');}}}
      }
      const cache=this.def.saxCache;
      if(cache&&!this.saxFound&&p.ground&&input.up&&!this.prev.up&&overlap(p,{x:cache.x-12,y:cache.y-8,w:cache.w+24,h:cache.h+8})){
        this.saxFound=true;this.saxAcknowledged=false;this.score+=500;this.playingSax=false;p.vx=0;p.vy=0;
        this.discovery={kind:'sax',recovered:false};this.emit('saxFound');this.prev={...input};return;
      }
      if(this.def.exit&&input.up&&!this.prev.up&&overlap(p,this.def.exit)){
        if(this.saxFound&&this.seals.length===3){this.won=true;this.emit('win');return;}
        this.notice('exitLocked');
      }
      const dir=(input.right?1:0)-(input.left?1:0),climbDir=(input.down?1:0)-(input.up?1:0);
      if(!p.climbing&&climbDir&&this.ladderCooldown===0&&!input.jump){
        const feet=p.y+p.h;
        const l=this.ladders.find(l=>Math.abs(p.x+p.w/2-l.x)<=17&&feet>=l.top-2&&feet<=l.bottom+4&&(climbDir<0?feet>l.top+.5:feet<l.bottom-.5));
        if(l){
          if(l.requires&&!this.inventory.includes(l.requires)){this.notice('locked');}
          else {p.climbing=true;p.ladder=l;p.x=l.x-p.w/2;p.vx=0;p.vy=0;p.ground=false;this.coyote=0;this.buffer=0;}
        }
      }
      if(p.climbing&&(dir||this.buffer>0)){
        this.ladderPass=this.platforms.find(s=>s.y===p.ladder.top&&s.x<=p.ladder.x&&s.x+s.w>=p.ladder.x);
        p.climbing=false;p.ladder=null;this.ladderCooldown=.25;
        if(this.buffer>0){p.vy=-480;this.buffer=0;this.emit('jump');}
      }
      if(p.climbing){
        const l=p.ladder;p.vx=0;p.vy=climbDir*(l.kind==='rope'?(climbDir>0?150:90):105);p.ground=false;this.coyote=0;p.x=l.x-p.w/2;p.y+=p.vy*dt;
        if(p.y+p.h<=l.top){
          if(l.to&&l.direction==='up'){this.enterRealm(l.to,l.spawn);this.prev={...input};return;}
          p.y=l.top-p.h;p.climbing=false;p.ladder=null;p.ground=true;p.vy=0;this.coyote=.1;
        }else if(p.y+p.h>=l.bottom){
          if(l.to&&l.direction==='down'){this.enterRealm(l.to,l.spawn);this.prev={...input};return;}
          p.y=l.bottom-p.h;p.climbing=false;p.ladder=null;p.ground=true;p.vy=0;this.coyote=.1;
        }
      }else{
        p.vx+=(dir*220-p.vx)*Math.min(1,dt*(p.ground?19:9));if(dir)p.face=dir;
        if(this.buffer>0&&this.coyote>0){p.vy=-540;p.ground=false;this.coyote=0;this.buffer=0;this.emit('jump');}
        if(!input.jump&&this.prev.jump&&p.vy< -210)p.vy=-210;
        p.vy=Math.min(p.vy+1450*dt,760);
        const solids=this.platforms.filter(s=>s!==this.ladderPass&&!s.missing);
        const support=p.ground?solids.find(s=>Math.abs(s.y-p.y-p.h)<1&&p.x+p.w>s.x&&p.x<s.x+s.w):null;
        const belt=support?.belt&&p.x+11>=support.beltStart&&p.x+11<=support.beltEnd?support.belt:0;
        p.x+=(p.vx+belt)*dt;p.x=Math.max(0,Math.min(this.def.width-p.w,p.x));
        for(const s of solids)if(overlap(p,s)){p.x=p.vx>0?s.x-p.w:s.x+s.w;p.vx=0;}
        p.y+=p.vy*dt;p.ground=false;
        for(const s of solids)if(overlap(p,s)){if(p.vy>=0){p.y=s.y-p.h;p.ground=true;this.coyote=.1;}else p.y=s.y+s.h;p.vy=0;}
        if(this.ladderPass&&!overlap(p,this.ladderPass))this.ladderPass=null;
      }
      for(const n of this.notes)if(!n.taken&&overlap(p,n)){n.taken=true;this.score+=100;this.emit('note');}
      for(const item of this.items)if(!item.taken&&overlap(p,item)){
        item.taken=true;this.score+=item.kind==='treasure'?400:250;
        if(item.kind==='key')this.inventory.push(item.id);
        if(item.kind==='seal')this.seals.push(item.id);
        if(item.kind==='fragment')this.fragments.push(item.id);
        if(item.kind==='clue')this.journal.push(item.id);
        if(item.kind==='relic')this.relics.push(item.id);
        this.emit(item.kind);
      }
      for(const enemy of this.patrols){
        enemy.x+=enemy.dir*enemy.speed*dt;
        if(enemy.x>=enemy.max){enemy.x=enemy.max;enemy.dir=-1;}if(enemy.x<=enemy.min){enemy.x=enemy.min;enemy.dir=1;}
      }
      for(const b of this.barriers){const phase=(this.roomTime+b.on+.9+b.phase*.1)%b.period;b.active=phase<b.on;b.warning=!b.active&&phase>b.period-.8;}
      if(p.y>630||this.spikes.some(s=>overlap(p,s))||(this.invuln<=0&&(this.patrols.some(e=>overlap(p,e))||this.barriers.some(b=>b.active&&overlap(p,b))))){this.die();this.prev={...input};return;}
      if(this.transitionLock===0&&p.ground){
        const direction=p.x<=1&&input.left?'left':p.x>=this.def.width-p.w-1&&input.right?'right':null;
        const link=direction&&this.def.links[direction];if(link){if(link.requiresPuzzle&&!this.puzzles[link.requiresPuzzle]?.solved){this.notice('puzzleLocked');this.prev={...input};return;}this.enterRealm(link.to,link.spawn);this.prev={...input};return;}
      }
      this.prev={...input};
    }
  }
  window.ZD={World,realms,overlap};
})();
