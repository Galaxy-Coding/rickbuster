const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'log',
	description: 'This will explain how to log rickrolls.',
	emoji: '<:Bell:852705314368258078>',
	execute(message, args) {
		let logChannelCommand = message.guild.channels.cache
			.filter(c => c.type == 'text')
			.find(channel => channel.name === 'rick-logs');
		if (logChannelCommand) {
			const Log = new Discord.MessageEmbed()
				.setColor(config.theme)
				.setDescription(`The current log channel is <#${logChannelCommand.id}>`)
				.setTitle('<:Bell:852705314368258078> Log channel');
			message.channel.send(Log);
		} else {
			const Log = new Discord.MessageEmbed()
				.setColor(theme)
				.setTitle('<:Bell:852705314368258078> Log channel')
				.setDescription(
					`There currently is no log channel in this server. This is how to make a log channel: Make a channel called \`rick-logs\`. If you name that channel anything else, the bot won’t log messages there, so be careful. Makes sure the bot has permissions to talk in that channel. You can also rename an old channel to \`rick-logs\`.`
				);
			message.channel.send(Log);
		}
	},
};