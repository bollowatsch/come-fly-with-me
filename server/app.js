const createError = require('http-errors');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const apiRouter= require('./routes/api');

const app = express();
const cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors('Access-Control-Allow-Origin: *'))

//localhost/sendData
app.use('/', indexRouter);

//use localhost/api to handle all api requests
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;