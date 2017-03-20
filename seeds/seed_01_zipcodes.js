exports.seed = (knex, Promise) => {
  return knex('zipcode').del()
    .then( () => {
      return knex('zipcode').insert([
        {id: 80302}, //Boulder
        {id: 81657}, //Vail
        {id: 81620}, //Beaver Creek
        {id: 80809}, //Pikes Peak
        {id: 80424}, //Breckenridge
        {id: 80435}, //Keystone
        {id: 80025}, //Eldorado Springs
        {id: 80466}, //Nederland
        {id: 80465} //Red Rocks
      ])
    })
}
