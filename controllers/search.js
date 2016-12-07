'use strict';

let Promise = require('bluebird');
let express = require('express');
let router = express.Router();
var config = require('../config/config');
let storms = Promise.promisifyAll(require('../models/storms'));
let webUtil = require('../helpers/web/util');
let errors = require('../helpers/error');
var cors = require('cors');
let app = require('../config/app');



router.get('/', cors(config.cors), function (req, res)  {
    let lat = req.query.lat;
    let long = req.query.long;
    //let latmax = req.query.latmax;
    //let longmax = req.query.longmax;
    let yearmin = req.query.yearmin;
    let yearmax = req.query.yearmax;
    //if (!latmin || !longmin || !latmax || !longmax) {
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
            console.log(err);
              return webUtil.processError(res, 500, err.message);
          });

});

router.post('/', (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    //let latmax = req.query.latmax;
    //let longmax = req.query.longmax;
    let yearmin = req.query.yearmin;
    let yearmax = req.query.yearmax;
    //if (!latmin || !longmin || !latmax || !longmax) {
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
              return res.send(response);
          })
          .catch(err => {
            console.log(err);
              return webUtil.processError(res, 500, err.message);
          });

});




module.exports = router;
