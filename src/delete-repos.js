let GetRepos = require('./get-repos.js');
let jsonFile = require('jsonfile');
let request = require('request');
let _ = require('lodash');
const getRepos = new GetRepos();
const settings = jsonFile.readFileSync('settings/settings.json');
const API_URL = `${settings.api_url}/repos/${settings.organization}`;

class DeleteRepos {
	async delete() {
		try {
			let repos = await getRepos.run();
			_.map(repos, (item) => {
				this.callApi(item);
			});
		} catch(error) {
			console.log(error.message);
		}
	}

	callApi(repoName) {
		let options = {
			url: `${API_URL}/${repoName}`,
			headers: {
				'Authorization': `token ${settings.token}`,
				'User-Agent': 'request'
			}
		};
		request
			.delete(options, (err, res) => {
				console.log(`${repoName} has been deleted from ${settings.organization}`);
			});
	}
}

module.exports = DeleteRepos;
