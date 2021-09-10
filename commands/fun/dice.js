const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../data/config.json');

module.exports = {
	// 'dice' command
	// usage: !dice <number> (rolls a die with <number> sides)
	//      : !dice <number>d<number> (rolls <number> dice with <number> sides)
	//      : !coin | !flip (flips a coin)
	//      : !coin <number> | !flip <number> (flips <number> coins)
	name: 'dice',
	aliases: ['roll', 'flip', 'coin'],
	description: 'Roll dice / Flip a coin',
	permission: 'SEND_MESSAGES',
	run(client, msg, args) {

		// build the base embed
		const embed = new MessageEmbed()
			.setAuthor(msg.author.username, msg.author.displayAvatarURL());

		// get command name
		const cmd = msg.content.slice(prefix.length).split(/ +/)[0];

		// check if the user has permission to use this command
		if (!msg.member.permissions.has(this.permission)) {
			embed.setTitle('Dice Roller')
				.setColor('#ee0000')
				.setDescription(`You do not have permission to use this command.`);
			return msg.channel.send({ embeds: [embed] });
		}

		// check if the user used the 'coin' or 'flip' alias
		if ( cmd === 'coin' || cmd === 'flip') {

			embed.setTitle('Coin Flipper');

			// check if the user specified a number of flips, otherwise default to 1
			let flips = args[0] ? parseInt(args[0]) : 1;

			// check if the number of flips is valid
			if (isNaN(flips) || flips < 1 || flips > 100) {
				embed.setColor('#ee0000')
					.setDescription(`Invalid number of flips.`);
				return msg.channel.send({ embeds: [embed] });
			}

			// create an array of the results of the flips
			let results = [];

			// loop through the number of flips
			for (let i = 0; i < flips; i++) {

				// add the result of the flip to the results array
				results.push(Math.random() < 0.5 ? 'Heads' : 'Tails');
			}

			// send the results of the flips
			embed.setColor('#0000ee')
				.setDescription(`${msg.author.username} flipped ${flips} coin${flips > 1 ? 's' : ''} and got:\n\n**${results.join(', ')}**`);
			return msg.channel.send({ embeds: [embed] });
		}

		// check if the user specified arguments
		if (!args[0]) {
			embed.setTitle('Dice Roller')
				.setColor('#ee0000')
				.setDescription(`You must specify which dice to roll. (e.g. '2d6' for two six-sided dice, or '10' for a single ten-sided die.)`);
			return msg.channel.send({ embeds: [embed] });
		}

		// check if the user wanted to roll dice (format <number>d<sides> OR <sides> for just 1 die)
		if (args[0].match(/^(\d+)d(\d+)$/)) {
			// get the number of dice and the number of sides
			let num = parseInt(args[0].match(/^(\d+)d(\d+)$/)[1]);
			let sides = parseInt(args[0].match(/^(\d+)d(\d+)$/)[2]);
			// check if the number of dice is valid
			if (isNaN(num) || num < 1 || num > 100) {
				embed.setTitle('Dice Roller')
				    .setColor('#ee0000')
					.setDescription(`Invalid number of dice.`);
				return msg.channel.send({ embeds: [embed] });
			}
			// check if the number of sides is valid
			if (isNaN(sides) || sides < 2 || sides > 100) {
				embed.setTitle('Dice Roller')
					.setColor('#ee0000')
					.setDescription(`Invalid number of sides.`);
				return msg.channel.send({ embeds: [embed] });
			}
			// create an array of the results of the rolls
			let results = [];
			// loop through the number of dice
			for (let i = 0; i < num; i++) {
				// add the result of the roll to the results array
				results.push(Math.floor(Math.random() * sides) + 1);
			}
			// send the results of the rolls
			embed.setTitle('Dice Roller')
				.setColor('#0000ee')
				.setDescription(`${msg.author.username} rolled ${num} ${sides}-sided ${num > 1 ? 'dice' : 'die'} and got:\n\n**${results.join(', ')}**`);
			return msg.channel.send({ embeds: [embed] });
		}
		// check if the user wanted to roll a single die (format <sides>)
		if (args[0].match(/^(\d+)$/)) {
			// get the number of sides
			let sides = parseInt(args[0].match(/^(\d+)$/)[1]);
			// check if the number of sides is valid
			if (isNaN(sides) || sides < 2 || sides > 100) {
				embed.setTitle('Dice Roller')
					.setColor('#ee0000')
					.setDescription(`Invalid number of sides.`);
				return msg.channel.send({ embeds: [embed] });
			}
			// send the result of the roll
			embed.setTitle('Dice Roller')
				.setColor('#0000ee')
				.setDescription(`${msg.author.username} rolled 1 ${sides}-sided die and got:\n\n**${Math.floor(Math.random() * sides) + 1}**`);
			return msg.channel.send({ embeds: [embed] });
		}
	}
};