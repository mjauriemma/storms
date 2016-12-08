'use strict';

var config = require('./../../config/config');
var should = require('should');
var errors = require('./../../helpers/error');
var storms = require('./../../models/storms');

var  yearmin = "1945";
var  yearmax = "2016";
var  latLow = -91;
var  latEdgeLow= -90;
var  latValidLow= -50;
var  latZero= 0;
var  latEdgeHigh= 90;
var  latValidHigh= 50;
var  latHigh= 91;
var  longLow= -181;
var  longEdgeLow= -180;
var  longValidLow= -50;
var  longZero= 0;
var  longEdgeHigh= 180;
var  longValidHigh= 50;
var  longHigh= 181;


describe('Storm Data Access', function() {
    describe('Valid Search', function() {
        it('Should Return Successfully', function(done) {
            storms.search(latZero, longZero, yearmin, yearmax, function(err,results) {
              should.not.exist(err);
              //results.should.be.ok;
              return done();
            })
        });
        it('Should Return Successfully', function(done) {
            storms.search(latValidHigh, longValidHigh, yearmin, yearmax, function(err,results) {
              should.not.exist(err);
              //results.should.be.ok;
              return done();
            })
        });
        it('Should Return Successfully', function(done) {
            storms.search(latValidLow, longValidLow, yearmin, yearmax, function(err,results) {
              should.not.exist(err);
              //results.should.be.ok;
              return done();
            })
        });
    });
        describe('Invalid Search', function() {
            it('Should Error', function(done) {
                storms.search(latLow, longLow, yearmin, yearmax, function(err,results) {
                  err.should.be.ok.and.instanceOf(errors.BadInput);
                  should.not.exist(results);
                  return done();
                })
            });
            it('Should Error', function(done) {
                storms.search(latHigh, longHigh, yearmin, yearmax, function(err,results) {
                  err.should.be.ok.and.instanceOf(errors.BadInput);
                  should.not.exist(results);
                  return done();
                })
            });

        });
    describe('Upper Latitude Boundary', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latEdgeHigh, longZero, yearmin, yearmax, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('Lower Latitude Boundary', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latEdgeLow, longZero, yearmin, yearmax, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('Invalid Latitude High', function () {
      it('Should Error', function (done) {
        storms.search(latHigh, longZero, yearmin, yearmax, function (err,results) {
          err.should.be.ok.and.instanceOf(errors.BadInput);
          should.not.exist(results);
          return done();
        })
      })
    })
    describe('Invalid Latitude Low', function () {
      it('Should Error', function (done) {
        storms.search(latLow, longZero, yearmin, yearmax, function (err,results) {
          err.should.be.ok.and.instanceOf(errors.BadInput);
          should.not.exist(results);
          return done();
        })
      })
    })
    //Longitude Tests
    describe('Upper Longitude Boundary', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latZero, longEdgeHigh, yearmin, yearmax, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('Lower Longitude Boundary', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latZero, longEdgeLow, yearmin, yearmax, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('Invalid Longitude High', function () {
      it('Should Error', function (done) {
        storms.search(latZero, longHigh, yearmin, yearmax, function (err,results) {
          err.should.be.ok.and.instanceOf(errors.BadInput);
          should.not.exist(results);
          return done();
        })
      })
    })
    describe('Invalid Longitude Low', function () {
      it('Should Error', function (done) {
        storms.search(latZero, longLow, yearmin, yearmax, function (err,results) {
          err.should.be.ok.and.instanceOf(errors.BadInput);
          should.not.exist(results);
          return done();
        })
      })
    })
    describe('Low Minimum Year', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latZero, longLow, "1940", yearmax, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('High Maximum Year', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latZero, longLow, yearmin, "2222", function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
    describe('Year Values Flipped', function () {
      it('Should Return Successfully', function (done) {
        storms.search(latZero, longLow, yearmax, yearmin, function (err,results) {
          should.not.exist(err);
          //results.should.be.ok;
          return done();
        })
      })
    })
});
