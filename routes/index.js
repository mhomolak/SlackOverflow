'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const Users = function() { return knex('users') };


/* GET home page. */

function authorizedUser(req, res, next) {
  console.log('in authorizedUser', req.session);
  let user_id = req.session.email;
  if (user_id) {
    next();
  } else {
    res.redirect(401, '/');
  }
}

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

router.get('/login', function(req, res, next){
  res.render('login');
});

router.get('/signup', function(req, res, next){
  res.render('signup');
});

router.get('/:email', authorizedUser, function(req, res, next){
  Users().where('email', req.params.email).first().then(function(user){
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'User does not exist.' });
    }
  });
});

module.exports = router;
