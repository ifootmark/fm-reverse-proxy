#!/usr/bin/env node

/**
 * @license
 *(c) Copyright 2016 ifootmark. Some Rights Reserved. 
 * fm-reverse-proxy
 * https://github.com/ifootmark/fm-reverse-proxy
 * @author ifootmark@163.com
 */

'use strict'

var proxy = {
  start: function(options) {
    var path = require('path');
    var express = require('express');
    var httpProxy = require('http-proxy');
    var http = require('http');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var opt = require('./config.proxy');

    var config = opt(options);
    var prefixPath = config.prefixPath,
      staticPath = config.staticPath,
      port = config.port,
      target = config.target,
      filter = config.filter;

    var proxy = httpProxy.createProxyServer({
      target: target
    });
    proxy.on('error', function(err, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Something went wrong. And we are reporting a custom error message.');
    });

    var app = express()
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(prefixPath, express.static(path.resolve(process.cwd(), staticPath)));

    app.all('*', function(request, response, next) {
      if (filter != '') {
        if (request.path.indexOf(filter) > -1) {
          proxy.web(request, response);
        } else {
          next();
        }
      } else {
        proxy.web(request, response);
      }
    })

    // use bodyparser after http-proxy
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send('error');
    });


    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      console.log('Reverse Proxy listening at port ' + bind);
    }

    // http server
    var server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }
};

module.exports = proxy;
