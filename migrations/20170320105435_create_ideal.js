exports.up = function(knex, Promise) {
  return knex.schema.createTable('ideal', function(table){
    table.primary(['user_id','location_id'])
    table.integer('user_id').references('user.id').onDelete('cascade')
    table.integer('location_id').references('location.id').onDelete('cascade')
    table.integer('temp_min')
    table.integer('temp_max')
    table.integer('wind_max')
    table.decimal('percip_max')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ideal');
};
