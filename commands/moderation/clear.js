const { MessageEmbed } = require('discord.js');

module.exports = {
    // 'clear' command
    // usage: !clear <number> (deletes the last <number> messages, including the command message)
    //      : !clear (deletes the last 2 messages - the command message and the one before)
    name: 'clear',
    aliases: ['purge', 'prune', 'delete'],
    description: 'Delete the last X messages (Includes command trigger message, default 2)',
    permission: 'MANAGE_MESSAGES',
    async run(client, msg, args) {

        // build the base embed
        const embed = new MessageEmbed()
            .setColor('#0000ee')
            .setTitle('Clear Messages');

        // get the amount of messages to delete, defaulting to 10
        const amount = (parseInt(args[0])) || 1;

        // can't clear more than 100 or less than 1
        if (amount > 99) {
            embed.setDescription('You can\'t delete more than 99 messages at once.');
            return msg.channel.send({ embeds: [embed] });
        } else if (amount < 1) {
            embed.setDescription('You can\'t delete less than 1 message.');
            return msg.channel.send({ embeds: [embed] });
        }

        // delete 'amount' messages
        msg.channel.bulkDelete(amount + 1);

        // send a confirmation message
        embed.setDescription(`Successfully deleted ${amount} messages.`);
        const m = await msg.channel.send({ embeds: [embed] });

        // delete the confirmation message after 3 seconds
        setTimeout(() => m.delete(), 3000);
    }
};