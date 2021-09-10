module.exports = {
	name: "emit_member_add",
	aliases: [],
	permission: "ADMINISTRATOR",
	description: "Emit a member add event",
	run(client, message) {
		client.emit("guildMemberAdd", message.member);
	}
};