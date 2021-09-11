const fs = require('fs');
const { blue, magenta, yellow } = require('chalk');
const { MessageEmbed } = require('discord.js');
const { log_warn } = require('../../lib/log');
const config = JSON.parse(fs.readFileSync('./data/config.json', 'utf8'));

module.exports = {
    // 'channels' command
    // usage: !channels (print whether channel restrictions are enabled)
    //      : !channels enable (enable channel restrictions)
    //      : !channels disable (disable channel restrictions)
    //      : !channels add <channel> (add a channel to the list of allowed channels)
    //      : !channels remove <channel> (remove a channel from the list of allowed channels)
    //      : !channels list (list all allowed channels)
    name: 'channels',
    aliases: ['channel', 'chan'],
    description: 'Manage bot channel access',
    permission: 'ADMINISTRATOR',
    run(client, msg, args) {
        const server = config.server_settings[msg.guild.name];

        // set up the base embed
        const embed = new MessageEmbed()
            .setColor('#0000ee')
            .setTitle('Channel Access');

        // check if the user has permission to use this command
        if (!msg.member.permissions.has(this.permission)) {
            embed.setDescription('You do not have permission to use this command.')
                .setColor('#ee0000');
            log_warn(`${blue('[' + msg.guild.name + ']')} ${magenta(msg.author.tag)} tried to use the ${yellow(this.name)} command without permission.`);
            return msg.channel.send({ embeds: [embed] });
        }

        // check if the user has specified a command
        if (!args.length) {
            if (server.channel_restrictions) {
                embed.setDescription('Channel restrictions are enabled.')
                    .setColor('#ee0000');
            } else {
                embed.setDescription('Channel restrictions are disabled.')
                    .setColor('#00ee00');
            }
            return msg.channel.send({ embeds: [embed] });
        }

        // vars: subcmd (the subcommand), channel (the channel to add or remove)
        let subcmd = args[0].toLowerCase();
        let channel = args[1];

        // use switch statement to handle different commands
        switch (subcmd) {
        case 'enable':
            // check if the channel restrictions are already enabled
            if (server.channel_restrictions) {
                embed.setDescription('Channel restrictions are already enabled.');
                return msg.channel.send({ embeds: [embed] });
            }

            // enable channel restrictions
            server.channel_restrictions = true;

            // save the new channel restrictions setting
            fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4));

            // send a message to the channel
            embed.setDescription('Channel restrictions have been enabled.');
            return msg.channel.send({ embeds: [embed] });

        case 'disable':
            // check if the channel restrictions are already disabled
            if (!server.channel_restrictions) {
                embed.setDescription('Channel restrictions are already disabled.');
                return msg.channel.send({ embeds: [embed] });
            }

            // disable channel restrictions
            server.channel_restrictions = false;

            // save the new channel restrictions setting
            fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4));

            // send a message to the channel
            embed.setDescription('Channel restrictions have been disabled.');
            return msg.channel.send({ embeds: [embed] });

        case 'add':
            // check if the user has specified a channel
            if (!channel) {
                embed.setDescription('Please specify a channel.');
                return msg.channel.send({ embeds: [embed] });
            }

            // check if the channel is already in the list of allowed channels
            if (server.allowed_channels[msg.guild.name].includes(channel)) {
                embed.setDescription(`\`${channel}\` is already in the list of allowed channels.`);
                return msg.channel.send({ embeds: [embed] });
            }

            // add the channel to the list of allowed channels
            server.allowed_channels[msg.guild.name].push(channel);

            // save the new list of allowed channels
            fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4));

            // send a message to the channel
            embed.setDescription(`\`${channel}\` has been added to the list of allowed channels.`);
            return msg.channel.send({ embeds: [embed] });

        case 'remove':
            // check if the user has specified a channel
            if (!channel) {
                embed.setDescription('Please specify a channel.');
                return msg.channel.send({ embeds: [embed] });
            }

            // check if the channel is not in the list of allowed channels
            if (!server.allowed_channels[msg.guild.name].includes(channel)) {
                embed.setDescription(`\`${channel}\` is not in the list of allowed channels.`);
                return msg.channel.send({ embeds: [embed] });
            }

            // remove the channel from the list of allowed channels
            server.allowed_channels[msg.guild.name].splice(server.allowed_channels[msg.guild.name].indexOf(channel), 1);

            // save the new list of allowed channels
            fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4));

            // send a message to the channel
            embed.setDescription(`\`${channel}\` has been removed from the list of allowed channels.`);
            return msg.channel.send({ embeds: [embed] });

        case 'list': {
            // check if the list of allowed channels is empty
            if (server.allowed_channels[msg.guild.name].length === 0) {
                embed.setDescription('There are no allowed channels.');
                return msg.channel.send({ embeds: [embed] });
            }

            // create a string of all allowed channels
            let channel_list = '';
            for (let i = 0; i < server.allowed_channels[msg.guild.name].length; i++) {
                channel_list += '#' + config.allowed_channels[msg.guild.name][i] + ', ';
            }

            // remove the last comma and space from the string
            channel_list = channel_list.slice(0, -2);

            // send a message to the channel
            embed.setDescription(`The only ***${msg.guild.name}*** channels I'm currently allowed to speak in are:\n\`${channel_list}\``);
            return msg.channel.send({ embeds: [embed] });
        }

        default:
            embed.setDescription('Please specify a valid sub-command.')
                .setColor('#ee0000');
            return msg.channel.send({ embeds: [embed] });
        }
    }
};