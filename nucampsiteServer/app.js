const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose'); // added mongoose client - nodupe
const path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

// ---------------------------------------------------------------------

// route for mongoose
const url = 'mongodb://localhost:27017/nucampsite';

// mongoose props set
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

// on good/bad connect - promise/reject
connect.then(() => console.log('Connected correctly to server'), 
  err => console.log(err)
);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({ // data passed to the session
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

//  want any user(non-auth'd) to be able to land on the home page an use the USER route 
//      prior to needing to log in/acct creation 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// authentication - here to auth before accessing info on the server
function auth(req, res, next) {
    console.log(req.session);
    if(!req.session.user) {
      // client not auth'd/session - use the error
      const err = new Error("You are not Authenticated!");
      err.status = 401;
      return next(err);

    } else {
      if(req.session.user === 'authenticated') {
        return next();
      } else {
        const err = new Error('You are not Authenticated!');
        err.status = 401;
        return next(err);
      }
    }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
