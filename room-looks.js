/* Stable architecture schedule; adjacent rooms use different silhouettes, never random geometry. */
(() => {
 const rows=[['reservoir','hangar','forge','aquarium','ruins','archive','forest','rooftops'],['stage','archive','rooftops','trainyard','hangar','forge','observatory','stage'],['forest','ruins','aquarium','rooftops','archive','forest','observatory','ice'],['forge','trainyard','hangar','reservoir','ruins','archive','forge','rooftops'],['archive','observatory','stage','ruins','aquarium','forest','trainyard','hangar'],['ice','hangar','ruins','observatory','reservoir','forge','aquarium','rooftops']];
 const themes={reservoir:'canal',rooftops:'garden',observatory:'cavern',forest:'garden',trainyard:'workshop',archive:'library',forge:'workshop',aquarium:'canal',ruins:'cavern',stage:'casino',ice:'cavern',hangar:'workshop'};
 for(const room of Object.values(ZDRealms))if(!room.secret){room.look=rows[room.row][room.col];room.theme=themes[room.look];}
 for(const [id,look] of Object.entries({r06:'stage',r13:'observatory',r14:'ice',r22:'observatory',r29:'archive',r34:'forge',r38:'observatory'})){ZDRealms[id].look=look;ZDRealms[id].theme=themes[look];}
 const secretLooks={s04:'archive',s05:'rooftops',s06:'observatory',s07:'aquarium',s08:'reservoir',s09:'ruins',s11:'forge',s12:'hangar',s13:'forest',s14:'reservoir',s15:'archive',s16:'aquarium',s17:'observatory',s18:'rooftops',s19:'ruins',s20:'aquarium',s21:'ice',s22:'forge',s23:'forest',s24:'hangar',s25:'archive',s26:'forge',s27:'forest'};
 for(const [id,look] of Object.entries(secretLooks))ZDRealms[id].backdrop=look;
})();
