var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var axios = require('axios');
passport.use(new GoogleStrategy({
        clientID: '44383358345-gctfh0s007us3ogsl42qehfgk71vqhet.apps.googleusercontent.com',
        clientSecret: 'gqPbtDaLRnukoQB1iL-BdRVW',
        callbackURL: "http://localhost:8097/auth/google/"
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/login/fail', function (req, res, next) {
    res.render('failLogin');
});
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'],failureRedirect: '/login/fail' }),
    function(req, res) {
        axios.post('http://usermanage:8099/findUser',{
            userdetail:req.user
        })
            .then(function (response) {
                res.redirect('http://localhost:3000/testreturn/'+response.data._id)
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

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
