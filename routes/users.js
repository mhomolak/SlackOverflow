var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
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


router.get('/question/:threadID', function(req, res, next) {
  res.render('thread');
});

router.get('/profile/:userID', function(req, res, next) {
  res.render('profile');
});

router.get('/profile/:userID/edit', function(req, res, next) {
  res.render('edit');
});

module.exports = router;
