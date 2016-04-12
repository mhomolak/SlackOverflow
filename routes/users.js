var express = require('express');
var router = express.Router();

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
  res.render('superpowers');
});
router.get('/superpowers/:superpowerID', function(req, res, next) {
  res.render('superpowers');
});

module.exports = router;
