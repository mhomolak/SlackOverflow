var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loggedin');
});

router.get('/users', function(req, res, next) {
  knex('users')
  .then(function(users){
    res.render('users', {users: users});
  })
});


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
    res.render('channels', {title: "Channels", channels: results});
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
