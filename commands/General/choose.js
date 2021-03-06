const { Command } = require("discord-akairo")
const { constructCommandInfo } = require("../../functions.js")

const commandInfo = constructCommandInfo(
	{
		id: "choose",
		aliases: ["pick"],
		args: [{id: "options", type: "string", match: "content"}],
		description: {
			short: "Chooses one of the given options for you.",
			extend: "Options should be seperated by a semi-colon, like this: `option 1; option 2; option 3` etc.",
		}
	},
	 __dirname
)

class ChooseCommand extends Command {
	constructor() {
		super(
			commandInfo.id,
			commandInfo
		);
	}

	exec(message, args) {
		let options = args.options.split(";").map(item => item.trim());
		let fillers = ["I choose... ", "I'd go for", "Fate has spoken... It has chosen", "What about", "The best option is", "Obviously"]
		let d = 0;
		for (let i = 0; i < options.length + d; i++) {
			if (options[i - d] == "") {
				options.splice(i - d, 1);
				d ++;
			}
		}
		if (options.length == 0) {
			return message.reply("Something went wrong - options should be seperated by a semi-colon, like this: `option 1; option 2; option 3` etc.")
		} else {
			return message.reply([fillers, options].map(list => list[Math.floor(list.length * Math.random())]).join(" "));
		}
	}
}


module.exports = ChooseCommand;