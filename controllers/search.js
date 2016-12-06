'use strict';

let Promise = require('bluebird');
let express = require('express');
let router = express.Router();

let storms = Promise.promisifyAll(require('../models/storms'));
let webUtil = require('../helpers/web/util');
let errors = require('../helpers/error');


router.get('/', (req, res) => {
    let latmin = req.query.latmin;
    let longmin = req.query.longmin;
    let latmax = req.query.latmax;
    let longmax = req.query.longmax;
    let yearmin = req.query.yearmin;
    let yearmax = req.query.yearmax;
    if (!latmin || !longmin || !latmax || !longmax) {
        return webUtil.processError(res, 400, 'Latitude and Longitude must be provided', 400);
    }
    if (!yearmin || yearmin < 1945) {
      yearmin = 1945;
    }
    if (!yearmax || yearmax > 2016) {
      yearmax = 2016;
    }
      storms.searchAsync(latmin, longmin, latmax, longmax, yearmin, yearmax)
          .then(response => {
              return res.send(response);
          })
          .catch(err => {
            console.log(err);
              return webUtil.processError(res, 500, err.message);
          });

});




module.exports = router;
