require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const Sentry = require('./libs/sentry');

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    setTimeout(() => {
        res.json({
            status: true,
            message: 'Hello world!',
            // data: progress
            data: null
        });
    }, 11000);
});
const routes = require('./routes');
app.use('/api/v1', routes);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

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
