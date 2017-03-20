module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/[TODO]'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
