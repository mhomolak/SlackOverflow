exports.seed = function(knex, Promise) {

  var superpowersArr =
  [{name: 'flight', description: 'that\'s levitations, homes '},
  {name: 'mind-bullets', description: 'that\'s telekinesis, kyle'},
  {name: 'the power to move you', description: 'RIGAGOOGOORIGGAGOOGOO'}];

  var tagsArr = [{name: 'javascript', description:'the javascript tag'},
                 {name: 'knex', description:'the knex tag'},
                 {name: 'node', description:'the node tag'}];

  var channelsArr = [{name:'The First Channel'},
                  {name: 'The Second Channel'},
                  {name: 'The Third Channel'}];

  var oauth_servicesArr = [{name: 'Google'},
                           {name: 'Facebook'},
                           {name: 'Twitter'}];

  var articlesArr = [{name: 'Article 1-- HTML'},
                  {name: 'Article 2-- CSS'},
                  {name: 'Article 3-- Javascript'},
                  {name: 'Artigle 4-- Learning to Learn'}]



  return Promise.join(
    // Deletes ALL existing entries
    knex.raw('TRUNCATE articles, articles_questions, channels, channels_users, knex_migrations, knex_migrations_lock, messages, oauth_services, questions, replies, replies_votes, superpowers, tags, tags_articles, tags_questions, users, users_oauth CASCADE'),
    knex.raw('ALTER SEQUENCE articles_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE channels_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE knex_migrations_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE messages_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE oauth_services_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE questions_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE replies_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE superpowers_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE tags_id_seq RESTART'),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART'),



    // Inserts seed entries
    knex('superpowers').insert(superpowersArr),
    knex('tags').insert(tagsArr),
    knex('channels').insert(channelsArr),
    knex('oauth_services').insert(oauth_servicesArr),
    knex('articles').insert(articlesArr)
  );
};
