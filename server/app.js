const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const load = require('./load/load');
//const config = require('./config');

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const app = express();

app.get('/db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test');
        res.render('/pages/db', result);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

app.use(session({secret: 'lol', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport/index')(passport);

app.use(express.static(__dirname + '/static'));
require('./routes/index')(app, passport);

module.exports = app;


