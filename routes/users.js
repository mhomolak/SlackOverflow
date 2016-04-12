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
      questionInfo.title = resultsArray[i].title;
      questionInfo.name = resultsArray[i].name;
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

=======
router.get('/users', function(req, res, next) {
  knex('users')
  .then(function(users){
    res.render('users', {users: users});
  })
});
>>>>>>> c21e422f3f645ee28c8287a51467beb44f432f5b


router.get('/question/:threadID', function(req, res, next) {
  res.render('thread');
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

router.get('/messages', function(req, res, next) {
  knex('messages')
  .then(function(results) {
    console.log(results);
    res.render('messages', {title: "Messages", messages: results});
  })
});

module.exports = router;



//reduce method for collectiong data from lookup tables
// router.get('/articles', function(req, res, next) {
    // knex('articles').reduce(function ( article_arr, article ){
    //   return knex('questions')
    //   .innerJoin('articles_questions', 'questions.id', 'articles_questions.question_id')
    //   .where({article_id: article.id})
    //   .reduce(function ( question_arr, question ){
    //     question_arr.push(question);
    //     return question_arr;
    //   }, [] ).then(function ( questions ){
    //     article.questions = questions;
    //     article_arr.push(article);
    //     return article_arr;
    //   })
    // }, [])
    // .then(function ( articles ){
    //   res.render('articles', { articles: articles })
    // })
// });
