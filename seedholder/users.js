exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
       id: 1, name: 'James Freeman', password: 'slackoverflow', email: 'freeman.james.h@gmail.com',   admin: true
        // portrait_URL: 'https://robohash.org/104.236.21.134.png',
        // github_profile_URL: 'https://github.com/FreemanJamesH',
        //  biography: 'Student at Galvanize',
        //  superpower_id: 1
    }),
    knex('users').insert({
       id: 2, name: 'Courtney Morrisey', password: 'slackoverflow', email: 'courtcourt@gmail.com',   admin: true
        // portrait_URL: 'https://robohash.org/104.236.21.134.png',
        // github_profile_URL: 'https://github.com/FreemanJamesH',
        //  biography: 'Student at Galvanize',
        //  superpower_id: 1
    }),
    knex('users').insert({
       id: 3, name: 'Mike Homolak', password: 'slackoverflow', email: 'mikehlak@gmail.com',   admin: true
        // portrait_URL: 'https://robohash.org/104.236.21.134.png',
        // github_profile_URL: 'https://github.com/FreemanJamesH',
        //  biography: 'Student at Galvanize',
        //  superpower_id: 1
    }),
    knex('users').insert({
       id: 4, name: 'Tony Tronify', password: 'slackoverflow', email: 'tonester@gmail.com',   admin: true
        // portrait_URL: 'https://robohash.org/104.236.21.134.png',
        // github_profile_URL: 'https://github.com/FreemanJamesH',
        //  biography: 'Student at Galvanize',
        //  superpower_id: 1
    })
  )
};
