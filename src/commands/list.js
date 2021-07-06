const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'list',
	description: 'Admin only command',
	adminOnly: true, 
	execute(message, args) {
		
			let clientGuilds = message.client.guilds.cache;
			let messageObj = Discord.Util.splitMessage(
				clientGuilds.map(g => g.id + ` | ` + g.name + ` | ` + g.members.cache.size) || 'None'
			);
			if (messageObj.length == 1) {
				message.channel.send(messageObj[0]);
			} else {
				for (i = 0; messageObj.length < i; i++) {
					message.channel.send(messageObj[i]);
				}
			}
		
	},
};