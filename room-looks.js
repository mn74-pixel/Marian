/* Adjacent rooms may change architecture while retaining their authored routes. */
(() => {
 const alternatives={canal:'workshop',casino:'library',garden:'canal',workshop:'canal',library:'garden',cavern:'workshop'};
 for(const room of Object.values(ZDRealms))if(!room.secret&&!room.puzzle&&[2,5].includes(room.col)){
  room.theme=alternatives[room.theme]||room.theme;
 }
})();
