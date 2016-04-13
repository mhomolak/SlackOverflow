var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('articles')
  .then(function(articles){
    res.render('loggedin', { articles: articles});
  })
});

router.get('/articles/:articlesID', function(req, res, next) {
var bigArray = [];
knex.from('articles').where('articles.id', req.params.articlesID)
  .innerJoin('articles_questions', 'articles.id', 'articles_questions.article_id')
  .innerJoin('questions', 'questions.id', 'articles_questions.question_id')
  .innerJoin('users', 'users.id', 'questions.user_id')
  .then(function(results) {
    console.log(results)
    var resultsArray = results;
    for (var i = 0; i < resultsArray.length; i++) {
      var questionInfo = {};
      questionInfo.question_id = resultsArray[i].question_id;
      questionInfo.title = resultsArray[i].title;
      questionInfo.name = resultsArray[i].name;
      questionInfo.user_id = resultsArray[i].user_id;
      questionInfo.date = resultsArray[i].date;
      questionInfo.count = 'Count Goes Here';
      questionInfo.id = results[i].id;
      knex('replies').where('question_id', questionInfo.id)
        .then(function(replies) {
          questionInfo.count = replies.length
          bigArray.push(questionInfo);
          console.log(bigArray)
        });
      knex('articles').where('articles.id', req.params.articlesID)
        .then(function(results){
          articleTitle = results[0].name;
        })
        .then(function(){
          console.log('about to render...')
          console.log(articleTitle)
          res.render('articles', {
            data: bigArray,
            title: articleTitle
          })
        })
      };
    })
  });

// console.log(bigArray);

//need to add knex('articles')
router.get('/users', function(req, res, next) {
  knex('users')
  .then(function(users){
    res.render('users', {users: users});
  })
});

//not working?
router.get('/articles/:articlesID', function(req, res, next) {
  knex('articles')
  .then(function(articles){
    res.render('articles', { articles: articles});
  })
});


router.get('/questions/:threadID', function(req, res, next) {
  knex('articles')
  .then(function(articles){
    res.render('thread', { articles: articles});
  })
  var threadName;
  knex('questions').where('id', req.params.threadID)
    .then(function(threadresults){
      threadName = threadresults[0].title
      console.log(threadName)
    }).then(function(){
      knex('replies').where('question_id', req.params.threadID)
      .innerJoin('users', 'users.id', 'replies.user_id')
      .then(function(results){
        console.log(results)
        res.render('thread', ({data:results, thread_title:threadName}));
      })
    })
});


// router.get('/profile/:userID', function(req, res, next) {
//   res.render('profile');
// });

router.get('/profile/:userID', function(req, res, next) {
  var articles = [];
  knex('articles')
  .then(function(articlesreturn){
    articles = articlesreturn
  }).then(function(){
    knex('users').select('users.name as user_name', '*')
    .innerJoin('superpowers', 'users.superpower_id', 'superpowers.id')
    .where('users.id', req.params.userID).first()
    .then(function(results){
      console.log(results)
      res.render('profile', {data:results, articles:articles});
    })
  })
});


router.get('/profile/:userID/edit', function(req, res, next) {
  knex('articles')
  .then(function(articles){
    res.render('edit', { articles: articles});
  })
});



router.get('/superpowers', function(req, res, next) {
  knex('superpowers')
  .then(function(superpowers){
    return knex('articles')
    .then(function(articles){
      res.render('superpowers', {
      superpowers: superpowers,
       articles: articles
    });
    })
  })
});


router.get('/superpowers/:ID', function(req, res, next) {
  knex('superpowers').where({'id': req.params.ID})
  .then(function(superpowers){
    return knex('articles')
    .then(function(articles){
    res.render('superpowers', {
      superpowers: superpowers,
       articles: articles
    });
    })
  })
});

router.get('/channels', function(req, res, next) {
  knex('channels')
  .then(function(results) {
    return knex('articles')
    .then(function(articles){
      console.log(results);
      res.render('channels', {
        title: "Channels", channels: results, articles: articles
      });
    })
  })
});

router.get('/channels_users', function(req, res, next) {
  knex('channels').reduce(function ( channel_arr, channel ){
    return knex('users')
    .innerJoin('channels_users', 'users.id', 'channels_users.user_id')
    .where({channel_id: channel.id})
    .reduce(function ( user_arr, channel ){
      user_arr.push(channel);
      return user_arr;
    }, [] ).then(function ( users ){
      channel.users = users;
      channel_arr.push(channel);
      return channel_arr;
    })
  }, [])
  .then(function ( channels ){
    return knex('articles')
    .then(function(articles){
      console.log(channels);
      res.render('channels', {
        channels: channels, articles: articles
       });
    })
  })
});

router.get('/replies_votes', function(req, res, next) {
    knex('replies').reduce(function ( reply_arr, reply ){
      return knex('users')
      .innerJoin('replies_votes', 'users.id', 'replies_votes.user_id')
      .where({reply_id: reply.id})
      .reduce(function ( user_arr, user ){
        user_arr.push(user);
        return user_arr;
      }, [] ).then(function ( users ){
        reply.users = users;
        reply_arr.push(reply);
        return reply_arr;
      })
    }, [])
    .then(function ( replies ){
      return knex('articles')
      .then(function(articles){
        console.log(replies);
        res.render('votes', {
          replies: replies, articles: articles
        });
      })
    })
});


router.get('/messages', function(req, res, next) {
  knex('messages')
  .then(function(results) {
    return knex('articles')
    .then(function(articles){
      res.render('messages', {
        articles: articles,
        title: "Messages",
        messages: results
      });
    });
  })
});



// router.get('/articles_questions', function(req, res, next) {
//   knex('articles').reduce(function ( article_arr, article ){
//     return knex('questions')
//     .innerJoin('articles_questions', 'questions.id', 'articles_questions.question_id')
//     .where({article_id: article.id})
//     .reduce(function ( question_arr, question ){
//       question_arr.push(question);
//       return question_arr;
//     }, [] ).then(function ( questions ){
//       article.questions = questions;
//       article_arr.push(article);
//       return article_arr;
//     })
//   }, [])
//   .then(function ( articles ){
//     console.log(articles);
//     res.render('articles', { articles: articles })
//   })
// });




router.get('/oauth_services', function(req, res, next) {
  knex('oauth_services').reduce(function ( oauth_services_arr, strategy ){
    return knex('users')
    .innerJoin('users_oauth', 'users.id', 'users_oauth.user_id')
    .where({oauth_services_id: strategy.id})
    .reduce(function ( user_arr, user ){
      user_arr.push(user);
      return user_arr;
    }, [] ).then(function ( users ){
      strategy.users = users;
      oauth_services_arr.push(strategy);
      return oauth_services_arr;
    })
  }, [])
  .then(function ( oauth_services ){
    res.json(oauth_services);
  })
});

router.get('/articles', function(req, res, next) {
    knex('articles').reduce(function ( article_arr, article ){
      return knex('questions')
      .innerJoin('articles_questions', 'questions.id', 'articles_questions.question_id')
      .where({article_id: article.id})
      .reduce(function ( question_arr, question ){
        question_arr.push(question);
        return question_arr;
      }, [] ).then(function ( questions ){
        article.questions = questions;
        article_arr.push(article);
        return article_arr;
      })
    }, [])
    .then(function ( articles ){
      res.render(articles);
    })
});

router.get('/tags', function(req, res, next) {
  knex('tags').then(function(tags){
  res.render('tags', {tags: tags});
  });
});

router.get('/questions/tags', function(req, res, next) {
    knex('tags').reduce(function ( tag_arr, tag ){
      return knex('questions')
      .innerJoin('tags_questions', 'questions.id', 'tags_questions.question_id')
      .where({tag_id: tag.id})
      .reduce(function ( question_arr, question ){
        question_arr.push(question);
        return question_arr;
      }, [] ).then(function ( questions ){
        tag.questions = questions;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.json(tags);
    })
});

router.get('/articles/tags', function(req, res, next) {
    knex('tags').reduce(function ( tag_arr, tag ){
      return knex('articles')
      .innerJoin('tags_articles', 'articles.id', 'tags_articles.article_id')
      .where({tag_id: tag.id})
      .reduce(function ( article_arr, article ){
        article_arr.push(article);
        return article_arr;
      }, [] ).then(function ( articles ){
        tag.articles = articles;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.json(tags);
    })
});

router.get('/users/tags', function(req, res, next) {
    knex('tags').reduce(function ( tag_arr, tag ){
      return knex('users')
      .innerJoin('tags_users', 'users.id', 'tags_users.user_id')
      .where({tag_id: tag.id})
      .reduce(function ( user_arr, user ){
        user_arr.push(user);
        return user_arr;
      }, [] ).then(function ( users ){
        tag.users = users;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.json(tags);
    })
});

router.get('/tags/:id', function(req, res, next) {
  knex('tags').where({'id': req.params.id})
  .then(function(tags){
  res.render('tags', {tags: tags});
  });
});

router.get('/questions/tags/:name', function(req, res, next) {
    knex('tags').where({'name':req.params.name})
    .reduce(function ( tag_arr, tag ){
      return knex('questions')
      .innerJoin('tags_questions', 'questions.id', 'tags_questions.question_id')
      .where({tag_id: tag.id})
      .reduce(function ( question_arr, question ){
        question_arr.push(question);
        return question_arr;
      }, [] ).then(function ( questions ){
        tag.questions = questions;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.render('questiontags', { tags: tags })
    })
});

router.get('/articles/tags/:name', function(req, res, next) {
    knex('tags').where({'name':req.params.name})
    .reduce(function ( tag_arr, tag ){
      return knex('articles')
      .innerJoin('tags_articles', 'articles.id', 'tags_articles.article_id')
      .where({tag_id: tag.id})
      .reduce(function ( article_arr, article ){
        article_arr.push(article);
        return article_arr;
      }, [] ).then(function ( articles ){
        tag.articles = articles;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.render('articletags', { tags: tags })
    })
});

router.get('/users/tags/:name', function(req, res, next) {
    knex('tags').where({'name':req.params.name})
    .reduce(function ( tag_arr, tag ){
      return knex('users')
      .innerJoin('tags_users', 'users.id', 'tags_users.user_id')
      .where({tag_id: tag.id})
      .reduce(function ( user_arr, user ){
        user_arr.push(user);
        return user_arr;
      }, [] ).then(function ( users ){
        tag.users = users;
        tag_arr.push(tag);
        return tag_arr;
      })
    }, [])
    .then(function ( tags ){
      res.render('usertags', { tags: tags })
    })
});

module.exports = router;
