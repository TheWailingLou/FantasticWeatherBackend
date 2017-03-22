exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table){
    table.increments('id')
    table.string('name')
    table.decimal('longitude')
    table.decimal('latitude')
    // table.integer('zipcode_id').references('zipcode.id').notNullable().onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
