exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then( () => {
      return knex('user').insert([
        {email: 'faisonusmc@gmail.com' , password: 'lane'},
        {email: 'torrepaul@gmail.com', password: 'paul'},
        {email: 'louisemail@gmail.com', password: 'louis'},
        {email: 'steveemail@gmail.com', password: 'steve'}
      ])
    })
}
