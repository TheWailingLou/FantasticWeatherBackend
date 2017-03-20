var knex = require('../db/knex');
function User() {
  return knex('user');
}
