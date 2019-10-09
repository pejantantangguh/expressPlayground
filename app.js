const createError = require('http-errors');
const flash = require('express-flash');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const env = require('dotenv');




env.config();
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connection.on('error', (err) => {
  console.error(`cannot connect to database ${err.message}`)
});

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// take raw request and turns into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));


// import Model module
require('./models/Store');
require('./models/User');
require('./passport');

// Routing
const routing = require('./router')
app.use('/', routing);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
