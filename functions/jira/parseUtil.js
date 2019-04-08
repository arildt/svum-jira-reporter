const parseGrovestimat = grovestimat => {
	switch (grovestimat) {
		case '2,5 dv': return 2.5;
		case '5 dv': return 5;
		case '10 dv': return 10;
		case '10+ dv': return 12;
		default: return 1;
	}
};

const calculateOriginalEstimate = issue => {
	if (issue.fields.aggregatetimeoriginalestimate) {
		return issue.fields.aggregatetimeoriginalestimate;
	}
	
	if (issue.fields.customfield_11370) {
		return parseGrovestimat(issue.fields.customfield_11370.value) * 8 * 3600;
	}

	return 0;
};

const calculateCurrentEstimate = issue => {
	if (issue.fields.aggregatetimeestimate || issue.fields.aggregatetimespent) {
		return issue.fields.aggregatetimeestimate + issue.fields.aggregatetimespent;
	}

	if (issue.fields.aggregatetimeoriginalestimate) {
		return issue.fields.aggregatetimeoriginalestimate;
	}

	if (issue.fields.customfield_11370) {
		return parseGrovestimat(issue.fields.customfield_11370.value) * 8 * 3600;
	}

	return 0;
};

const parseTestCase = issue => {
	const match = issue.fields.summary.match(/TC-[0-9]+/);
	return match ? match[0] : '';
};

const parseTestType = issue => {
	if (!issue.fields.labels) {
		return '';
	}

	if (issue.fields.labels.includes('Test')) {
		return 'Test';
	}

	if (issue.fields.labels.includes('TestCase')) {
		return 'TestCase';
	}

	if (issue.fields.labels.includes('Systemtest')) {
		return 'Systemtest';
	}

	if (issue.fields.labels.includes('TestAdmin')) {
		return 'TestAdmin';
	}

	return '';
}

const parseSprints = issue => issue.fields.customfield_10670
		? issue.fields.customfield_10670.map(string => 
			string.substring(
				string.indexOf('name=') + 5,
				string.indexOf(',startDate=')))
				.join(', ')
		: '';

const parseRelatedBugs = issue => {
	if (!issue.fields.issuelinks) {
		return '';
	}

	return issue.fields.issuelinks
		.filter(link => link.type.name === 'Related')
		.map(link => link.inwardIssue || link.outwardIssue)
		.filter(linkedIssue => linkedIssue.fields.issuetype.name === 'Bug')
		.map(linkedIssue => linkedIssue.key)
		.join(', ');
};

module.exports = {
	parseGrovestimat,
	calculateOriginalEstimate,
	calculateCurrentEstimate,
	parseTestCase,
	parseTestType,
	parseSprints,
	parseRelatedBugs
};
