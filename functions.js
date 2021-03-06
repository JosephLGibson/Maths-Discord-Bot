module.exports = {
	constructCommandInfo: function (info, dir) {
		info.aliases.unshift(info.id)
		info.description.long = info.description.short + "\n" + info.description.extend
		info.description.args = info.args.map(item => item.id)
		if (dir.includes("/")) {
			info.category = dir.split("/").pop()
		} else {
			info.category = dir.split("\\").pop()
		}
		return info
	},
	getPing: function (str, guild) {
		if (str.match(/^<@(&|!?)\d{17,19}>$/)) {  // if it's already a ping
			return str
		}
		if (str.match(/^@?((h(ere)?)|(e(veryone)?))$/i)) {
			if (str.includes("h")) {
				return "@here"
			} else {
				return "@everyone"
			}
		}
		if (!guild) {return null}
		let members = guild.members.cache
		for (let member of members) {
			if (
				member[1].user.username.toLowerCase().includes(str.toLowerCase()) ||
				member[1].displayName.toLowerCase().includes(str.toLowerCase()) ||
				member[1].id == str
			) {
				return member[1]
			}
		}
		let roles = guild.roles.cache
		for (let role of roles) {
			if (
				role[1].name.toLowerCase().includes(str.toLowerCase()) ||
				role[1].id == str
			) {
				return role[1]
			}
		}
		return null
	},
	linkToMessage: function (link, guild) {
		link = link.split("/")
		if (link.length < 3) {
			return "Invalid link."
		}
		let [guildID, channelID, messageID] = link.slice(start=link.length - 3)
		if (guildID == guild.id) {
			let channel = guild.channels.resolve(channelID)
			if (channel) {
				let message = channel.messages.resolve(messageID)
				if (message) {
					return message
				} else {
					return "Message not found."
				}
			} else {
				return "Channel not found."
			}
		} else {
			return "Server ID does not match."
		}
	}
}
