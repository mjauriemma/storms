'use strict';

/**
 * Main Controller (route) for the app
 * load routes from other router exporting files (search.js)
 * @author Matthew Auriemma
 * @module storms/controllers/index
 */

var fs = require('fs');

var express = require("express");
var router = express.Router();

var config = require('../config/config');

//Magic that enables /filename/ for endpoints
fs.readdirSync(__dirname + '/').forEach(function(file) {
    var routeName = file.replace('.js', '');

    if (routeName !== 'index') {
        router.use('/' + routeName, require('./' + routeName));
    }
});

/**
 * Base page for the app - loads hurricaneExplorer for the user
 */
router.get('/',
    function apiInfo(req, res) {
      return res.render('hurricaneExplorer.html');
});

module.exports = router;
