const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'support',
	description: 'Sends a link to the support server.',
	emoji: '<:RaisedHand:852711951246819338>',
	execute(message, args) {
		const Support = new Discord.MessageEmbed()
			.setColor(config.theme)
			.setTitle('<:RaisedHand:852711951246819338> Support server')
			.setDescription(
				'**[Join the support server.](https://discord.gg/PKXXYP3xua)**'
			);
		message.channel.send(Support);
	},
};