exports.up = function(knex, Promise) {
  return knex.schema.createTable('zipcode', function(table){
    table.integer('id').unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('zipcode');
};
