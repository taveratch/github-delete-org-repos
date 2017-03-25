/*eslint no-console: ["error", { allow: ["log"] }] */

const jsonFile = require('jsonfile');
const request = require('request');
const _ = require('lodash');

const file = 'settings/settings.json';
const settings = jsonFile.readFileSync(file);
const API_URL = `${settings.api_url}/orgs/${settings.organization}/repos?per_page=${settings.limit}`;

class getRepos {
	run() {

		// Http request data
		const options = {
			url: API_URL,
			headers: {
				'Authorization': `token ${settings.token}`,
				'User-Agent': 'request',
			},
		};

		console.log(`Listing all ${settings.repo} in ${settings.organization}`);

		// return a promise for getting all repos in organization.
		return new Promise((resolve, reject) => {
			request(options, (err, response, body) => {
				// If timeout occur then reject the promise.
				if(typeof response === 'undefined') { reject({message: 'Request timeout'}); return; }

				// If request has en error (bad credential, ...) ten reject the promise
				if(response.statusCode !== 200) { reject(JSON.parse(response.body)); return; }

				// Parse body into json.
				const repo = settings.repo;
				body = JSON.parse(body);

				// Filtering only repo from settings and get its name as an array.
				const repos = _.chain(body)
                    .filter(item => ((item.name).indexOf(repo) === 0))
                    .map('name')
                    .value();
				console.log(`Found ${repos.length} repositories`);

				// resolve the success
				resolve(repos);
			});
		});
	}
}

module.exports = getRepos;
