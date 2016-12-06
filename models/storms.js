'use strict';


let https = require('https');
var config = require('../config/config');
var bi = require('../helpers/error/BadInput');
var querystring = require("querystring");
let Promise = require('bluebird');

var dbFactory = require('./db');
var db = Promise.promisifyAll(dbFactory(config.db));
var range = 10;
// let schema = require('./schema').tweets;
var selStorms = "Select DISTINCT TyphoonNM from `TyphoonX` where "+
"(`TyphoonX`.`DATE` > ? and `TyphoonX`.`DATE` < ?) AND " +
"(`TyphoonX`.`LAT` > ? and `TyphoonX`.`LAT` < ?) AND "+
"(`TyphoonX`.`LONG`> ? AND `TyphoonX`.`LONG`< ?)";

var getPoints = "Select * FROM `TyphoonX` where TyphoonNM = ?";



function search(lat, long, yearmin, yearmax, callback) {

    if (lat < -90 || lat > 90) {
      return callback (new bi("Invalid Latitude"));
    }
    else if (long < -180 || long > 180) {
      return callback (new bi("Invalid Longitude"));
    }
    else {
      var latmin = parseInt(lat, 10) - range;
      var latmax = parseInt(lat, 10) + range;
      var longmin = parseInt(long, 10) -range;
      var longmax = parseInt(long, 10) + range;
      yearmin = yearmin+"01-01";
      yearmax = yearmax+"12-31";

      return db.executeQuery(selStorms, [yearmin, yearmax, latmin, latmax, longmin, longmax], function (err, result) {
        if (err) {
          return callback(err);
        }
        var storms = [];
        else {
          // console.log("result: " + result);
          console.log(result.length());
          result.forEach(function process (element, index, array) {
            console.log (element.TyphoonNM);
            storms = storms + db.executeQuery(getPoints, [element.TyphoonNM], function (err, result) {
              if (err) {
                return callback(err);
              }
            }

          });

          return callback(null, storms);
        }
      }

      // .then(function(result) {
      //   console.log("result: " + result);
      //   return result;
      // })
      // .nodeify(callback);


   //console.log("results callback");
  //return callback (null, "Success");
}
};
exports.search = search;
