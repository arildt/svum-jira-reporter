const readIssues = require('./readIssues');
const {
	parseSprints,
	parseGrovestimat,
	calculateOriginalEstimate,
	calculateCurrentEstimate
} = require('./parseUtil');

const mapper = issue => ({
	'ID': issue.id,
	'Key': issue.key,
	'Issue Type': issue.fields.issuetype.name,
	'Summary': issue.fields.summary,
	'Status': issue.fields.status.name,
	'Grovestimat': issue.fields.customfield_11370 ? issue.fields.customfield_11370.value : '',
	'Original Estimate': calculateOriginalEstimate(issue) / 3600,
	'Remaining Estimate': issue.fields.aggregatetimeestimate / 3600,
	'Time Spent': issue.fields.aggregatetimespent / 3600,
	'Current Estimate': calculateCurrentEstimate(issue) / 3600,
	'Progress': issue.fields.aggregateprogress.percent ? issue.fields.aggregateprogress.percent / 100 : 0,
	'Release': issue.fields.fixVersions.map(fixVersion => fixVersion.name).join(', '),
	'Sprint': parseSprints(issue),
	'Change Order': (issue.fields.labels && issue.fields.labels.includes('Endringsønske'))
		? '1'
		: '0'
});

module.exports = readIssues('filter = Common-SVUM-UserStories', mapper, 'ID');
