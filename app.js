const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
// const linkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();

const cors = require('cors');
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: [
    'process.env.SECRET'
  ]
}));


var ensureLoggedInUser = function(req, res, next) {
  if (req.session.email) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use('/', routes);
app.use('/auth', auth);
app.use(ensureLoggedInUser);
app.use('/users',  users);

// passport.use(new linkedInStrategy({
//   clientID: LINKEDIN_KEY,
//   clientSecret: LINKEDIN_SECRET,
//   callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
//   scope: ['r_emailaddress', 'r_basicprofile'],
// }, function(accessToken, refreshToken, profile, done){
//   process.nextTick(function(){
//     return done(null, profile);
//   });
// }))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
