import axios from 'axios';
import * as cheerio from 'cheerio';

type Repository = {
  author: string,
  name: string,
  href: string,
  description: string | null,
  language: string,
  stars: number,
  forks: number,
  starsInPeriod: number,
};

const trendingGitHub = (period: string = 'daily', language: string = '') => (
  new Promise((resolve, reject) => axios
    .get(`https://github.com/trending/${encodeURIComponent(language)}?since=${period}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const repos: Repository[] = [];

      $('article').each((index, repo) => {
        const title = $(repo).find('h1.h3 a').text().trim();

        const starLink = `/${title.replace(/ /g, '')}/stargazers`;
        const forkLink = `/${title.replace(/ /g, '')}/network`;

        const indexRepo: Repository = {
          author: title.split(' / ')[0],
          name: title.split(' / ')[1],
          href: `https://github.com/${title.replace(/ /g, '')}`,
          description: $(repo).find('p').text().trim() || null,
          language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
          stars: parseInt($(repo).find(`[href="${starLink}"]`).text().trim()
            .replace(',', '') || '0', 0),
          forks: parseInt($(repo).find(`[href="${forkLink}"]`).text().trim()
            .replace(',', '') || '0', 0),
          starsInPeriod: parseInt('0', 0)
        }

        switch (period as string) {
          case 'daily':
            indexRepo.starsInPeriod = parseInt(
              $(repo)
                .find('span.float-sm-right:contains("stars today")')
                .text()
                .trim()
                .replace('stars today', '')
                .replace(',', '') || '0',
              0,
            )
            break
          case 'weekly':
            indexRepo.starsInPeriod = parseInt(
              $(repo)
                .find('span.float-sm-right:contains("stars this week")')
                .text()
                .trim()
                .replace('stars this week', '')
                .replace(',', '') || '0',
              0,
            )
            break
          case 'monthly':
            indexRepo.starsInPeriod = parseInt(
              $(repo)
                .find('span.float-sm-right:contains("stars this month")')
                .text()
                .trim()
                .replace('stars this month', '')
                .replace(',', '') || '0',
              0,
            )
            break
          default:
            break
        }

        repos.push(indexRepo);
      });

      resolve(repos);
    })
    .catch((err) => {
      reject(err);
    })));

export default trendingGitHub;

// For CommonJS default export support
module.exports = trendingGitHub;
module.exports.default = trendingGitHub;
