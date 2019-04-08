const readIssues = require('./readIssues');
const {
	calculateOriginalEstimate,
	calculateCurrentEstimate,
	parseSprints,
	parseRelatedBugs
} = require('./parseUtil');

const mapper = issue => ({
		'ID': issue.id,
		'Key': issue.key,
		'Issue Type': issue.fields.issuetype.name,
		'Summary': issue.fields.summary,
		'Status': issue.fields.status.name,
		'Related Bugs': parseRelatedBugs(issue),
		'Grovestimat': issue.fields.customfield_11370 ? issue.fields.customfield_11370.value : '',
		'Original Estimate': issue.fields.aggregatetimeoriginalestimate / 3600,
		'Calc. Original Estimate': calculateOriginalEstimate(issue) / 3600,
		'Remaining Estimate': issue.fields.aggregatetimeestimate / 3600,
		'Time Spent': issue.fields.aggregatetimespent / 3600,
		'Current Estimate': calculateCurrentEstimate(issue) / 3600,
		'Progress': issue.fields.aggregateprogress.percent ? issue.fields.aggregateprogress.percent / 100 : 0,
		'Release': issue.fields.fixVersions.map(fixVersion => fixVersion.name).join(', '),
		'Sprint': parseSprints(issue)
	})

module.exports = readIssues('filter = Common-SVUM-BugFixes', mapper, 'ID');
