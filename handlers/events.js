const { readdirSync } = require('fs');
const { log, log_info, log_warn, log_error } = require('../lib/log');
const { blue, yellow } = require('chalk');

module.exports = (client) => {
	let evnt_list = [];
	const event_folders = readdirSync('./events');
	for (let folder of event_folders) {
		const event_files = readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
		for (let file of event_files) {
			const event = require(`../events/${folder}/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.run(...args, client));
				evnt_list.push(event.name);
			}
			else {
				client.on(event.name, (...args) => event.run(...args, client));
				evnt_list.push(event.name);
			}
		}
	}
	log_info(`Registered ${blue(evnt_list.length)} event(s): ${yellow(evnt_list.join(', '))}`);
}