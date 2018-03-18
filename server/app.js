const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const config = require('./config');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false
// }));
app.use(session({secret: 'lol', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport/index')(passport);

app.use(express.static(__dirname + '/static'));
require('./routes/index')(app, passport);

module.exports = app;


