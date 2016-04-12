var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
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

module.exports = router;
