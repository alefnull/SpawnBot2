const { readdirSync, existsSync } = require('fs');
const { blue, yellow } = require('chalk');
const { log_info } = require('../lib/log');

module.exports = (client) => {
	let cmd_list = [];
	let cust_cmd_list = [];
	const command_folders = readdirSync('./commands');
	for (let folder of command_folders) {
		const command_files = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
		for (let file of command_files) {
			const command = require(`../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
			cmd_list.push(command.name);
			if (command.aliases) {
				command.aliases.forEach(alias => client.commands.set(alias, command));
			}
		}
	}
	log_info(`Registered ${blue(cmd_list.length)} command(s): ${yellow(cmd_list.join(', '))}`);

	if (existsSync('./data/custom.json')) {
		const custom = require('../data/custom.json');
		for (let command in custom) {
			client.custom_commands.set(command, custom[command]);
			cust_cmd_list.push(command);
		}
	}
	log_info(`Registered ${blue(cust_cmd_list.length)} custom command(s): ${yellow(cust_cmd_list.join(', '))}`);
};