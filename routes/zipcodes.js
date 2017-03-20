var knex = require('../db/knex');
function Zipcode() {
  return knex('zipcode');
}
