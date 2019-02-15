'use strict';
exports.__esModule = true;
var axios_1 = require("axios");
var cheerio = require("cheerio");
var trendingGitHub = function (period, language) {
    return new Promise(function (resolve, reject) {
        if (typeof period === 'undefined') {
            period = 'daily';
        }
        if (typeof language === 'undefined') {
            language = '';
        }
        return axios_1["default"].get('https://github.com/trending/' + encodeURIComponent(language) + '?since=' + period)
            .then(function (response) {
            var $ = cheerio.load(response.data);
            var repos = [];
            $('li', 'ol.repo-list').each(function (index, repo) {
                var title = $(repo).find('h3').text().trim();
                var starLink = '/' + title.replace(/ /g, '') + '/stargazers';
                var forkLink = '/' + title.replace(/ /g, '') + '/network';
                repos.push({
                    author: title.split(' / ')[0],
                    name: title.split(' / ')[1],
                    href: 'https://github.com/' + title.replace(/ /g, ''),
                    description: $(repo).find('p .py-1').text().trim() || null,
                    language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
                    stars: parseInt($(repo).find('[href="' + starLink + '"]').text().trim().replace(',', '') || '0'),
                    forks: parseInt($(repo).find('[href="' + forkLink + '"]').text().trim().replace(',', '') || '0'),
                    starsToday: parseInt($(repo).find('span.float-sm-right:contains("stars today")').text().trim().replace('stars today', '').replace(',', '') || '0')
                });
            });
            resolve(repos);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports["default"] = trendingGitHub;
// For CommonJS default export support
module.exports = trendingGitHub;
module.exports["default"] = trendingGitHub;
