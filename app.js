var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var compression = require('compression')
var helmet = require('helmet')
var session = require('express-session')

require('dotenv').config()
var dev = process.env.NODE_ENV !== 'production'
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users').router;
var usersPassword = require('./routes/users').passport;
var passport = require('passport');

var app = express();

app.use(cors({
  // origin: dev ? process.env.URL_APP : process.env.PRODUCTION_URL_APP,
  origin: function(origin, callback) {
    const allowedDomains = ['http://yourdomain.com', 'http://localhost:3000'];
    if(!origin) return callback(null, true)
    if(allowedDomains.indexOf(origin) === -1) {
      let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null,true)
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ["set-cookie"]
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

var sessionOption = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}

// app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("catch 404 and forward to error handler")
  res.status(404).json({message: "Not found"})
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("app error handler")
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.status(err.status || 500).json({message: res.locals.message});
});

module.exports = app;
