module.exports = {
  name: 'emit_member_remove',
  aliases: [],
  permission: 'ADMINISTRATOR',
  description: 'Emit a member remove event',
  run(client, message) {
    client.emit('guildMemberRemove', message.member);
  }
};
