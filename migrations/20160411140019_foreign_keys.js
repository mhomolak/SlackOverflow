
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.datetime('date');
    table.text('body');
  })
  .createTable('questions', function(table) {
    table.increments('');
    table.text('body');
    table.string('title');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.datetime('date');
  })
  .createTable('replies', function(table) {
    table.increments('');
    table.text('body');
    table.datetime('date');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('question_id').references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages').dropTable('replies').dropTable('questions');
};
