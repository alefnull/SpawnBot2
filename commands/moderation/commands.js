const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../data/config.json');
const custom_json = JSON.parse(fs.readFileSync('./data/custom.json', 'utf8'));

module.exports = {
	// 'command' command
	// usage: !command add <command> <response> (adds a custom command and response)
	//      : !command remove <command> (removes a custom command)
	//      : !command list (lists all custom commands)
	name: 'commands',
	aliases: ['command', 'cmd', 'cmds', 'custom'],
	description: 'Manage custom commands',
	permission: 'SEND_MESSAGES',
	run(client, msg, args) {
		// set up the base embed
		const embed = new MessageEmbed()
			.setColor('#0000ee')
			.setTitle('Custom Commands');

		// check if the user has permission to use this command
		if (!msg.member.permissions.has(this.permission)) {
			embed.setDescription(`You do not have permission to use this command.`)
				.setColor('#ee0000');
			return msg.channel.send({ embeds: [embed] });
		}

		// check if the user has provided any arguments
		if (!args.length) {
			// check if the custom commands collection is empty
			if (client.custom_commands.size === 0) {
				embed.setDescription(`There are no custom commands in the collection.`)
					.setColor('#ee0000');
				return msg.channel.send({ embeds: [embed] });
			}

			// return a list of all the custom commands
			const list = [];
			for (const [command] of client.custom_commands) {
				list.push(`${command}`);
			}
			embed.setDescription(`\`${list.join(', ')}\``)
				.setColor('#0000ee');
			return msg.channel.send({ embeds: [embed] });
		}

		// vars: subcmd (the subcommand), custcmd (the custom command), resp (the response)
		const subcmd = args[0].toLowerCase();
		const custcmd = (args[1] || '').toLowerCase();
		const resp = args.slice(2).join(' ');

		// use switch statement to handle different commands
		switch (subcmd) {
			case 'add':
				// check if the user has specified a command and response
				if (!custcmd || !resp) {
					embed.setDescription(`Please specify a command and response to add.`)
						.setColor('#ee0000');
					return msg.channel.send({ embeds: [embed] });
				}

				// check if the command is already in the custom commands collection
				if (client.commands.has(custcmd) || client.custom_commands.has(custcmd)) {
					embed.setDescription(`The command \`${prefix}${custcmd}\` already exists.`)
						.setColor('#ee0000');
					return msg.channel.send({ embeds: [embed] });
				}

				// add the command and response to the custom commands collection
				client.custom_commands.set(custcmd, resp);

				// add the command and response to the custom.json file
				custom_json[custcmd] = resp;

				// save the custom commands collection to the file
				fs.writeFileSync('./data/custom.json', JSON.stringify(custom_json, null, 4));

				// send the success message
				embed.setDescription(`The command \`${custcmd}\` has been added to the custom commands list.`)
					.setColor('#00ee00');
				return msg.channel.send({ embeds: [embed] });

			case 'remove':
			case 'delete':
			case 'del':
				// check if the user has specified a command
				if (!custcmd) {
					embed.setDescription(`Please specify a command to remove.`)
						.setColor('#ee0000');
					return msg.channel.send({ embeds: [embed] });
				}

				// check if the command is in the custom commands collection
				if (!client.custom_commands.has(custcmd)) {
					embed.setDescription(`The command \`${custcmd}\` is not in the custom commands list.`)
						.setColor('#ee0000');
					return msg.channel.send({ embeds: [embed] });
				}

				// remove the command from the custom commands collection
				client.custom_commands.delete(custcmd);

				// remove the command from the custom.json file
				delete custom_json[custcmd];

				// save the custom commands collection to the file
				fs.writeFileSync('./data/custom.json', JSON.stringify(custom_json, null, 4));

				// send the success message
				embed.setDescription(`The command \`${custcmd}\` has been removed from the custom commands list.`)
					.setColor('#00ee00');
				return msg.channel.send({ embeds: [embed] });

			default:
				// check if the custom commands collection is empty
				if (client.custom_commands.size === 0) {
					embed.setDescription(`There are no custom commands in the list.`)
						.setColor('#ee0000');
					return msg.channel.send({ embeds: [embed] });
				}

				// return a list of all the custom commands
				const list = [];
				for (const [command] of client.custom_commands) {
					list.push(`${command}`);
				}
				embed.setDescription(`\`${list.join(', ')}\``)
					.setColor('#0000ee');
				return msg.channel.send({ embeds: [embed] });
		}
	}
};