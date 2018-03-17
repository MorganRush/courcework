const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('./config');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(__dirname + '/static'));
require('./routes/index')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'hw',
}));

module.exports = app;


