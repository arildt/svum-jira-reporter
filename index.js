const JiraClient = require('jira-connector');
const arraySort = require('array-sort');
const argv = require('minimist')(process.argv.slice(2));

const readHost = require('./functions/configuration/readHost');
const readUsername = require('./functions/configuration/readUsername');
const readPassword = require('./functions/configuration/readPassword');

const readUserStories = require('./functions/jira/readUserStories');
const readTechnicalTasks = require('./functions/jira/readTechnicalTasks');
const readAdminTasks = require('./functions/jira/readAdminTasks');
const readTestIssues = require('./functions/jira/readTestIssues');
const readBugIssues = require('./functions/jira/readBugIssues');
const readBugFixIssues = require('./functions/jira/readBugFixIssues');
const readOtherIssues = require('./functions/jira/readOtherIssues');
const readAllIssues = require('./functions/jira/readAllIssues');

const createWorkbook = require('./functions/workbook/createWorkbook');
const writeWorkbook = require('./functions/workbook/writeWorkbook');

// Environment vars.
const HOST_ENV = process.env.JIRA_HOST;
const USERNAME_ENV = process.env.JIRA_USERNAME;
const PASSWORD_ENV = process.env.JIRA_PASSWORD;

(async () => {
	try {
		const host = await readHost(HOST_ENV);
		const username = await readUsername(USERNAME_ENV);
		const password = await readPassword(PASSWORD_ENV);
		
		const jira = new JiraClient({
			    host,
			    basic_auth: {
			        username,
			        password
			    }
			});

		const userStories = await readUserStories(jira);
		const technicalTasks = await readTechnicalTasks(jira);
		const adminTasks = await readAdminTasks(jira);
		const testIssues = await readTestIssues(jira);
		const productionTasks = arraySort(userStories.concat(technicalTasks), 'ID');
		const bugIssues = await readBugIssues(jira);
		const bugFixIssues = await readBugFixIssues(jira);
		const otherIssues = await readOtherIssues(jira);
		const allIssues = await readAllIssues(jira);

		const createdWorkbook = createWorkbook({
			'Development': productionTasks,
			'UserStories': userStories,
			'TechnicalTasks': technicalTasks,
			'Administration': adminTasks,
			'Testing': testIssues,
			'Bugs': bugIssues,
			'BugFixes': bugFixIssues,
			'Other': otherIssues,
			'All': allIssues
		});

		await writeWorkbook(createdWorkbook, argv.out);
	} catch (err) {
		console.error(err);
	}
})();