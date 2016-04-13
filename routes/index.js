'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const Users = function() { return knex('users') };
const Recaptcha = require('recaptcha').Recaptcha;


/* GET home page. */

function authorizedUser(req, res, next) {
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

      var recaptcha = new Recaptcha('6LcbRR0TAAAAAO-9iVrVVpL3y17E6RKE0_2NkRi7', '6LcbRR0TAAAAAMNLl0CVq4Ru-36TChTkQlIYoF-P');

      console.log(recaptcha.toHTML());

      res.render('signup', {
      locals: {
          recaptcha_form: recaptcha.toHTML()
      }
    });

});

router.get('/test', function(req,res,next){
  res.json('RESPONSEEEEEEEEEE');
});

module.exports = router;
