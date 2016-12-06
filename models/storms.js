'use strict';


let https = require('https');
var config = require('../config/config');
var bi = require('../helpers/error/BadInput');
var querystring = require("querystring");
let Promise = require('bluebird');

var dbFactory = require('./db');
var db = Promise.promisifyAll(dbFactory(config.db));
// let schema = require('./schema').tweets;


function search(latmin, longmin, latmax, longmax, yearmin, yearmax, callback) {

    if (latmin < -90 || latmin > 90 ||latmax <-90 || latmax > 90) {
      console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + latmax);
      console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + longmax);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
      console.log("\tError: Invalid Latitude");
      return callback (new bi("Invalid Latitude"));
    }
    else if (longmin < -180 || longmin > 180 || longmax < -180 || longmax > 180) {
      console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + latmax);
      console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + longmax);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
      console.log("\tError: Invalid Longitude")
      return callback (new bi("Invalid Longitude"));
    }

    else {
      console.log("\tLatitude: " + latmin);
      console.log("\tLatitude: " + latmax);
      console.log("\tLongitude: " + longmin);
      console.log("\tLongitude: " + longmax);
      console.log("\tYear: " + yearmin);
      console.log("\tYear: " + yearmax);
    console.log("\tSuccess");


   //console.log("results callback");
  return callback (null, "Success");
}
};
exports.search = search;
