var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/articles/:articlesID', function(req, res, next) {
  res.render('articles');

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
