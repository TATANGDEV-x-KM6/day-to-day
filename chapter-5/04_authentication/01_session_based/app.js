require('dotenv').config();
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const logger = require('morgan');
const app = express();

const { SESSION_SECRET } = process.env;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

const passport = require('./libs/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');

const web = require('./routes/web');
const api = require('./routes/api');
app.use('/', web);
app.use('/api/v1', api);

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;
