'use strict';

//Require statements
//Config holds Database credentials
var config = require('../config/config');
//Error for bad input passed
var bi = require('../helpers/error/BadInput');
//For promisifying this file for use with promises
let Promise = require('bluebird');

//Config and creating database
var dbFactory = require('./db');
//Adds the database functions for querying the database
var db = Promise.promisifyAll(dbFactory(config.db));

//Degree of range to search around parameters given
var range = 1;
//Select storm name once for each storm within range of parameters given
var selStorms = "Select DISTINCT TyphoonNM from `TyphoonX` where "+
"(`TyphoonX`.`DATE` > ? and `TyphoonX`.`DATE` < ?) AND " +
"(`TyphoonX`.`LAT` > ? and `TyphoonX`.`LAT` < ?) AND "+
"(`TyphoonX`.`LONG`> ? AND `TyphoonX`.`LONG`< ?)";

//Gets all the points for a storm found from previous query
var getPoints = "Select `TyphoonX`.`TyphoonNM`, `TyphoonX`.`LAT`, `TyphoonX`.`LONG`, " +
"`TyphoonX`.`DATE` FROM `TyphoonX` where TyphoonNM = ? ORDER BY `TyphoonX`.`DATE`";


/*
* Function search
* Queries the database based on parameters given and returns formatted results
* lat - Latitude to search within 1 degree of
* long - Longitude to search within 1 degree of
* yearmin - Low end of date range
* yearmax - High end of date range
* callback - error/result function callback
*/
function search(lat, long, yearmin, yearmax, callback) {
   // Parameter check: 90 and -90 are the high and low values of Latitude
    if (lat < -90 || lat > 90) {
      return callback (new bi("Invalid Latitude"));
    }
    // Parameter check: 180 and -180 are the high and low values of Longitude
    else if (long < -180 || long > 180) {
      return callback (new bi("Invalid Longitude"));
    }
    //If the year values are flipped (Other issues with year handled in search.js)
    else if (yearmin>yearmax) {
      var temp = yearmax;
      yearmax = yearmin;
      yearmin = temp;
    }
    else {
      //Create Variables for search: Parse int returns the base 10 value of a
      //number within a string, i.e. "100" becomes 100
      var latmin = parseInt(lat, 10) - range;
      var latmax = parseInt(lat, 10) + range;
      var longmin = parseInt(long, 10) -range;
      var longmax = parseInt(long, 10) + range;
      //Add trailing month/day to date so mysql can handle them
      yearmin = yearmin+"01-01";
      yearmax = yearmax+"12-31";
      //Array to store all the arrays of storm points
      var storms = [];

      //Search the Database - This executes once per search
      db.executeQuery(selStorms, [yearmin, yearmax, latmin, latmax, longmin, longmax], function (err, result) {

        //Error Handling
        if (err) {
          return callback(err);
        }
        else {
          //Read the Typhoon Names returned and get each individual point
          //associated with that storm
          return result.forEach(function process (element, index, array) {

            //Search the Database - This happens once per storm returned from
            // previous query
            db.executeQuery(getPoints, [element.TyphoonNM], function (err, results) {
              //Error Handling
              if (err) {
                return callback(err);
              }
              else {
                //Put each storm point from the database into an array and push
                //that array onto the end of the storms array
                results.forEach(function process (element, index, array) {
                  var points = [];
                  points.push(element.TyphoonNM);
                  points.push(element.DATE);
                  points.push(element.LAT);
                  points.push(element.LONG);
                  storms.push(points);

                });
                //Return at end of loop - prevents a return before loop finishes
                if (index === result.length - 1) {
                  //If here - no errors (null), and storms will be populated with
                  //all the results found.
                  return callback (null, storms)
                }
              }
            })
          });
        }

    });
  }
};
//export statement so search can be called from another file
exports.search = search;
