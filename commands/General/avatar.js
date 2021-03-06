const { Command } = require("discord-akairo")
const Discord = require("discord.js")
const { constructCommandInfo } = require("../../functions.js")

const commandInfo = constructCommandInfo(
	{
		id: "avatar",
		aliases: ["pic"],
		args: [{id: "member", type: "member"}],
		description: {
			short: "Shows avatar of selected user.",
			extend: "If no user is given, it shows the avatar of the user who called the command.",
		}
	},
	 __dirname
)

class AvatarCommand extends Command {
	constructor() {
		super(
			commandInfo.id,
			commandInfo
		);
	}

	exec(message, args) {
		let desc;
		if (message.content.split(" ").length == 1) {
			args.member = message.member
			desc = "No user was given, so showing your avatar:";
		} else {
			desc = `Showing ${args.member}'s avatar:`;
		}
		if (args.member) {
			return message.channel.send(new Discord.MessageEmbed()
				.setDescription(desc)
				.setColor(16426522)
				.setImage(args.member.user.avatarURL()));
		} else {
			return message.reply("Sorry, couldn't find that user.")
		}
	}
}

module.exports = AvatarCommand;
