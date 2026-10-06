/* A connected clockwork expedition: water pressure and sliding mosaic. */
(() => {
 const rooms=ZDRealms;
 ZDAdventures.clues.mosaicSketch={title:'Rysunek mechanicznego ptaka',text:'Na rysunku trzy pióra: ◆ → ✦ → ●. Dźwignie zamieniają miejscami pary płytek: 1↔2, 2↔3 oraz 1↔3.'};
 const defs=[
 {host:'r34',id:'pressure',type:'valves',controls:[135,290,410],initial:[0,0,0],target:[2,1,3],destination:'s11',clue:'Ustaw ciśnienie 2 · 1 · 3. ↑ obraca zawór o jedną kreskę; po 3 wraca 0. Woda jest bezpieczna.',hint:'Trzy manometry zasilają ukryty mechanizm. Obserwuj wskazówki i kreski.'},
 {host:'s12',id:'mosaic',type:'tiles',controls:[140,290,460],initial:[0,1,2],target:[1,2,0],requiresClue:'mosaicSketch',destination:'s13',clue:'Ułóż pióra według rysunku z poprzedniego pokoju. Dźwignie zamieniają pary 1↔2, 2↔3, 1↔3.',hint:'Każda dźwignia zamienia dwie płytki. Rysunek ptaka zostaje w dzienniku.'}
 ];
 function room(id,index,parent,wonder,shelves,routes){return rooms[id]={id,index,parent,wonder,expedition:true,secret:true,row:6,col:index-48,theme:'library',variant:0,width:576,spawn:{x:65,y:414},platforms:[{x:0,y:450,w:576,h:100},...shelves.map(([x,y,w])=>({x,y,w,h:18}))],ladders:routes.map(([x,top,bottom,kind])=>({x,top,bottom,w:24,kind:kind||'ladder'})),notes:[],items:[],spikes:[],patrols:[],barriers:[],links:{},hint:'Rozejrzyj się na podestach. Mechanizmy zostawiają wskazówki do następnego pokoju.'};}
 room('s11',58,'r34','workshop',[[140,365,155],[275,280,190]],[[170,365,450],[287,280,365,'rope']]);
 room('s12',59,'s11','workshop',[[145,325,310],[250,230,140]],[[175,325,450],[425,325,450,'rope'],[278,230,325]]);
 room('s13',60,'s12','aviary',[[140,365,160],[280,285,175]],[[170,365,450],[292,285,365,'rope']]);
 rooms.s11.portal={x:22,y:375,w:40,h:75,to:'r34',return:true};rooms.s13.portal={x:508,y:375,w:40,h:75,to:'r34',return:true};
 rooms.s11.links.right={to:'s12',spawn:{x:30,y:414}};rooms.s12.links.left={to:'s11',spawn:{x:524,y:414}};
 rooms.s12.links.right={to:'s13',requiresPuzzle:'mosaic',spawn:{x:30,y:414}};rooms.s13.links.left={to:'s12',spawn:{x:524,y:414}};
 rooms.s11.items.push({kind:'clue',id:'mosaicSketch',x:420,y:250,w:24,h:26});rooms.s13.items.push({kind:'treasure',id:'clockFeather',x:410,y:255,w:24,h:26});
 rooms.s13.hint='Mechaniczny ptak strzeże złotego pióra na górnym podeście. Prawy portal prowadzi z powrotem.';
 for(const def of defs){const host=rooms[def.host];host.puzzle=def;host.hint=def.hint;host.spikes=[];host.patrols=[];host.barriers=[];host.notes.filter(n=>n.y===415).forEach((n,i)=>n.x=i?476:72);}
 rooms.r34.portal={x:508,y:375,w:40,h:75,to:'s11',puzzle:'pressure'};
 ZDAdventures.definitions.push(...defs);ZDCampaign.total=61;
})();
