const read = require('read');
const { promisify } = require('util');

const readAsync = promisify(read);

module.exports = passwordEnv =>
	passwordEnv
		? passwordEnv
		: readAsync({ prompt: 'Password: ', silent: true })