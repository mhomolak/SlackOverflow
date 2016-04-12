var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/articles/:articlesID', function(req, res, next) {
  res.render('articles');
});

router.get('/thread/:threadID', function(req, res, next) {
  res.render('thread');
});

router.get('/profile/:userID', function(req, res, next) {
  res.render('profile');
});

router.get('/profile/:userID/edit', function(req, res, next) {
  res.render('edit');
});

module.exports = router;
