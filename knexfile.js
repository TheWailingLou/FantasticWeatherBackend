module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fantastic-weather'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
