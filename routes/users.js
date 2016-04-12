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
