    'use strict';
    const express = require('express');
    const router = express.Router();
    const knex = require('../db/knex');
    const bcrypt = require('bcrypt');
    const Recaptcha = require('recaptcha').Recaptcha;
    const Users = function() {
      return knex('users')
    };

    router.post('/signup', function(req, res, next) {
      var data = {
        remoteip: req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response: req.body.recaptcha_response_field
      };
      var recaptcha = new Recaptcha('6LcbRR0TAAAAAO-9iVrVVpL3y17E6RKE0_2NkRi7', '6LcbRR0TAAAAAMNLl0CVq4Ru-36TChTkQlIYoF-P', data);

      console.log(recaptcha.verify);
      recaptcha.verify(function(success, error_code) {
        if (success) {
            Users().where({
                email: req.body.email
            }).first().then(function(user) {
                if (!user) {
                    let hash = bcrypt.hashSync(req.body.password, 10);
                    Users().insert({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        portrait_url: 'https://robohash.org/'+req.body.name,
                        admin: false
                    }).then(function() {
                        req.session.email = req.body.email;
                        req.session.save();
                    }).then(function() {
                        res.redirect('/articlehome');
                    })
                } else {
                    res.redirect('/login');
                }
            });
        } else {
          // Redisplay the form.
          res.render('signup', {
            locals: {
              recaptcha_form: recaptcha.toHTML()
            }
          });
        }
      });

    });

    router.post('/login', function(req, res, next) {
      Users().where({
        email: req.body.email,
      }).first().then(function(user) {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          req.session.email = user.email;
          res.redirect('../users');
        } else {
          res.redirect('/login');
        }
      });
    });

    router.get('/logout', function(req, res) {
      res.clearCookie('session');
      res.clearCookie('session.sig');
      res.redirect('/');
    });



    // router.post('/', function(req, res) {
    //     var data = {
    //         remoteip:  req.connection.remoteAddress,
    //         challenge: req.body.recaptcha_challenge_field,
    //         response:  req.body.recaptcha_response_field
    //     };
    //     var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
    //
    //     recaptcha.verify(function(success, error_code) {
    //         if (success) {
    //             res.send('Recaptcha response valid.');
    //         }
    //         else {
    //             // Redisplay the form.
    //             res.render('form.jade', {
    //                 layout: false,
    //                 locals: {
    //                     recaptcha_form: recaptcha.toHTML()
    //                 }
    //             });
    //         }
    //     });
    // });

    module.exports = router;
