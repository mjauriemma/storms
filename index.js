'use strict';

/**
 * @author Matthew Auriemma
 * @module idology/server
 */

var fs = require('fs');
var http = require('http');


var config = require('./config/config');
var app = require('./config/app')();


// Start the server
var server = http.createServer(app);
server.listen('80', function () {
    console.log("%s listening on port %s.", config.app.name, 80);
});
