exports.seed = (knex, Promise) => {
  return knex('zipcode').del()
    .then( () => {
      return knex('zipcode').insert([
        {id: 80302}, //Boulder, "lat": 40.038629, "lng": -105.3716684
        {id: 81657}, //Vail, lat": 39.6648024, "lng": -106.3934777
        {id: 81620}, //Beaver Creek "lat": 39.595736, "lng": -106.5230542
        {id: 80809}, //Pikes Peak  "lat": 38.8408707, "lng": -105.0422595
        {id: 80424}, //Breckenridge  "lat": 39.476845, "lng": -106.0169971
        {id: 80435}, //Keystone  "lat": 39.5791675, "lng": -105.9347384
        {id: 80025}, //Eldorado Springs  "lat": 39.9324862, "lng": -105.2769348
        {id: 80466}, //Nederland "lat": 39.9613759, "lng": -105.5108312
        {id: 80465} //Red Rocks  "lat": 39.664879, "lng": -105.2051438
      ])
    })
}
