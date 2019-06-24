import { expect } from 'chai';
import collect from 'collect.js';
import trending from '../src';

describe('Trending Github Test Suite', function () {
  describe('All languages', function () {
    let result: any;

    before(function (done) {
      trending()
        .then(response => {
          result = response;
          done();
        })
        .catch(err => {
          result = err;
        });
    });

    it('should get all trending repos from all languages', function () {
      const groupedByLanguage = collect(result).groupBy('language').all();
      expect(Object.keys(groupedByLanguage).length).to.be.above(1);
    });
  });

  describe('JavaScript', function () {
    let result: any;

    before(function (done) {
      trending('weekly', 'javascript')
        .then(response => {
          result = response;
          done();
        })
        .catch(err => {
          result = err;
        });
    });

    it('should get all trending repos from javascript', function () {
      const groupedByLanguage = collect(result).groupBy('language').all();
      expect(Object.keys(groupedByLanguage).length).to.eql(1);
    });
  });

  describe('c# language', function () {
    let result: any;

    before(function (done) {
      trending('daily', 'c#')
        .then(response => {
          result = response;
          done();
        })
        .catch(err => {
          result = err;
        });
    });

    it('should return c# repositories', function () {
      const groupedByLanguage = collect(result).groupBy('language').all();
      expect(Object.keys(groupedByLanguage).length).to.eql(1);
    });
  });

  describe('Non-existing language', function () {
    let result: any;

    before(function (done) {
      trending('daily', 'xoxo')
        .then(response => {
          console.log('then');
          result = response;
          done();
        })
        .catch(err => {
          console.log('err');
          result = err;
        });
    });

    it('should return empty', function () {
      expect(result).to.eql([]);
    });
  });
});