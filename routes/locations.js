var knex = require('../db/knex');
function Location() {
  return knex('location');
}
