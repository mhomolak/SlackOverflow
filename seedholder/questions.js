
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('questions').del(),

    // Inserts seed entries
    knex('questions').insert({id: 1, body: 'rowValue', title: 'title', user_id: 1})
  );
};
