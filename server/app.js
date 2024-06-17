const createError = require('http-errors');
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swaggerConfig');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes');
const apiRouter= require('./routes/api');
const jwtRouter = require('./routes/jwt');

const app = express();

// setup DB connection
const mongoDBUser = process.env.MONGODB_USER;
const mongoDBPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb+srv://${mongoDBUser}:${mongoDBPassword}@comeflywithme.wk9esje.mongodb.net/`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors('Access-Control-Allow-Origin: *'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//localhost/sendData
app.use('/', indexRouter);

//use localhost/api to handle all api requests
app.use('/api', apiRouter);

//use localhost/jwt to handle all jwt requests
app.use('/jwt', jwtRouter);

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