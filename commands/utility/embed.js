const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    aliases: [],
    description: 'Display a test embed',
    permission: 'SEND_MESSAGES',
    async run(client, msg) {
        const embed = new MessageEmbed();
        const twitter_link = 'https://twitter.com/alefnull';
        embed.setTitle('This is an embed title')
            .setURL(twitter_link)
            .setAuthor(msg.author.username, msg.author.avatarURL({ dynamic: true }), twitter_link)
            .setDescription('This is an embed description')
            .setFooter('This is an embed footer', twitter_link)
            .setColor('#0000ee')
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(msg.createdTimestamp)
            .setImage('https://placekitten.com/200/300')
            .addFields({
                name: 'This is a custom field',
                value: 'This is a custom field value',
                inline: true
            });
        msg.channel.send({ embeds: [embed] });
    }
};