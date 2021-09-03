const { MessageEmbed } = require('discord.js');

module.exports = {
	// 'lmgtfy' command
	// usage: !lmgtfy <search string> (returns a lmgtfy link for those who need one)
	name: 'lmgtfy',
	aliases: ['google', 'search'],
	description: 'Generates a lmgtfy link for those who need one.',
	permission: 'SEND_MESSAGES',
	run(client, msg, args) {
		// build the base embed
		const embed = new MessageEmbed()
			.setColor('#0000ee')
			.setTitle('Let Me Google That For You');

		// check if user provided a search string
		if (!args) {
			embed.setDescription('No search query provided.');
			return msg.channel.send({ embeds: [embed] });
		}

		// build the lmgtfy link
		const query = args.join(' ');
		const lmgtfy_link = `https://lmgtfy.com/?q=${encodeURIComponent(query)}`;

		// send the lmgtfy link to the channel
		embed.setURL(lmgtfy_link)
			.setDescription(`["${query}"](https://lmgtfy.com/?q=${encodeURIComponent(query)})`)
			.setThumbnail('https://lmgtfy.app/assets/SERP/lmgtfy_logo-b222a421fb6cf257985abfab188be7d6746866850efe2a800a3e57052e1a2411.png');
		msg.channel.send({ embeds: [embed] });
	}
}