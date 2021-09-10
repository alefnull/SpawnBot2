const { MessageEmbed } = require('discord.js');
const { server_settings } = require('../../data/config.json');
const { blue, magenta } = require('chalk');
const { log_info } = require('../../lib/log');

module.exports = {
	name: 'guildMemberRemove',
	description: 'triggers when a new user leaves the server',
	/**
	 * @param {Member} member
	 */
	run(member) {
		const server = server_settings[member.guild.name];

		// log the event to the console
		log_info(`${blue('[' + member.guild.name + ']')} ${magenta(member.user.tag)} has left the server.`);

		const embed_log = new MessageEmbed()
			.setColor('#b00000')
			.setAuthor('USER LEFT', member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`${member.user.username}#${member.user.discriminator} left ${member.guild.name}`);

		member.guild.channels.cache.find(chan => chan.name === server.logging_channel).send({ embeds: [embed_log] });
	}
};