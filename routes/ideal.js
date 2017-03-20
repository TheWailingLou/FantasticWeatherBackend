var knex = require('../db/knex');
function Ideal() {
  return knex('ideal');
}
