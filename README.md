# trending-github
> Simple API for getting trending repositories on Github

[![Travis](https://img.shields.io/travis/ecrmnn/trending-github.svg?style=flat-square)](https://travis-ci.org/ecrmnn/trending-github.svg?branch=master)
[![npm version](https://img.shields.io/npm/v/trending-github.svg?style=flat-square)](http://badge.fury.io/js/trending-github)
[![npm downloads](https://img.shields.io/npm/dm/trending-github.svg?style=flat-square)](http://badge.fury.io/js/trending-github)
[![npm license](https://img.shields.io/npm/l/trending-github.svg?style=flat-square)](http://badge.fury.io/js/trending-github)
[![eslint](https://img.shields.io/badge/code_style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

### Installation
```bash
npm install trending-github --save
```

### Usage
```javascript
const trending = require('trending-github');

trending()
  .then(repos => console.log(repos));

//=> [{
//=>   author: 'asciimoo',
//=>   name: 'wuzz',
//=>   href: 'https://github.com/asciimoo/wuzz',
//=>   description: 'Interactive cli tool for HTTP inspection',
//=>   language: 'Go',
//=>   stars: 966,
//=>   forks: 20,
//=>   starsInPeriod: 153
//=> }, ... ]
```

```javascript
const trending = require('trending-github');

trending('weekly', 'javascript')
  .then(repos => console.log(repos));

//=> [{
//=>   author: 'freeCodeCamp',
//=>   name: 'freeCodeCamp',
//=>   href: 'https://github.com/freeCodeCamp/freeCodeCamp',
//=>   description: 'The https://freeCodeCamp.com open source codebase and curriculum. Learn to code and help nonprofits.',
//=>   language: 'JavaScript',
//=>   stars: 229260,
//=>   forks: 9289
//=>   starsInPeriod: 42
//=> }, ... ]
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)