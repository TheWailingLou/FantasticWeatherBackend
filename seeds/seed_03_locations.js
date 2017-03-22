exports.seed = (knex, Promise) => {
  return knex('location').del()
    .then( () => {
      return knex('location').insert([
        {name: 'Royal Arch Trail', longitude: -105.287919, latitude: 40.007012},// zipcode_id: knex('zipcode').where('id', 80302).select('id')},
        {name: 'Chautauqua', longitude: -105.284486, latitude: 39.986892},// zipcode_id: knex('zipcode').where('id', 80302).select('id')},
        {name: 'Vail Hike', longitude: -106.379746, latitude: 39.635671}, // zipcode_id: knex('zipcode').where('id', 81657).select('id')},
        {name: 'Beaver Creek Hike', longitude: -106.517789, latitude: 39.602115}, // zipcode_id: knex('zipcode').where('id', 81620).select('id')},
        // {name: 'Pikes Peak Hike', longitude: -105.041911, latitude: 38.840511, zipcode_id: knex('zipcode').where('id', 80809).select('id')},
        // {name: 'Breckenridge Hike', longitude: -106.069221, latitude: 39.481085, zipcode_id: knex('zipcode').where('id', 80424).select('id')},
        // {name: 'Keystone Hike', longitude: -105.974624, latitude: 39.599562, zipcode_id: knex('zipcode').where('id', 80435).select('id')},
        // {name: 'Eldorado Springs Hike', longitude: -105.256371, latitude: 39.937478, zipcode_id: knex('zipcode').where('id', 80025).select('id')},
        {name: 'Nederland Hike', longitude: -105.503077, latitude: 39.968547},// zipcode_id: knex('zipcode').where('id', 80466).select('id')},
        {name: 'Red Rocks Run', longitude: -105.205589, latitude: 39.665251}//, zipcode_id: knex('zipcode').where('id', 80465).select('id')}
      ])
    })
}

// return knex('location').insert([
//   {name: 'Royal Arch Trail', longitude: -105.287919, latitude: 40.007012, zipcode_id: knex('zipcode').where('zipcode.id',80302).select('zipcode.id')},
//   {name: 'Chautauqua', longitude: -105.284486, latitude: 39.986892, zipcode_id: knex('zipcode').where('zipcode.id',80302).select('zipcode.id')},
//   {name: 'Vail Hike', longitude: -106.379746, latitude: 39.635671, zipcode_id: knex('zipcode').where('zipcode.id',81657).select('zipcode.id')},
//   {name: 'Beaver Creek Hike', longitude: -106.517789, latitude: 39.602115, zipcode_id: knex('zipcode').where('zipcode.id',81620).select('zipcode.id')},
//   {name: 'Pikes Peak Hike', longitude: -105.041911, latitude: 38.840511, zipcode_id: knex('zipcode').where('zipcode.id',80809).select('zipcode.id')},
//   {name: 'Breckenridge Hike', longitude: -106.069221, latitude: 39.481085, zipcode_id: knex('zipcode').where('zipcode.id',80424).select('zipcode.id')},
//   {name: 'Keystone Hike', longitude: -105.974624, latitude: 39.599562, zipcode_id: knex('zipcode').where('zipcode.id',80435).select('zipcode.id')},
//   {name: 'Eldorado Springs Hike', longitude: -105.256371, latitude: 39.937478, zipcode_id: knex('zipcode').where('zipcode.id',80025).select('zipcode.id')},
//   {name: 'Nederland Hike', longitude: -105.503077, latitude: 39.968547, zipcode_id: knex('zipcode').where('zipcode.id',80466).select('zipcode.id')},
//   {name: 'Red Rocks Run', longitude: -105.205589, latitude: 39.665251, zipcode_id: knex('zipcode').where('zipcode.id',80465).select('zipcode.id')}
// ])
