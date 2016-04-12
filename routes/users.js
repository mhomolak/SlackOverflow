var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/articles/:articlesID', function(req, res, next) {
  res.render('standard');
});

router.get('/question/:threadID', function(req, res, next) {
  res.render('thread');
});

router.get('/profile/:userID', function(req, res, next) {
  res.render('profile');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
