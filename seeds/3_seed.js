exports.seed = function(knex, Promise) {

  var messagesArr = [
    {body: 'A message. A very good message.', user_id: 1},
    {body: 'A second message. A very good second message.', user_id: 2},
    {body: 'A third message. A very good third message.', user_id: 1},
    {body: 'A fourth message. A very good fourth message.', user_id: 3}
  ];

  var questionsArr = [
    {title: 'A first question', body: 'A question. A very good question.', user_id: 1},
    {title: 'A second question', body: 'A question. A very good question.', user_id: 2},
    {title: 'A third question', body: 'A question. A very good question.', user_id: 2}
  ]

  var tags_usersArr = [
    {user_id: 1, tag_id:3},
    {user_id: 1, tag_id:6},
    {user_id: 2, tag_id:2},
    {user_id: 3, tag_id:1},
    {user_id: 3, tag_id:3},
    {user_id: 3, tag_id:2},
    {user_id: 2, tag_id:5},
    {user_id: 2, tag_id:4}

  ]

  var channels_usersArr = [
    {channel_id: 2, user_id: 3},
    {channel_id: 3, user_id: 1},
    {channel_id: 1, user_id: 2}
  ]

  var users_oauthArr = [
    {oauth_services_id: 1, user_id: 2},
    {oauth_services_id: 2, user_id: 1},
    {oauth_services_id: 3, user_id: 3}
  ]

  return Promise.join(

    knex('messages').insert(messagesArr),
    knex('questions').insert(questionsArr),
    knex('tags_users').insert(tags_usersArr),
    knex('channels_users').insert(channels_usersArr),
    knex('users_oauth').insert(users_oauthArr)

  );
};
