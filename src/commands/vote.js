const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'vote',
	description: 'Sends instrcutions how to bump the bot. ',
	emoji: '<:Up:859215855035744256>',
	execute(message, args) {
		const Bump = new Discord.MessageEmbed()
			.setColor(config.theme)
			.setTitle('<:Up:859215855035744256> Bot voting link')
			.setDescription(
				'**[Click here to vote for the bot.](https://top.gg/bot/845464827421786143/vote)** Votes are really appreciated. '
			);
		message.channel.send(Bump);
	},
};