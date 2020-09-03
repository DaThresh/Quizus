const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const expressSession = require('express-session');

global.Logger = require('./utilities/Logger');
Logger.log('Loaded express, http, and socketio');

global.Errors = require('./utilities/Errors');
const String = require('./utilities/String');
Logger.log('Loaded utilities');

global.DIR = __dirname;
require('./load/config');
Logger.log('Loaded configuration file');

require('./load/mongo');
Logger.log('Loaded database hook');

if(ENV === 'dev'){
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev.js');
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { ...webpackConfig.stats }
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
      log: console.log,
      path: '/__webpack_hmr'
    }));
}
app.use(require(DIR + '/http/middleware/logRequest'));
app.use(express.static(DIR + '/../public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var session = expressSession({
    secret: String.generate(15),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: false }
})
app.use(session);
app.set('trust proxy', 1);
if(ENV === 'prod') app.set('env', ENV);
Logger.log('Loaded app middleware');

require('./http/routes')(app);

require('./socket/io')(http, session);

http.listen(PORT, () => Logger.log('Listening on port ' + PORT));