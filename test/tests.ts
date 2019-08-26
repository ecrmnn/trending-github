import { describe, before, it } from 'mocha';
import { expect } from 'chai';
import collect from 'collect.js';
// eslint-disable-next-line
import trending from '../src';

describe('Trending Github Test Suite', () => {
  describe('All languages', () => {
    let result: any;

    before((done) => {
      trending()
        .then((response) => {
          result = response;
          done();
        })
        .catch((err) => {
          result = err;
        });
    });

    it('should get all trending repos from all languages', () => {
      const groupedByLanguage = collect(result).groupBy('language').all();
      expect(Object.keys(groupedByLanguage).length).to.be.above(1);

      const randomIndex = Math.floor(Math.random() * result.length);
      const randomRepo = result[randomIndex];

      expect(randomRepo.author.length).to.be.above(1);
      expect(randomRepo.name.length).to.be.above(1);
      expect(randomRepo.href.length).to.be.above(1);
      expect(randomRepo.stars).to.be.above(1);
      expect(randomRepo.starsInPeriod).to.be.above(1);
    });
  });

  describe('JavaScript', () => {
    let result: any;

    before((done) => {
      trending('weekly', 'javascript')
        .then((response) => {
          result = response;
          done();
        })
        .catch((err) => {
          result = err;
        });
    });

    it('should get all trending repos from javascript', () => {
      const groupedByLanguage = collect(result).groupBy('language').all();

      expect(Object.keys(groupedByLanguage).length).to.eql(1);

      const randomIndex = Math.floor(Math.random() * result.length);
      const randomRepo = result[randomIndex];

      expect(randomRepo.author.length).to.be.above(1);
      expect(randomRepo.name.length).to.be.above(1);
      expect(randomRepo.href.length).to.be.above(1);
      expect(randomRepo.stars).to.be.above(1);
      expect(randomRepo.starsInPeriod).to.be.above(1);
    });
  });

  describe('Python', () => {
    let result: any;

    before((done) => {
      trending('daily', 'python')
        .then((response) => {
          result = response;
          done();
        })
        .catch((err) => {
          result = err;
        });
    });

    it('should return python repositories', () => {
      const groupedByLanguage = collect(result).groupBy('language').all();
      expect(Object.keys(groupedByLanguage).length).to.eql(1);

      const randomIndex = Math.floor(Math.random() * result.length);
      const randomRepo = result[randomIndex];

      expect(randomRepo.author.length).to.be.above(1);
      expect(randomRepo.name.length).to.be.above(1);
      expect(randomRepo.href.length).to.be.above(1);
      expect(randomRepo.stars).to.be.above(1);
      expect(randomRepo.starsInPeriod).to.be.above(1);
    });
  });

  describe('Non-existing language', () => {
    let result: any;

    before((done) => {
      trending('daily', 'xoxo')
        .then((response) => {
          result = response;
          done();
        })
        .catch((err) => {
          result = err;
        });
    });

    it('should return empty', () => {
      expect(result).to.eql([]);
    });
  });
});
