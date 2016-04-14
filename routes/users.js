var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('articles')
  .then(function(articles){
    res.render('articlehome', {articles:articles});
  })
});

router.post('/delete', function(req, res, next){
  console.log(req.body);
  knex(''+ req.body.type + '').where('id', req.body.id).del()
    .then(function(){
      res.redirect('/users/admin')
    })
})

router.get('/confirmdelete/:deletetype/:id', function(req, res, next){
  knex(''+ req.params.deletetype + '').where('id', req.params.id)
  .then(function(results){
    console.log(results);
    if (req.params.deletetype == 'replies'){
      typeInput = 'reply';
      nameInput = results[0].body
    } else {
      typeInput = req.params.deletetype;
      nameInput = results[0].name
    }
    res.render('confirmdelete', {typeDelete: req.params.deletetype, type:typeInput, name:nameInput, id:results[0].id})
  });
})

router.get('/admin', function(req, res, next){
  var UsersArticlesLists = {};
  knex('users')
  .then(function(results){
    UsersArticlesLists.users = results;
    knex('articles')
    .then(function(articlesresults){
      UsersArticlesLists.articles = articlesresults;
      console.log(UsersArticlesLists)
      res.render('admin', { users : UsersArticlesLists.users, articles: UsersArticlesLists.articles})
    })
  })
})



router.get('/articles/:articlesID', function(req, res, next) {
  var bigArray = [];
  var articlesArr = [];
  var article_id = req.params.articlesID
  var questionInfo = {}
  knex.from('articles')
    .then(function(titleresults) {
      articlesArr = titleresults
    }).then(function() {
      knex.from('articles').where('articles.id', req.params.articlesID)
        .innerJoin('articles_questions', 'articles.id', 'articles_questions.article_id')
        .innerJoin('questions', 'questions.id', 'articles_questions.question_id')
        .innerJoin('users', 'users.id', 'questions.user_id')
        .then(function(results) {
          var resultsArray = results;
          for (var i = 0; i < resultsArray.length; i++) {
            (function() {
              questionInfo.question_id = resultsArray[i].question_id;
              questionInfo.title = resultsArray[i].title;
              questionInfo.name = resultsArray[i].name;
              questionInfo.user_id = resultsArray[i].user_id;
              questionInfo.date = resultsArray[i].date;
              questionInfo.count = 'Count Goes Here';
              questionInfo.id = results[i].id;
            }())
            knex('replies').where('question_id', questionInfo.id)
              .then(function(replies) {
                questionInfo.count = replies.length
                bigArray.push(questionInfo);
              })
          }
        }).then(function() {
          knex('articles').where('articles.id', req.params.articlesID)
            .then(function(results) {
              articleTitle = results[0].name;
            })
            .then(function() {
              res.render('articles', {
                data: bigArray,
                title: articleTitle,
                articles: articlesArr,
                article_id: article_id
              })
            })
        })
    })

});

router.get('/newreply/:threadID', function(req, res, next) {
  res.render('newreply', {
    thread_id: req.params.threadID
  })
})

router.post('/newreply', function(req, res, next) {
  var replyData = req.body
  var threadNumber = replyData.thread_id;
  knex('replies').insert({
    body: replyData.body,
    question_id: replyData.thread_id,
    user_id: 1
  }).then(function(){
    res.redirect('/users/questions/' + replyData.thread_id)
  })
})


router.get('/newthread/:articleID', function(req, res, next) {
  res.render('newthread', {
    articleID: req.params.articleID
  })
})


router.get('/articles', function(req, res, next) {
  knex('articles').reduce(function(article_arr, article) {
    return knex('questions')
    .innerJoin('articles_questions', 'questions.id', 'articles_questions.question_id')
    .where({
      article_id: article.id
    })
    .reduce(function(question_arr, question) {
      question_arr.push(question);
      return question_arr;
    }, []).then(function(questions) {
      article.questions = questions;
      article_arr.push(article);
      return article_arr;
    })
  }, [])
  .then(function(articles) {
    res.render('articlehome', {articles: articles});
  })
});

router.get('/newthread/:threadID', function(req, res, next){
  knex('articles')
  .then(function(articles){
    res.render('newthread', {threadID : req.params.threadID,
      articles: articles
    })
  })
})

router.post('/newthread', function(req, res, next) {
  var threadData = req.body;
  var articleNumber = threadData.article_id;
  knex('questions').insert({
      title: threadData.title,
      body: threadData.body,
      user_id: 1
    })
    .returning('id')
    .then(function(results) {
      var questionID = results[0];
      knex('articles_questions').insert({question_id: questionID, article_id:articleNumber})
      .then(function(results){ //was "resulties" a typo??
        return knex('articles')
        .then(function(articles){
          res.render('articlehome', {articles:articles});
        })

      })
    })
})

router.get('/users', function(req, res, next) {
  knex('users')
    .then(function(users) {
      return knex('articles')
      .then(function(articles){
        res.render('users', {
          users: users,
          articles:articles
        });
      })
    })
});


router.get('/questions/:threadID', function(req, res, next) {
  var threadName;
  knex('questions').where('id', req.params.threadID)
    .then(function(threadresults) {
      threadName = threadresults[0].title;
    }).then(function() {
      knex('replies').select('replies.id as reply_id', '*').where('question_id', req.params.threadID)
        .innerJoin('users', 'users.id', 'replies.user_id')
        .then(function(results) {
          // if (req.session){
          //   console.log(req.session.admin);
          // }
          var adminBool = req.session.admin;
          console.log(results)
          res.render('thread', ({
            data: results,
            thread_title: threadName,
            thread_id:req.params.threadID,
            adminStatus: adminBool
          }));
//           return knex('articles')
//           .then(function(articles){
//             res.render('thread', ({
//               data: results,
//               thread_title: threadName,
//               articles: articles
//             })
//           );
//           })
//
        })
    })
});


router.get('/profile/:userID', function(req, res, next) {
  var articles = [];
  knex('articles')
    .then(function(articlesreturn) {
      articles = articlesreturn
    }).then(function() {
      knex('users').select('users.name as user_name', '*')
        .innerJoin('superpowers', 'users.superpower_id', 'superpowers.id')
        .where('users.id', req.params.userID).first()
        .then(function(results) {
          res.render('profile', {
            data: results,
            articles: articles
          });
        })
    })
});


router.get('/profile/:userID/edit', function(req, res, next) {
  knex('articles')
    .then(function(articles) {
      res.render('edit', {
        articles: articles
      });
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


router.get('/superpowers/:ID', function(req, res, next) {
  knex('superpowers').where({
      'id': req.params.ID
    })
    .then(function(superpowers) {
      return knex('articles')
      .then(function(articles){
        res.render('superpowers', {
          superpowers: superpowers, articles: articles
        });
      })
    })
});

router.get('/channels', function(req, res, next) {
  knex('channels')
  .then(function(results) {
    return knex('articles')
    .then(function(articles){
      res.render('channels', {
        title: "Channels", channels: results, articles: articles
      });
    })
  })
});

router.get('/channels_users', function(req, res, next) {
  knex('channels').reduce(function(channel_arr, channel) {
      return knex('users')
        .innerJoin('channels_users', 'users.id', 'channels_users.user_id')
        .where({
          channel_id: channel.id
        })
        .reduce(function(user_arr, channel) {
          user_arr.push(channel);
          return user_arr;
        }, []).then(function(users) {
          channel.users = users;
          channel_arr.push(channel);
          return channel_arr;
        })
    }, [])
    .then(function(channels) {
      return knex('articles')
      .then(function(articles){
        res.render('channels', {
          channels: channels, articles: articles
        });
      })
    })
});

router.get('/replies_votes', function(req, res, next) {
  knex('replies').reduce(function(reply_arr, reply) {
      return knex('users')
        .innerJoin('replies_votes', 'users.id', 'replies_votes.user_id')
        .where({
          reply_id: reply.id
        })
        .reduce(function(user_arr, user) {
          user_arr.push(user);
          return user_arr;
        }, []).then(function(users) {
          reply.users = users;
          reply_arr.push(reply);
          return reply_arr;
        })
    }, [])
    .then(function ( replies ){
      return knex('articles')
      .then(function(articles){
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
          title: "Messages",
          messages: results, articles: articles
        });
    });
  })
});


router.get('/tags', function(req, res, next) {
  knex('tags').then(function(tags) {
    return knex('articles')
    .then(function(articles){
      res.render('tags', {
        tags: tags, articles: articles
      });
    })
  });
});

router.get('/tags/questions', function(req, res, next) {
  knex('tags').reduce(function(tag_arr, tag) {
      return knex('questions')
        .innerJoin('tags_questions', 'questions.id', 'tags_questions.question_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(question_arr, question) {
          question_arr.push(question);
          return question_arr;
        }, []).then(function(questions) {
          tag.questions = questions;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      res.json(tags);
    })
});

router.get('/tags/articles', function(req, res, next) {
  knex('tags').reduce(function(tag_arr, tag) {
      return knex('articles')
        .innerJoin('tags_articles', 'articles.id', 'tags_articles.article_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(article_arr, article) {
          article_arr.push(article);
          return article_arr;
        }, []).then(function(articles) {
          tag.articles = articles;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      res.json(tags);
    })
});

router.get('/tags/users', function(req, res, next) {
  knex('tags').reduce(function(tag_arr, tag) {
      return knex('users')
        .innerJoin('tags_users', 'users.id', 'tags_users.user_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(user_arr, user) {
          user_arr.push(user);
          return user_arr;
        }, []).then(function(users) {
          tag.users = users;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      res.json(tags);
    })
});

router.get('/tags/:id', function(req, res, next) {
  knex('tags').where({
      'id': req.params.id
    })
    .then(function(tags) {
      return knex('articles')
      .then(function(articles){
        res.render('tags', {
          tags: tags, articles: articles
        });
      })
    });
});

router.get('/questions/tags/:name', function(req, res, next) {
  knex('tags').where({
      'name': req.params.name
    })
    .reduce(function(tag_arr, tag) {
      return knex('questions')
        .innerJoin('tags_questions', 'questions.id', 'tags_questions.question_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(question_arr, question) {
          question_arr.push(question);
          return question_arr;
        }, []).then(function(questions) {
          tag.questions = questions;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      return knex('articles')
      .then(function(articles){
        res.render('questiontags', {
          tags: tags, articles: articles
        })
      })
    })
});

router.get('/articles/tags/:name', function(req, res, next) {
  knex('tags').where({
      'name': req.params.name
    })
    .reduce(function(tag_arr, tag) {
      return knex('articles')
        .innerJoin('tags_articles', 'articles.id', 'tags_articles.article_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(article_arr, article) {
          article_arr.push(article);
          return article_arr;
        }, []).then(function(articles) {
          tag.articles = articles;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      return knex('articles')
      .then(function(articles){
        res.render('articletags', {
          tags: tags, articles: articles
        })
      })
    })
});

router.get('/users/tags/:name', function(req, res, next) {
  knex('tags').where({
      'name': req.params.name
    })
    .reduce(function(tag_arr, tag) {
      return knex('users')
        .innerJoin('tags_users', 'users.id', 'tags_users.user_id')
        .where({
          tag_id: tag.id
        })
        .reduce(function(user_arr, user) {
          user_arr.push(user);
          return user_arr;
        }, []).then(function(users) {
          tag.users = users;
          tag_arr.push(tag);
          return tag_arr;
        })
    }, [])
    .then(function(tags) {
      return knex('articles')
      .then(function(articles){
        res.render('usertags', {
          tags: tags, articles: articles
        })
      })
    })
});


router.get('/oauth_services', function(req, res, next) {
  knex('oauth_services').reduce(function(oauth_services_arr, strategy) {
      return knex('users')
        .innerJoin('users_oauth', 'users.id', 'users_oauth.user_id')
        .where({
          oauth_id: strategy.id
        })
        .reduce(function(user_arr, user) {
          user_arr.push(user);
          return user_arr;
        }, []).then(function(users) {
          strategy.users = users;
          oauth_services_arr.push(strategy);
          return oauth_services_arr;
        })
    }, [])
    .then(function(oauth_services) {
      res.json(oauth_services);
    })
});

module.exports = router;
