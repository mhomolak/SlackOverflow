exports.seed = function(knex, Promise) {

  var replies_votesArr =
                  [{user_id: 2, reply_id: 3},
                  {user_id: 3, reply_id: 3},
                  {user_id: 1, reply_id: 3}];


  return Promise.join(

  knex('replies_votes').insert(replies_votesArr)

  );
};
