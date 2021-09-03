const { username } = require('../../data/config.json');
const { magenta } = require('chalk');
const { log, log_info, log_warn, log_error } = require('../../lib/log');

module.exports = {
	name: 'ready',
	description: 'triggered when the bot is ready',
	run(client) {
		client.user.setUsername(username)
		log_info(`${magenta('SpawnBot2')} is ready and logged in as ${magenta(client.user.tag)}`, 'info');
		client.user.setActivity('with the backend', { type: 'PLAYING' });
	}
};