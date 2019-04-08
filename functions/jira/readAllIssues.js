const readIssues = require('./readIssues');
const {
	calculateCurrentEstimate,
	parseSprints,
} = require('./parseUtil');

const mapper = issue => ({
	'ID': issue.id,
	'Key': issue.key,
	'Issue Type': issue.fields.issuetype.name,
	'Summary': issue.fields.summary,
	'Status': issue.fields.status.name,
	'Original Estimate': issue.fields.aggregatetimeoriginalestimate / 3600,
	'Remaining Estimate': issue.fields.aggregatetimeestimate / 3600,
	'Time Spent': issue.fields.aggregatetimespent / 3600,
	'Current Estimate': calculateCurrentEstimate(issue) / 3600,
	'Progress': issue.fields.aggregateprogress.percent ? issue.fields.aggregateprogress.percent / 100 : 0,
	'Sprint': parseSprints(issue)
});

module.exports = readIssues('project = SVUM', mapper, 'ID');