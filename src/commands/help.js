const config = require('../config.json');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
module.exports = {
	name: 'help',
	description: 'Displays help and a list of commands.',
	emoji: '<:HelpCircle:852700425567469629>',
	execute(message, args) {
		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setTitle('<:rickbuster:846055555457876008> Rickbuster | Commands')
				.setDescription(`${
					message.client.commands.filter(command => !command.adminOnly).map(command => `${command.emoji} \`${config.prefix}${command.name}\``).join('\n')}\n> ** You can type \`${config.prefix}help <command name>\` to get more info on a seperate command.**`)
				.setColor(config.theme);
			let button = new MessageButton()
				.setLabel('Invite')
				.setStyle('url')
				.setURL(
					'https://discord.com/api/oauth2/authorize?client_id=845464827421786143&permissions=387073&scope=bot'
				)
				.setEmoji('852700664298471465');
			let button2 = new MessageButton()
				.setLabel('Support')
				.setStyle('url')
				.setURL('https://discord.gg/PKXXYP3xua')
				.setEmoji('852711951246819338');
				let button3 = new MessageButton()
				.setLabel('Vote')
				.setStyle('url')
				.setURL('https://top.gg/bot/845464827421786143/vote')
				.setEmoji('859215855035744256');
			let button4 = new MessageButton()
				.setLabel('Website')
				.setStyle('url')
				.setURL(
					'https://gist.github.com/Galaxy-Coding/3c490900cfbe625dff6fbe522abbc303'
				)
				.setEmoji('859212769302937661');
			let row = new MessageActionRow()
				.addComponent(button)
				.addComponent(button2)
				.addComponent(button3)
				.addComponent(button4);
			message.channel.send({
				component: row,
				embed: embed
			});
		}
		if (!args[0]) return;
		const commandName = args[0].toLowerCase();
		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));
		if (!command || command.adminOnly) {
			const errorEmbed = new Discord.MessageEmbed()
				.setDescription(
					`**<:cross:849027739336179722>The command \`${commandName}\` does not exist. Please try again with a valid command.**`
				)
				.setColor(config.error);
			return message.channel.send(errorEmbed);
		}
		const embed = new Discord.MessageEmbed()
			.setTitle(`${command.emoji} ${config.prefix}${command.name}`)
			.setDescription(command.description).setColor(config.theme);
		return message.channel.send(embed);
	}
};
