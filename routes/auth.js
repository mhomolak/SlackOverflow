'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const Users = function() { return knex('users') };

router.post('/signup', function(req, res, next) {
  Users().where({
    email: req.body.email
  }).first().then(function(user) {
    if (!user) {
      let hash = bcrypt.hashSync(req.body.password, 10);
      Users().insert({
          email: req.body.email,
          password: hash
      }).then(function(){
        res.redirect('/');
      });
    } else {
      res.redirect('/login');
    }
  });
});

router.post('/login', function(req, res, next) {
  Users().where({
    email: req.body.email,
  }).first().then(function(user) {
    if ( user && bcrypt.compareSync(req.body.password, user.password) ) {
      res.cookie('email', user.email, {
        signed: true
      });
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req, res) {
  res.clearCookie('email');
  res.redirect('/');
});

module.exports = router;
