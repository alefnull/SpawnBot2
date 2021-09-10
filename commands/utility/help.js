const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../data/config.json');

module.exports = {
	// 'help' command
	// usage: !help (displays all commands)
	name: 'help',
	aliases: ['list'],
	description: 'Display a list of all commands',
	permission: 'SEND_MESSAGES',
	run(client, msg) {
		const excluded = ['emit_member_add', 'emit_member_remove'];

		// get list of all commands, not including duplicates
		let commands = client.commands.filter(c => c.name !== 'help');

		// filter out excluded commands
		commands = commands.filter(c => !excluded.includes(c.name));

		// get list of all custom commands
		let custom_commands = client.custom_commands;

		// strip out duplicates
		commands = commands.reduce((acc, cur) => {
			if (!acc.some(c => c.name === cur.name)) {
				acc.push(cur);
			}
			return acc;
		}, []);

		const embed = new MessageEmbed()
			.setTitle('Commands List')
			.setColor('#0000ee');

		commands.forEach(cmd => {
			let aliases = '';
			if (cmd.aliases) {
				cmd.aliases.forEach(alias => {
					aliases += `${alias}, `;
				});
				aliases = aliases.slice(0, -2);
				embed.addField(`${prefix}${cmd.name} ${cmd.aliases.length > 0 ? `(${aliases})` : ''}`, cmd.description);
			}
		});

		if (custom_commands.length > 0) {
			let list = '';
			custom_commands.forEach(cmd => {
				list += `${prefix}${cmd.name}, `;
			});
			list = list.slice(0, -2);
			embed.addField('Custom Commands', `${list}`);
		}

		msg.channel.send({ embeds: [embed] });
	}
};