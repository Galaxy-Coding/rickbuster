const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'invite',
	description: 'If you can\'t find an invite to the bot, us this command.',
	emoji:  '<:PlusCircle:852700664298471465>',
	execute(message, args) {
		const Invite = new Discord.MessageEmbed()
			.setColor(config.theme)
			.setTitle('<:PlusCircle:852700664298471465> Bot Invite')
			.setDescription(
				'**[Click here to invite the bot.](https://discord.com/api/oauth2/authorize?client_id=845464827421786143&permissions=387073&scope=bot)**'
			);
		message.channel.send(Invite);
	},
};