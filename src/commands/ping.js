const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	aliases: ['latency', 'test'],
	description: 'This command gets the bot latency.',
	emoji: '<:download:859200375327293440>',
	execute(message, args) {
		const Ping = new Discord.MessageEmbed()
			.setColor(config.theme)
			.setTitle('Ping')
			.addFields(
				{
					name: 'Bot',
					value: `${Date.now() - message.createdTimestamp} ms`,
					inline: true
				},
				{ name: 'API', value: `${Math.round(message.client.ws.ping)} ms`, inline: true }
			)
			.setTimestamp();
		
		message.channel.send(`<a:loading:848925761137147956>
`).then(msg => {
			setTimeout(function() {
				msg.edit('',Ping);
			}, 100);
		});
	}
};
