const readIssues = require('./readIssues');
const {
	calculateCurrentEstimate,
	parseSprints,
	parseTestCase,
	parseTestType
} = require('./parseUtil');

const mapper = issue => ({
	'ID': issue.id,
	'Key': issue.key,
	'Issue Type': issue.fields.issuetype.name,
	'Summary': issue.fields.summary,
	'Status': issue.fields.status.name,
	'Components': issue.fields.components.map(component => component.name).join(', '),
	'Time Spent': issue.fields.aggregatetimespent / 3600,
	'Sprint': parseSprints(issue)
});

module.exports = readIssues('filter = Common-SVUM-Bugs', mapper, 'ID');