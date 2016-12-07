'use strict';


let https = require('https');
var config = require('../config/config');
var bi = require('../helpers/error/BadInput');
var querystring = require("querystring");
let Promise = require('bluebird');

var dbFactory = require('./db');
var db = Promise.promisifyAll(dbFactory(config.db));
var range = 1;
// let schema = require('./schema').tweets;
var selStorms = "Select DISTINCT TyphoonNM from `TyphoonX` where "+
"(`TyphoonX`.`DATE` > ? and `TyphoonX`.`DATE` < ?) AND " +
"(`TyphoonX`.`LAT` > ? and `TyphoonX`.`LAT` < ?) AND "+
"(`TyphoonX`.`LONG`> ? AND `TyphoonX`.`LONG`< ?)";

var getPoints = "Select `TyphoonX`.`TyphoonNM`, `TyphoonX`.`LAT`, `TyphoonX`.`LONG`, " +
"`TyphoonX`.`DATE` FROM `TyphoonX` where TyphoonNM = ? ORDER BY `TyphoonX`.`DATE`";



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
      var storms = [];

      var storms = {"type": "FeatureCollection",
                    "features": []
                  };
      var features = []


      db.executeQuery(selStorms, [yearmin, yearmax, latmin, latmax, longmin, longmax], function (err, result) {

        if (err) {
          return callback(err);
        }
        else {
          // console.log("result: " + result);
          //console.log(result.length());


          //storms.push({"Total Storm Number" : result.length})
          return result.forEach(function process (element, index, array) {
            var storm = {
              "type": "Feature",
              "properties": {
                 "storm": element.TyphoonNM,
                 "color": "blue",
                 "rank": "7",
                 "ascii": "71"
               },
               "geometry": {
                 "type": "Polyline",
                 "coordinates": [
                   [
                   ]
                 ]
               }
             };
            db.executeQuery(getPoints, [element.TyphoonNM], function (err, results) {
              if (err) {
                return callback(err);
              }
              else {
                var coordinates = [];
                results.forEach(function process (element, index, array) {
                  var points = [];
                  points.push(element.LAT);
                  points.push(element.LONG);
                  coordinates.push(points);
                  if (index === results.length - 1) {
                    var array = [];
                    array.push(coordinates);
                    storm.geometry.coordinates = array;
                    features.push(storm);
                  }
                });
                //storm.push(results);
                if (index === result.length - 1) {
                  storms.features = features;
                  //features.push(storm);
                  return callback (null, storms)
                }
              }
            })
          });
          //return callback(null, storms);
        }

    });
  }
};
exports.search = search;
