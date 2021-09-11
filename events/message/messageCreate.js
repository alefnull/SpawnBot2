const { magenta, yellow, blue, red } = require('chalk');
const { MessageEmbed } = require('discord.js');
const { prefix, server_settings } = require('../../data/config.json');
const { log_info, log_error } = require('../../lib/log');

module.exports = {
  name: 'messageCreate',
  description: 'triggered every time a message is sent in a channel',
  async run(message, client) {
    const server = server_settings[message.guild.name];
    // make sure we're only monitoring one of the active servers from config.json
    if (!server_settings[message.guild.name].active) {
      return;
    }

    // make sure channel restrictions are disabled or the message is from an allowed channel
    if (server.channel_restrictions) {
      if (!server.allowed_channels.includes(message.channel.name)) {
        return;
      }
    }

    // ignore self
    if (message.author.bot) {
      return;
    }

    // check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) {
      // deal with non-commands
      return;
    }

    // get the args from the message
    const args = message.content.slice(prefix.length).split(/ +/);

    // get the command
    const cmd_name = args.shift().toLowerCase();
    let command =
      client.commands.get(cmd_name) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmd_name));
    const custom_command_response = client.custom_commands.get(cmd_name);

    // if it's a custom command, return the response
    if (custom_command_response) {
      const embed = new MessageEmbed().setColor('#0000ee').setDescription(custom_command_response);
      log_info(
        `${blue('[' + message.guild.name + ']')} ${magenta(message.author.tag)} ran the ${blue(
          'custom command'
        )}: ${yellow(cmd_name)}.`
      );
      return message.channel.send({ embeds: [embed] });
    }

    // if the command doesn't exist, return
    if (!command) {
      return;
    }

    // check for command permissions
    if (command.permissions) {
      // if the author doesn't have the required permissions, return and send a message
      const author_permissions = message.channel.permissionsFor(message.author);
      if (!author_permissions || !author_permissions.has(command.permissions)) {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Missing Permissions')
          .setDescription(
            `You need the following permissions to use this command: \`${command.permissions}\``
          );
        const msg = await message.channel.send({ embeds: [embed] });
        setTimeout(() => {
          msg.delete();
        }, 3000);
      }
    }

    // run the command, catch any errors
    try {
      log_info(
        `${blue('[' + message.guild.name + ']')} ${magenta(message.author.tag)} ran the ${blue(
          'command'
        )}: ${yellow(command.name)}.`
      );
      command.run(client, message, args); // <-- ORDER MATTERS IN OTHER PLACES
    } catch (error) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription(`An error occurred:\n\`${error.name}\n${error.message}\``);
      log_error(error.name + ': ' + red(error.message) + ' ::\n' + red(error.stack));
      message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 3000);
      });
    }
  }
};
