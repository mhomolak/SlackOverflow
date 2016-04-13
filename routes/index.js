'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const Users = function() { return knex('users') };


/* GET home page. */

function authorizedUser(req, res, next) {
  let user_id = req.session.email;
  if (user_id) {
    next();
  } else {
    res.redirect(401, '/');
  }
}

//original route before I fucked with articles knex:
router.get('/', authorizedUser, function(req, res, next) {
  Users().then(function(users) {
    if (users) {
      res.render('loggedin');
    } else {
      res.status(200)
        .json({ message: 'User does not exist.'});
    }
  });
});

//trying to fuck with articles knex:
//still not working
// router.get('/', authorizedUser, function(req, res, next) {
//   knex('articles')
//   .then(function(articles){
//     Users().then(function(users) {
//       if (users) {
//         res.render('loggedin', { articles: articles});
//       } else {
//         res.status(200)
//           .json({ message: 'User does not exist.'});
//       }
//     });
//   })
// });






//original route before I fucked with knex('articles'):
// router.get('/login', function(req, res, next){
//   res.render('login');
// });

//fucking with knex('articles') - works!
router.get('/login', function(req, res, next){
  knex('articles')
  .then(function(articles){
    res.render('login', { articles: articles});
  })
});





//original route before I fucked with knex('articles'):
// router.get('/signup', function(req, res, next){
//   res.render('signup');
// });

//fucking with knex('articles') - works!
router.get('/signup', function(req, res, next){
  knex('articles')
  .then(function(articles){
    res.render('signup', { articles: articles});
  })
});

module.exports = router;
