'use strict';

let Promise = require('bluebird');
let express = require('express');
let router = express.Router();
var config = require('../config/config');
let storms = Promise.promisifyAll(require('../models/storms'));
let webUtil = require('../helpers/web/util');
let errors = require('../helpers/error');


router.get('/search', (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let yearmin = req.query.yearmin;
    let yearmax = req.query.yearmax;
    if (!lat || !long){
        return webUtil.processError(res, 400, 'Latitude and Longitude must be provided', 400);
    }
    if (!yearmin || yearmin < 1945) {
      yearmin = 1945;
    }
    if (!yearmax || yearmax > 2016) {
      yearmax = 2016;
    }
      storms.searchAsync(lat, long, yearmin, yearmax)
          .then(response => {
            return res.json(response);
          })
          .catch(err => {
            return webUtil.processError(res, 500, err.message);
          });

});



module.exports = router;
