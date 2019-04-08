module.exports = (workbook, file) => {
	return workbook.xlsx.writeFile(file);
}