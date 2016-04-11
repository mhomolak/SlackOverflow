
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name');
    table.string('password');
    table.string('email');
    table.datetime('date');
    table.boolean('admin').defaultTo('false');
  })
  .createTable('tags', function(table) {
    table.increments();
    table.string('name');
    table.string('description');
  })
  .createTable('channels', function(table) {
    table.increments();
    table.string('name');
  })
  .createTable('oauth_services', function(table) {
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').dropTable('tags').dropTable('channels').dropTable('oauth_services');  
};
