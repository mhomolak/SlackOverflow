var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/standard/:standardID', function(req, res, next) {
  res.render('standard');
});

router.get('/thread/:threadID', function(req, res, next) {
  res.render('thread');
});

router.get('/user/profile/:userID', function(req, res, next) {
  res.render('profile');
});

router.get('/user/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
