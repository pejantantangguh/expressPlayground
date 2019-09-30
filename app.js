const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const h = require('./helper');
const flash = require('flash');
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

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// import Model module
require('./models/Store');
require('./models/Product');


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

app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})

module.exports = app;
