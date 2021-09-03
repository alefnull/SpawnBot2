const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'about',
	aliases: ['info', 'readme', 'version', 'bot'],
	description: 'Displays information about the bot.',
	permission: 'SEND_MESSAGES',
	run(client, msg, args) {
		const alef = client.users.cache.find(m => m.id == '104285504828104704');
		const embed = new MessageEmbed()
			.setColor('#0000ee')
			.setTitle('SpawnBot2')
			.addFields({ name: 'Author', value: "[@alefnull](https://twitter.com/alefnull 'https://twitter.com/alefnull')", inline: true },
				{ name: 'Version', value: 'v1.0.0', inline: true },
				{ name: 'Git Repo', value: "[https://github.com/alefnull/SpawnBot2](https://github.com/alefnull/SpawnBot2 'https://github.com/alefnull/SpawnBot2')", inline: false })
			.setDescription("SpawnBot2 is a poor imitation of [@xwcg's](https://twitter.com/xwcg 'https://twitter.com/xwcg') original [SpawnBot](https://github.com/xwcg/SpawnBot 'https://github.com/xwcg/SpawnBot') (AKA Herobrine)." +
				"\n\nI began recreating it in order to learn node.js and discord.js (and to see how far GitHub Copilot could take me), and I hope to continue to improve upon it over time." +
				`\n\nIf you have any questions or suggestions, or find any bugs, please contact ${alef.tag} on discord or on twitter [@alefnull](https://twitter.com/alefnull 'https://twitter.com/alefnull').`)
			.setFooter('Made with ❤️ by @alefnull');
		msg.channel.send({ embeds: [embed] });
	}
}