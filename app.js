var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var methodOverride = require('method-override');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const hbs = require("express-handlebars")
const fileUpload=require("express-fileupload");
const Session=require('express-session');
var app = express();
require('dotenv').config();
// const accountSid = process.env.AccountSID;
// const authToken = process.env.AuthToken;
// const subaccountSid = process.env.VA1f8679b28cd77c047a68fa7ae8a9fefb
// const client = require('twilio')(accountSid, authToken);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partial/'
}))
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use(Session({ secret: 'session',
cookie: { maxAge: 600000},
saveUninitialized: true,
resave:true
}))




    
   

app.use('/', userRouter);
app.use('/Admin', adminRouter);

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
