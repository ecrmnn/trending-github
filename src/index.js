'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (period, language) {
  return new Promise((resolve, reject) => {

    if (typeof period === 'undefined') {
      period = 'daily';
    }

    if (typeof language === 'undefined') {
      language = '';
    }

    return axios.get('https://github.com/trending/' + language + '?since=' + period)
      .then(response => {
        const $ = cheerio.load(response.data);
        const repos = [];

        $('li', 'ol.repo-list').each((index, repo) => {
          const title = $(repo).find('h3').text().trim();

          repos.push({
            author: title.split(' / ')[0],
            name: title.split(' / ')[1],
            href: 'https://github.com/' + title.replace(/ /g, ''),
            description: $(repo).find('p', '.py-1').text().trim() || null,
            language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
            stars: parseInt($(repo).find('[aria-label=Stargazers]').text().trim().replace(',', '')),
            forks: parseInt($(repo).find('[aria-label=Forks]').text().trim().replace(',', ''))
          });
        });

        resolve(repos);
      })
      .catch(err => {
        reject(err);
      });
  });
}