const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping the bot.',
    aliases: ['latency', 'ms'],
    permissions: ['SEND_MESSAGES'],
    run(client, message) {
        const embed = new MessageEmbed()
            .setColor('#0000ee')
            .setTitle('Pong!')
            .setDescription(`${client.ws.ping}ms`);
        message.channel.send({ embeds: [embed] });
    },
};