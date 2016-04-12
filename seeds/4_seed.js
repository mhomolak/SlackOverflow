exports.seed = function(knex, Promise) {

  var tags_questionsArr = [
    {tag_id: 3, question_id: 2},
    {tag_id: 2, question_id: 3},
    {tag_id: 1, question_id: 1}
  ]

  var articles_questionsArr = [
    {article_id: 1, question_id: 1},
    {article_id: 2, question_id: 2},
    {article_id: 3, question_id: 3}
  ];

  var repliesArr = [
    { id: 2, body: 'A reply. A very good reply.', user_id: 2, question_id: 1},
    { id: 3, body: 'A reply. A very good reply.', user_id: 2, question_id: 1},
    { id: 1, body: 'A reply. A very good reply.', user_id: 2, question_id: 1}
  ]

  return Promise.join(

    knex('tags_questions').insert(tags_questionsArr),
    knex('articles_questions').insert(articles_questionsArr),
    knex('replies').insert(repliesArr)

  );
};
