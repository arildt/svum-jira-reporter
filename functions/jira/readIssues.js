const arraySort = require('array-sort');

const _readIssues = (jql, previousIssues) => async jira => {
	const maxResults = 200;

	console.log({ maxResults, startAt: previousIssues.length, jql });

	const result = await jira.search.search({
		startAt: previousIssues.length,
		jql,
		maxResults
	});

	const { total, issues } = result;

	const concatenatedIssues = [...previousIssues, ...issues];

	const count = concatenatedIssues.length;

	if (count < total) {
		return await _readIssues(jql, concatenatedIssues)(jira);
	}

	return concatenatedIssues;
}

module.exports = (jql, mapper, sortByKey) => async jira => {
	const issues = await _readIssues(jql, [])(jira);

	const mappedIssues = issues.map(mapper);

	return arraySort(mappedIssues, sortByKey);
};
