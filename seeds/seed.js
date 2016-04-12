exports.seed = function(knex, Promise) {
    return Promise.join(
      // Deletes ALL existing entries
      knex.raw('TRUNCATE channels, channels_users, articles, knex_migrations, knex_migrations_lock, messages, oauth_services, questions, replies, replies_votes, superpowers, tags, tags_questions, users, users_oauth CASCADE'),
      knex.raw('ALTER SEQUENCE channels_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE knex_migrations_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE messages_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE oauth_services_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE questions_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE replies_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE tags_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE users_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE superpowers_id_seq RESTART'),
      knex.raw('ALTER SEQUENCE articles_id_seq RESTART'),


        // Inserts seed entries
        knex('superpowers').insert({name:'flight', description:'that\'s levitations, homes '}),
        knex('superpowers').insert({name:'mind-bullets', description:'that\'s telekinesis, kyle'}),
        knex('superpowers').insert({name:'the power to move you', description:'RIGAGOOGOORIGGAGOOGOO'}),
        knex('users').insert({
          name: 'James Freeman',
          password: 'slackoverflow',
          email: 'freeman.james.h@gmail.com',
          admin: true,
          portrait_url: 'https://robohash.org/104.236.21.134.png',
          github_profile_url: 'https://github.com/FreemanJamesH',
          biography: 'Student at Galvanize',
        //   superpower_id: 1
        }),
        knex('users').insert({
          name: 'Anthony Simpson',
          password: 'slackoverflow',
          email: 'ansi6622@colorado.edu',
          admin: true,
          portrait_url: 'https://robohash.org/anthony',
          github_profile_url: 'https://github.com/FreemanJamesH',
          biography: 'Student at Galvanize',
        //   superpower_id: 1
        }),
        knex('users').insert({
          name: 'Mike Homolak',
          password: 'slackoverflow',
          email: 'mhomolak5@gmail.com',
          admin: true,
          portrait_url: 'https://robohash.org/homolak',
          github_profile_url: 'https://github.com/FreemanJamesH',
          biography: 'Student at Galvanize',
        //   superpower_id: 1
        }),
        knex('users').insert({
          name: 'Courtney Morrissey',
          password: 'slackoverflow',
          email: 'courtneycmorrissey@gmail.com',
          admin: true,
          portrait_url: 'https://robohash.org/courtney',
          github_profile_url: 'https://github.com/FreemanJamesH',
          biography: 'Student at Galvanize',
        //   superpower_id: 1
        }),
        //tags
        knex('tags').insert({name: 'javascript', description:'the javascript tag'}),
        knex('tags').insert({name: 'knex', description:'the knex tag'}),
        knex('tags').insert({name: 'node', description:'the node tag'}),
        // articles
        knex('articles').insert({name: 'Article 1 -- HTML'}),
        knex('articles').insert({name: 'Article 2-- CSS'}),
        knex('articles').insert({name: 'Article 3-- Javascript'}),
        //questions
        knex('questions').insert({
            title: 'Article 1 -- HTML',
            body: 'A question. A very good question.',
            user_id: 1
        }),
        knex('questions').insert({
            title: 'Article 2-- CSS',
            body: 'A question. A very good question.',
            user_id: 2
        }),
        knex('questions').insert({
            title: 'Article 3-- Javascript',
            body: 'A question. A very good question.',
        }),
        knex('channels').insert({name:'An inaugural channel.'}),
        knex('replies').insert({
            body: 'A question. A very good question.',
            user_id: 2,
            question_id: 3
        }),
        knex('replies').insert({
            body: 'A question. A very good question.',
            user_id: 2,
            question_id: 1
        }),
        knex('replies').insert({
            body: 'A question. A very good question.',
            user_id: 2,
            question_id: 2
        }),
        knex('messages').insert({
            body: 'A messages. A very good messages.',
            user_id: 2
        }),
        knex('messages').insert({
            body: 'A second messages. A very good second messages.',
            user_id: 4
        }),
        knex('messages').insert({
            body: 'A third messages. A very good  third messages.',
            user_id: 1
        }),
        knex('messages').insert({
            body: 'A fourth messages. A very good fourth messages.',
            user_id: 3
        })
      );
    };
