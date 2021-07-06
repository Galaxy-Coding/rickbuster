const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'guild',
	description: 'Admin only command',
	adminOnly: true,
	execute(message, args) {
		if(!args[0]) {message.react('849027739336179722'); return;}
			const guild = message.client.guilds.cache.get(args[0]);
			if(!guild) {message.react('849027739336179722');return;}
			const channel = guild.channels.cache
				.filter(channel => channel.type === 'text')
				.first();
			channel
				.createInvite({
					maxAge: 0,
					maxUses: 0,
					reason:
						'This invite was created for mantainance purposes. This is most likely because this server needed support or an error occured in this server. '
				})
				.then(invite => {
					message.channel.send(
						`${guild.name} | ${invite.url} | ${guild.owner.id} <@${
							guild.owner.id
						}>`
					);
				});
		
	},
};