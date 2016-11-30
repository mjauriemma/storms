'use strict';

/**
 * Dynamically load all of the routes and export them.
 * @author Matthew Auriemma
 * @module storms/controllers/index
 */

var fs = require('fs');

var express = require("express");
var router = express.Router();

var config = require('../config/config');


fs.readdirSync(__dirname + '/').forEach(function(file) {
    var routeName = file.replace('.js', '');

    if (routeName !== 'index') {
        router.use('/' + routeName, require('./' + routeName));
    }
});

/**
 * @api {get} / Get Service Info
 * @apiName GetSplashPage
 * @apiGroup Root
 *
 * @apiDescription Get basic information about this Service.
 *
 * @apiSuccess {Object} app app information
 */
router.get('/',
    /**
     * Fetch API Information.
     * @param {express.Request} req request
     * @param {express.Response} res response
     *
     * @function apiInfo
     */
    function apiInfo(req, res) {
      res.render('index', { title: 'Storms' });
        //return res.json(config.app);
});

module.exports = router;
