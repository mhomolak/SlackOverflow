    'use strict';
    const express = require('express');
    const router = express.Router();
    const knex = require('../db/knex');
    const bcrypt = require('bcrypt');
    const Recaptcha = require('recaptcha').Recaptcha;
    const Users = function() {
      return knex('users')
    };
    const linkedInStrategy = require('passport-linkedin-oauth2').Strategy;
    const passport = require('passport');

    passport.use(new linkedInStrategy({
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: process.env.HOST + "/auth/linkedin/callback",
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true
    }, function(accessToken, refreshToken, profile, done){
        // console.log(profile.displayName);
        // console.log(profile.emails[0].value);
        knex('users').insert({name: profile.displayName, email: profile.emails[0].value})
        .returning('id').then(function(thisId){
          knex('users_oauth').insert({oauth_services_id: '4', user_id: thisId[0], oauth_given_id: profile.id})
          .then(function(){
            process.nextTick(function(){
              return done(null, {id: profile.id, displayName: profile.displayName, token: accessToken});
            })
          })
        });
    }))

    router.get('/linkedin',
      passport.authenticate('linkedin'),
        (function(req, res){
    console.log("will not log");
      })
    )

      router.get('auth/linkedin/callback', passport.authenticate('linkedin', {
      successRedirect: '/users/profile/3/edit',
      failureRedirect: '/users/profile/3/edit'
    }));

    router.use(function (req, res, next) {
      res.locals.user = req.session.passport.user
      next()
    })
    router.use(passport.initialize());

    router.post('/signup', function(req, res, next) {
      var data = {
        remoteip: req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response: req.body.recaptcha_response_field
      };

      var recaptcha = new Recaptcha('6LcbRR0TAAAAAO-9iVrVVpL3y17E6RKE0_2NkRi7', '6LcbRR0TAAAAAMNLl0CVq4Ru-36TChTkQlIYoF-P', data);

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
                        req.session.admin = req.body.admin;
                        req.session.id = req.body.id;
                        req.session.save();
                    }).then(function() {
                        res.redirect('../users');
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


    passport.serializeUser(function(user, done) {
      // knex('users').insert({email: req.session.email})
      // .then(function(need){
      //   knex('users_oauth')
      //   .where({oauth_given_id: passport.user.id})
      //   .first()
      //   .insert({})
      //   .insert({users_oauth: user.profile})
      // })
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user)
    });

    module.exports = router;
