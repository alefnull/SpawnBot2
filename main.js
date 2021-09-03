const { Client, Collection } = require('discord.js');
const { token, username } = require('./data/config.json');

// https://ziad87.net/intents/ to calculate intents
const client = new Client({ intents: 13895 });
module.exports = client;

// clear console
console.clear();

// create collections for commands and custom commands
client.commands = new Collection();
client.custom_commands = new Collection();

// run command and event handlers
['commands', 'events'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// log the bot into discord
client.login(token);
