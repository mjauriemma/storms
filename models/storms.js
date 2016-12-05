'use strict';


let https = require('https');
var config = require('../config/config');
var bi = require('../helpers/error/BadInput');
var querystring = require("querystring");
let Promise = require('bluebird');

var dbFactory = require('./db');
var db = Promise.promisifyAll(dbFactory(config.db));
// let schema = require('./schema').tweets;


function search(lat, long, callback) {

    if (lat < -90 || lat > 90) {
      console.log("\tLatitude: " + lat);
      console.log("\tLongitude: " + long);
      console.log("\tError: Invalid Latitude");
      return callback (new bi("Invalid Latitude"));
    }
    else if (long < -180 || long > 180) {
      console.log("\tLatitude: " + lat);
      console.log("\tLongitude: " + long);
      console.log("\tError: Invalid Longitude")
      return callback (new bi("Invalid Longitude"));
    }

    else {
    console.log("\tLatitude: " + lat);
    console.log("\tLongitude: " + long);
    console.log("\tSuccess");

    
   //console.log("results callback");
  return callback (null, "Success");
}
};
exports.search = search;
