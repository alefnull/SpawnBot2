const { MessageEmbed } = require('discord.js');
const { server_settings } = require('../../data/config.json');
const { blue, magenta } = require('chalk');
const { log_info } = require('../../lib/log');

module.exports = {
	name: 'guildMemberAdd',
	description: 'triggers when a new user joins the server',
	/**
	 * @param {Member} member
	 */
	run(member) {
		const server = server_settings[member.guild.name];

		// log the event to the console
		log_info(`${blue('[' + member.guild.name + ']')} ${magenta(member.user.tag)} has joined the server.`);

		// add the 'default' role to the new user (set role id in config.json)
		const default_role = server_settings[member.guild.name].default_role;
		const role = member.guild.roles.cache.find(r => r.name === default_role);
		member.roles.add(role);

		// build the welcome message embed
		const embed_role = new MessageEmbed()
			.setColor('#00b000')
			.setAuthor('WELCOME', member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`Welcome to ${member.guild.name}, ${member.user}!\nWe're now up to ${member.guild.memberCount} users!`);

		// send the welcome message to the welcome channel
		const welcome_channel = server_settings[member.guild.name].welcome_channel;
		member.guild.channels.cache.find(chan => chan.name === welcome_channel).send({ embeds: [embed_role] });

		// build the logging message embed
		const embed_log = new MessageEmbed()
			.setColor('#00b000')
			.setAuthor('NEW USER JOINED', member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`${member.user.username}#${member.user.discriminator} has joined ${member.guild.name}`);

		// send the logging message to the logging channel
		member.guild.channels.cache.find(chan => chan.name === server.logging_channel).send({ embeds: [embed_log] });
	}
};