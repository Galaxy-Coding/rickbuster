const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'info',
	description: 'Shows all bot info.',
	emoji: '<:Pin:852710125562626078>',
	execute(message, args) {
		const Info = new Discord.MessageEmbed()
			.setColor(config.theme)
			.setTitle('<:Pin:852710125562626078> Bot Info')
			.addFields(
				{
					name: 'Bot Dev',
					value: `galaxy#4815 <@706948500197212240>`,
					inline: true
				},
				{
					name: 'Server Count',
					value: `${message.client.guilds.cache.size} servers`,
					inline: true
				},
				{
					name: 'Users',
					value: `${message.client.users.cache.size} users`,
					inline: true
				},
				{
					name: 'Mention',
					value: `<@${message.client.user.id}>`,
					inline: true
				},
				{
					name: 'Name',
					value: `${message.client.user.tag}`,
					inline: true
				},
				{
					name: 'ID',
					value: `${message.client.user.id}`,
					inline: true
				},
				{
					name: 'Prefix',
					value: '`x!`',
					inline: true
				},
				{
					name: 'Bot Website',
					value: `[Read the docs](https://gist.github.com/Galaxy-Coding/3c490900cfbe625dff6fbe522abbc303)`,
					inline: true
				},
				{
					name: 'Bot Invite',
					value: `[Invite the bot](https://discord.com/api/oauth2/authorize?client_id=845464827421786143&permissions=387073&scope=bot)`,
					inline: true
				},
				{
					name: 'Bot Demo video',
					value: `[Watch the video](https://vimeo.com/554085074)`,
					inline: true
				},
				{
					name: 'Support server',
					value: `[Join the server](https://discord.gg/PKXXYP3xua)`,
					inline: true
				},
				{
					name: 'top.gg',
					value: `[Bump the bot](https://top.gg/bot/845464827421786143)`,
					inline: true
				}
			)
			.setThumbnail(
				message.client.user.displayAvatarURL({
					dynamic: true
				})
			);
		message.channel.send(Info);
	},
};