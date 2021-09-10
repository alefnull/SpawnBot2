module.exports = {
	name: 'hello',
	aliases: ['hi', 'hey'],
	description: 'Say Hello',
	permission: 'SEND_MESSAGES',
	run(client, msg) {
		msg.reply(`Hello, ${msg.author.username}!`);
	}
};