require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

const cors = require('cors');
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(passport.initialize());
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

// Potential OR statement in the below "if"  || req.session.passport.user.id
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
