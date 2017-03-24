const jsonFile = require('jsonfile');
const request = require('request');
const _ = require('lodash');

const file = 'settings/settings.json';
const settings = jsonFile.readFileSync(file);
const API_URL = `${settings.api_url}/orgs/${settings.organization}/repos?per_page=${settings.limit}`;

class getRepos {
	run() {
		const options = {
			url: API_URL,
			headers: {
				'Authorization': `token ${settings.token}`,
				'User-Agent': 'request',
			},
		};
		console.log(`Listing all ${settings.repo} in ${settings.organization}`);
		return new Promise((resolve, reject) => {
			request(options, (err, response, body) => {
				if(typeof response === 'undefined') { reject({message: 'Request timeout'}); return; }
				if(response.statusCode !== 200) { reject(JSON.parse(response.body)); return; }
				const repo = settings.repo;
				body = JSON.parse(body);
				const repos = _.chain(body)
                    .filter(item => ((item.name).indexOf(repo) === 0))
                    .map('name')
                    .value();
				console.log(`Found ${repos.length} repositories`);
				resolve(repos);
			});
		});
	}
}

module.exports = getRepos;
