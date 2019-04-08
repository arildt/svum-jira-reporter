const read = require('read');
const { promisify } = require('util');

const readAsync = promisify(read);

module.exports = usernameEnv => {
	return usernameEnv
		? Promise.resolve(usernameEnv)
		: readAsync({ prompt: 'Username: ', silent: false });
}