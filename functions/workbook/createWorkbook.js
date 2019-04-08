const Excel = require('exceljs');

const createSheetFromIssues = (workbook, sheetName, issues) => {
	const sheet = workbook.addWorksheet(sheetName);

	if (issues.length === 0) {
		return workbook;
	}

	const firstIssue = issues[0];

	sheet.columns = Object.keys(firstIssue).map(issueAttribute => ({
		header: issueAttribute,
		key: issueAttribute,
		width: 30
	}));

	issues.forEach(issue => {
		sheet.addRow(issue);
	});

	return workbook;
};

module.exports = (issuesBySheetName) => {
	const workbook = new Excel.Workbook();
	workbook.creator = 'Script';
	workbook.lastModifiedBy = 'Srcript';
	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.lastPrinted = new Date();

	Object.keys(issuesBySheetName).forEach(sheetName =>
		createSheetFromIssues(workbook, sheetName, issuesBySheetName[sheetName]));
	
	return workbook;
};