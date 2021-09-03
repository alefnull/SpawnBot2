const { MessageEmbed } = require('discord.js');
const dfmt = require('../../lib/dfmt');
const { log, log_info, log_warn, log_error } = require('../../lib/log');

module.exports = {
	name: 'ping',
	description: 'Ping the bot.',
	aliases: ['latency', 'ms'],
	permissions: ['SEND_MESSAGES'],
	run(client, message, args) {
		const embed = new MessageEmbed()
			.setColor('#0000ee')
			.setTitle('Pong!')
			.setDescription(`${client.ws.ping}ms`)
		message.channel.send({ embeds: [embed] });
	},
};