'use strict';

/**
* REST data endpoint for storms
*/

//Require Statements
let Promise = require('bluebird');
let express = require('express');
let router = express.Router();
var config = require('../config/config');
let storms = Promise.promisifyAll(require('../models/storms'));
//Generic Error handling functions
let webUtil = require('../helpers/web/util');
let errors = require('../helpers/error');

//Using express Router - /filename/ is the endpoint
router.get('/', (req, res) => {
    // Accepts querystring values for lat, long, yearmin, yearmax
    let lat = req.query.lat;
    let long = req.query.long;
    let yearmin = req.query.yearmin;
    let yearmax = req.query.yearmax;
    //Error Handling
    if (!lat || !long){
        return webUtil.processError(res, 400, 'Latitude and Longitude must be provided', 400);
    }
    //Adjusting Year if need be
    if (!yearmin || yearmin < 1945) {
      yearmin = 1945;
    }
    //Adjusting year if need be
    if (!yearmax || yearmax > 2016) {
      yearmax = 2016;
    }
    //Searh the database
      storms.searchAsync(lat, long, yearmin, yearmax)
        //Receives returned promise object with the response
          .then(response => {
            return res.json(response);
          })
          //Catches thrown errors from storms
          .catch(err => {
            return webUtil.processError(res, 500, err.message);
          });

});


//Makes the route accessible
module.exports = router;
