
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tags').del(),

    // Inserts seed entries
    knex('tags').insert({id: 1, name: 'javascript', description: 'the javascript tag'}),
    knex('tags').insert({id: 2, name: 'knex', description: 'the knex tag'}),
    knex('tags').insert({id: 3, name: 'express', description: 'the express tag'})
  );
};
