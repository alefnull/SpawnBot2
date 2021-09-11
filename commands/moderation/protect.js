const { MessageEmbed } = require('discord.js');
const { server_settings } = require('../../data/config.json');
const { channels } = require('../../main');

module.exports = {
	// use: !protect <type> <enable/disable>
	name: 'protect',
	aliases: ['protection', 'protections'],
	description: 'Manages channel/server protections.',
	permission: 'ADMINISTRATOR',
	run(client, message, args) {
	// 	const protections = server_settings[message.guild.name].protections;
		const embed = new MessageEmbed()
			.setColor('#0000ee')
			.setTitle('Channel Protections');

		embed.setDescription('This feature is currently in developmemnt.');
		message.channel.send({ embeds: [embed] });

	// 	if (args.length < 2) {
	// 		embed.setDescription('Usage: `!protect <type> <enable/disable>`');
	// 		return message.channel.send(embed);
	// 	}

	// 	const type = args[0].toLowerCase();
	// 	const action = args[1].toLowerCase();

	// 	if (type === 'caps') {
	// 		if (action === 'enable') {
	// 			protections.caps.active = true;
	// 			embed.setDescription('Caps protection is now enabled.');
	// 		} else if (action === 'disable') {
	// 			protections.caps.active = false;
	// 			embed.setDescription('Caps protection is now disabled.');
	// 		} else {
	// 			embed.setDescription('Usage: `!protect <type> <enable/disable>`');
	// 		}
	// 	}
	}
};