const read = require('read');
const { promisify } = require('util');

const readAsync = promisify(read);

module.exports = hostEnv => {
	return hostEnv
		? Promise.resolve(hostEnv)
		: readAsync({ prompt: 'Host: ', silent: false });
}