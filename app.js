var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var compression = require('compression')
var helmet = require('helmet')

require('dotenv').config()
var dev = process.env.NODE_ENV !== 'production'
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users').router;
var usersPassword = require('./routes/users').passport;
var passport = require('passport');

var app = express();
app.use(cors({
  origin: dev ? process.env.URL_APP : process.env.PRODUCTION_URL_APP,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))
app.use(helmet())
app.use(compression())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("catch 404 and forward to error handler")
  next(createError(404));
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
