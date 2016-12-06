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
var selStorms = "Select * from `TyphoonX` where "+
"(`TyphoonX`.`LAT` > -? and `TyphoonX`.`LAT` < -?) AND "+
"(`TyphoonX`.`LONG`>-? AND `TyphoonX`.`LONG`<-?)";



function search(lat, long, yearmin, yearmax, callback) {

    //if (latmin < -90 || latmin > 90 ||latmax <-90 || latmax > 90) {
    if (lat < -90 || lat > 90) {
      //console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + lat);
      //console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + long);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
      console.log("\tError: Invalid Latitude");
      return callback (new bi("Invalid Latitude"));
    }
    // else if (longmin < -180 || longmin > 180 || longmax < -180 || longmax > 180) {
    else if (long < -180 || long > 180) {
      //console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + lat);
      //console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + long);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
      console.log("\tError: Invalid Longitude")
      return callback (new bi("Invalid Longitude"));
    }

    else {
      //console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + lat);
      //console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + long);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
      console.log("\tSuccess");

      var latmin = parseInt(lat, 10) - range;
      var latmax = parseInt(lat, 10) + range;
      var longmin = parseInt(long, 10) -range;
      var longmax = parseInt(long, 10) + range;
      console.log ("Latitude adjusted" + latmin + " " + latmax + " ")
      // console.log(selStorms, [lat, 10, lat, 10, long, 10, long, 10])

      return db.executeQueryAsync(selStorms, [latmin, latmax, longmin, longmax],callback)
      .then(function(result) {
        console.log("result: " + result);
        return result;
      })
      .nodeify(callback);


   //console.log("results callback");
  //return callback (null, "Success");
}
};
exports.search = search;
