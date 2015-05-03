'use strict';

var express = require('express');
var kraken = require('kraken-js');

var db = require('./library/database');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        var dbConfig = config.get('databaseConfig');
        db.config(dbConfig);
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));



// var mongoose = require('mongoose');
// //Kết nối cơ sở dữ liệu
// var db = require('./config/database');
// mongoose.connect(db.url);

var session      = require('express-session');
var lusca = require('lusca');
var cookieParser = require('cookie-parser');
var cookieSession =   require('cookie-session');
var passport = require('passport');
var crypto = require('crypto');

app.use(cookieParser());

app.use(session({
    secret: 'sangnguyen',
    resave: true,
    saveUninitialized: true
}));

app.use(lusca({
    csrf: false,
    csp: { /* ... */},
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: false
}));

require('./library/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
