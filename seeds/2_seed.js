exports.seed = function(knex, Promise) {

  var usersArr = [{ name: 'James Freeman', password: 'slackoverflow', email: 'freeman.james.h@gmail.com', admin: true, portrait_url: 'https://robohash.org/104.236.21.134.png', github_profile_url: 'https://github.com/FreemanJamesH', biography: 'Student at Galvanize', superpower_id: 1},
        { name: 'Anthony Simpson', password: 'slackoverflow', email: 'ansi6622@colorado.edu', admin: true, portrait_url: 'https://robohash.org/anthony', github_profile_url: 'https://github.com/FreemanJamesH', biography: 'Student at Galvanize', superpower_id: 1},
        { name: 'Mike Homolak', password: 'slackoverflow', email: 'mhomolak5@gmail.com', admin: true, portrait_url: 'https://robohash.org/homolak', github_profile_url: 'https://github.com/FreemanJamesH', biography: 'Student at Galvanize', superpower_id: 1},
        { name: 'Courtney Morrissey', password: 'slackoverflow', email: 'courtneycmorrissey@gmail.com', admin: true, portrait_url: 'https://robohash.org/courtney', github_profile_url: 'https://github.com/FreemanJamesH', biography: 'Student at Galvanize', superpower_id: 1 }
      ];
  var tags_articlesArr = [
    {tag_id: 1, article_id: 3},
    {tag_id: 3, article_id: 1},
    {tag_id: 2, article_id: 2},
    {tag_id: 1, article_id: 1},
    {tag_id: 1, article_id: 2},
    {tag_id: 4, article_id: 2},
    {tag_id: 5, article_id: 2},
    {tag_id: 6, article_id: 2},
    {tag_id: 6, article_id: 1},
    {tag_id: 6, article_id: 3},
  ];

  return Promise.join(

    knex('users').insert(usersArr),
    knex('tags_articles').insert(tags_articlesArr)

  );
};
