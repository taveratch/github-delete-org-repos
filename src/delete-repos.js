/*eslint no-console: ["error", { allow: ["log"] }] */

let GetRepos = require('./get-repos.js');
let jsonFile = require('jsonfile');
let request = require('request');
let _ = require('lodash');
const getRepos = new GetRepos();
const settings = jsonFile.readFileSync('settings/settings.json');
const API_URL = `${settings.api_url}/repos/${settings.organization}`;

/*
	Delete specific repositories
*/
class DeleteRepos {
	delete(repos) {
		try {
			// Call delete api for each repo.
			_.map(repos, (item) => {
				this.callApi(item);
			});
		} catch(error) {
			console.log(error.message);
		}
	}

	callApi(repoName) {

		// Http request data.
		let options = {
			url: `${API_URL}/${repoName}`,
			headers: {
				'Authorization': `token ${settings.token}`,
				'User-Agent': 'request'
			}
		};

		// Calling github delete repo api.
		request
			.delete(options, (err, res) => {
				console.log(`${repoName} has been deleted from ${settings.organization}`);
			});
	}
}

module.exports = DeleteRepos;
