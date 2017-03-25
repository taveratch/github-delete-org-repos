/*eslint no-console: ["error", { allow: ["log"] }] */

let DeleteRepos = require('./delete-repos.js');
let GetRepos = require('./get-repos.js');
let readline = require('readline');
let deleteRepos = new DeleteRepos();
let getRepos = new GetRepos();

// Get repos.
(async function () {
	let prompt = readline.createInterface(process.stdin, process.stdout);
	try {
		let repos = await getRepos.run();
		if(repos.length === 0) {
			console.log('No repositories are found. Quiting');
			process.exit();
		}
		console.log('\n--------');
		repos.forEach((each) => { console.log(each); });
		console.log('--------\n');
		prompt.question(`Do you want to delete ${repos.length} repositories (y/n) ? `, (ans) => {
			if(ans === 'y') {
				console.log('---- Deleting ----');
				deleteRepos.delete(repos);
			}else {
				console.log('---- Quiting ----');
				process.exit();
			}
		});
		// deleteRepos.delete(repos);
	}catch(error) {
		console.log(error.message);
	}
})();
