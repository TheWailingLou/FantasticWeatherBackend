exports.seed = (knex, Promise) => {
  return knex('username').del()
    .then( () => {
      return knex('username').insert([
        {email: 'faisonusmc@gmail.com' , password: 'lane'},
        {email: 'torrepaul@gmail.com', password: 'paul'},
        {email: 'louisemail@gmail.com', password: 'louis'},
        {email: 'stephenaodell@gmail.com', password: 'steve'}
      ])
    })
}
