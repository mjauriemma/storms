'use strict';

let Promise = require('bluebird');
let express = require('express');
let router = express.Router();

let storms = Promise.promisifyAll(require('../models/storms'));
let webUtil = require('../helpers/web/util');
let errors = require('../helpers/error');


router.get('/', (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    if (!lat || !long) {
        return webUtil.processError(res, 400, 'Latitude and Longitude must be provided', 400);
    }

    storms.searchAsync(lat, long)
        .then(response => {
            return res.render('map.html');
        })
        .catch(err => {
          console.log(err);
            return webUtil.processError(res, 500, err.message);
        });
});




module.exports = router;
