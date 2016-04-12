var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loggedin');
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

router.get('/users', function(req, res, next) {
  knex('users')
  .then(function(users){
    res.render('users', {users: users});
  })
});

router.get('/articles/:articlesID', function(req, res, next) {
  res.render('articles');
});

router.get('/questions/:threadID', function(req, res, next) {
  res.render('thread');
});

router.get('/articles/tagged/:tagId', function(req, res, next) {
  // res.render('thread');
});

router.get('/tags', function(req, res, next) {
  // KNEX(TAGS).THEN(FUNCTION(TAGS){
    // res.render('tags', { tags: TAGS } );
    // res.render('tags', { tags: ['Eggplant','Peaches','Spicy Eggplant','Chili Pepper','Banana','Hot Dog','Corn on the Cob','Hair Flip'] } );
    res.render('tags', { tags: [{id: 1, name: 'Eggplant'},{id: 2, name: 'Peaches'},{id: 3, name: 'Spicy Eggplant'}] } );
  // })
});

router.get('/profile/:userID', function(req, res, next) {
  res.render('profile');
});

router.get('/profile/:userID/edit', function(req, res, next) {
  res.render('edit');
});

router.get('/superpowers', function(req, res, next) {
  knex('superpowers')
  .then(function(superpowers){
    res.render('superpowers', {superpowers: superpowers});
  })
});
router.get('/superpowers/:ID', function(req, res, next) {
  knex('superpowers').where({'id': req.params.ID})
  .then(function(superpowers){
    res.render('superpowers', {superpowers: superpowers});
  })
});

router.get('/channels', function(req, res, next) {
  knex('channels')
  .then(function(results) {
    console.log(results);
    res.render('channels', {title: "Channels", channels: results});
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
    console.log(channels);
    res.render('channels', { channels: channels })
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
      console.log(replies);
      res.render('votes', { replies: replies })
    })
});

router.get('/messages', function(req, res, next) {
  knex('messages')
  .then(function(results) {
    console.log(results);
    res.render('messages', {title: "Messages", messages: results});
  })
});

module.exports = router;



// reduce method for collectiong data from lookup tables
// router.get('/articles', function(req, res, next) {
//     knex('articles').reduce(function ( article_arr, article ){
//       return knex('questions')
//       .innerJoin('articles_questions', 'questions.id', 'articles_questions.question_id')
//       .where({article_id: article.id})
//       .reduce(function ( question_arr, question ){
//         question_arr.push(question);
//         return question_arr;
//       }, [] ).then(function ( questions ){
//         article.questions = questions;
//         article_arr.push(article);
//         return article_arr;
//       })
//     }, [])
//     .then(function ( articles ){
//       res.render('articles', { articles: articles })
//     })
// });
//reduce method for collecting data from lookup tables,
// route exists for testing performance

router.get('/articles_questions', function(req, res, next) {
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
      console.log(articles);
      res.render('articles', { articles: articles })
    })
});
