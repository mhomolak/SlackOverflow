
exports.up = function(knex, Promise) {
  return knex.schema.createTable('channels_users', function(table) {
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('channel_id').references('id').inTable('channels').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('replies_votes', function(table) {
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('reply_id').references('id').inTable('replies').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('users_oauth', function(table) {
    table.integer('oauth_services_id').references('id').inTable('oauth_services').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('oauth_given_id');
  })
  .createTable('tags_questions', function(table) {
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('question_id').references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('articles_questions', function(table) {
    table.integer('question_id').references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('article_id').references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('tags_articles', function(table) {
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('article_id').references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('channels_users').dropTable('replies_votes').dropTable('users_oauth').dropTable('tags_questions').dropTable('tags_articles').dropTable('articles_questions');
};
