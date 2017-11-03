var express = require('express');
var Router = require('express').Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routerIndex = require('./src/routes/index');
var config = require('./src/config/config');

// ODM With Mongoose
var mongoose = require('mongoose');
// Modules to store session
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
// Import Passport and Warning flash modules
var passport = require('passport');

var app = express();

mongoose.connect(config.db.url);
// Check if MongoDB is running
mongoose.connection.on('error', function() {
	console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// view engine setup
app.set('views', path.join(__dirname, 'src/views/pages')) ;
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'sometextgohere',
  saveUninitialized: true,
  resave: true,
  //store session on MongoDB using express-session + connect mongo
  store: new MongoStore({
      url: config.db.url,
      collection : 'sessions'
  })
}));

app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

routerIndex(app);

var configPassport = require('./src/config/passport/passport');
configPassport(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
