const readIssues = require('./readIssues');
const {
	parseSprints,
} = require('./parseUtil');

const mapper = issue => ({
	'ID': issue.id,
	'Key': issue.key,
	'Issue Type': issue.fields.issuetype.name,
	'Summary': issue.fields.summary,
	'Status': issue.fields.status.name,
	'Time Spent': issue.fields.aggregatetimespent / 3600,
	'Release': issue.fields.fixVersions.map(fixVersion => fixVersion.name).join(', '),
	'Sprint': parseSprints(issue)
});

module.exports = readIssues('filter = Common-SVUM-Admin', mapper, 'ID');
