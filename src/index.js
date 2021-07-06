require('./server.js');
const config = require('./config.json');
const prefix = config.prefix;
require('dotenv').config()
const youtubeData = require('./youtube.json');
const getUrls = require('get-urls');
const axios = require('axios');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
let i;
const commandFiles = fs
	.readdirSync('src/commands')
	.filter(file => file.endsWith('.js'))
	.filter(file => !file.startsWith('.'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
const disbut = require('discord-buttons');
disbut(client);

const { MessageButton, MessageActionRow } = require('discord-buttons');
function clean(text) {
	if (typeof text === 'string')
		return text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	else return text;
}
/*
client
  .on("debug", console.log)
  .on("warn", console.log)
  */
client.once('ready', () => {
	client.channels.cache.get('846119805064708096').send('Log-on success!');
	console.log('Bot working!');
	client.user.setPresence({
		activity: {
			type: 'PLAYING',
			name: config.playing
		},
		status: config.status
	});
});

client.on('guildCreate', guild => {
	client.channels.cache
		.get('846119832310513694')
		.send(
			`**Joined ${guild.name} | ${guild.id}**\n**Owner ID:** ${
				guild.ownerID
			}\n**Member Count:** ${guild.memberCount}\n**Guild count:** ${
				client.guilds.cache.size
			}`
		);
	client.channels.cache
		.get('848601669263818773')
		.setName('# ' + client.guilds.cache.size);
});

client.on('guildDelete', guild => {
	client.channels.cache
		.get('846119856692789288')
		.send(
			`**Left ${guild.name} | ${guild.id}**\n**Owner ID:** ${
				guild.ownerID
			}\n**Member Count:** ${guild.memberCount}`
		);
	client.channels.cache
		.get('848601669263818773')
		.setName('# ' + client.guilds.cache.size);
});

client.on('clickButton', button => {
	if (button.id === `report`) {
		if (button.clicker.member.hasPermission('MANAGE_SERVER')) {
			const embedNotif = new Discord.MessageEmbed()
				.setColor(config.theme)
				.setTitle(
					'<:DoubleCheckmark:852723666822758440> False rickroll positive reported'
				)
				.setDescription(
					'Thank you for the report. Just keep in mind, multiple false reports can lead to a blacklist. '
				);
			const prev = button.message.embeds[0].description;
			const Dembed = new Discord.MessageEmbed()
				.setTitle('Rickroll deleted')
				.setColor('#2f3136')
				.setTimestamp()
				.setDescription(prev);
			button.message.edit({
				component: null,
				embed: Dembed
			});
			button.reply.send('', {
				embed: embedNotif,
				ephemeral: true
			});
			const embed = new Discord.MessageEmbed()
				.setColor(config.theme)
				.setTitle('False positive')
				.setDescription(
					`<:Person:852720773840109610> **Reporter:** ${
						button.clicker.user.id
					} <@${
						button.clicker.user.id
					}>\n<:Box:852722348289163325> **Server:** ${button.guild.name} | ${
						button.guild.id
					}\n${button.message.embeds[0].description}`
				);

			client.channels.cache.get('847253091861921802').send(embed);
		} else {
			const embedNotif = new Discord.MessageEmbed()
				.setColor(config.theme)
				.setTitle('<:WarningCircle:852723820469289001> Report failed')
				.setDescription(
					`You need to have the manage messages permission in <#${
						mesage.button.channel.id
					}> to report a false rickroll positive!`
				);
			button.reply.send('', {
				embed: embedNotif,
				ephemeral: true
			});
		}
	} else if (button.id.startsWith(`rr_botupdate`)) {
		button.clicker.member.roles.add(role.botupdate);
		if (button.clicker.member.roles.cache.has(role.botupdate)) {
			button.clicker.member.roles.remove(role.botupdate);
			button.reply.send(`I removed you the role <@&${role.botupdate}>`, true);
		} else {
			button.clicker.member.roles.add(role.botupdate);
			button.reply.send(`I gave you the role <@&${role.botupdate}>`, true);
		}
	} else if (button.id.startsWith(`rr_poll`)) {
		role.poll;
		button.clicker.member.roles.add(role.poll);
		if (button.clicker.member.roles.cache.has(role.poll)) {
			button.clicker.member.roles.remove(role.poll);
			button.reply.send(`I removed you the role <@&${role.poll}>`, true);
		} else {
			button.clicker.member.roles.add(role.poll);
			button.reply.send(`I gave you the role <@&${role.poll}>`, true);
		}
	} else if (button.id.startsWith(`rr_status`)) {
		if (button.clicker.member.roles.cache.has(role.status)) {
		}
		button.clicker.member.roles.add(role.status);
		if (button.clicker.member.roles.cache.has(role.status)) {
			button.clicker.member.roles.remove(role.status);
			button.reply.send(`I removed you the role <@&${role.status}>`, true);
		} else {
			button.clicker.member.roles.add(role.status);
			button.reply.send(`I gave you the role <@&${role.status}>`, true);
		}
	}
});

client.on('message', message => {
	if (message.channel.type == 'dm') return;
	if (message.author.bot) return;
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();
	if (message.content.startsWith(`${prefix}eval`)) {
		if (message.author.id === '706948500197212240') {
			try {
				const code = args.join(' ');
				let evaled = eval(code);

				if (typeof evaled !== 'string')
					evaled = require('util').inspect(evaled);
				const evalEmbed = new Discord.MessageEmbed()
					.setTitle('Eval')
					.setDescription(
						`**Input:**\`\`\`xl\n${code}\`\`\`\n**Output:**\`\`\`xl\n${evaled}\`\`\``
					)
					.setColor(config.success);
				message.channel.send(evalEmbed);
			} catch (err) {
				message.react('858457517965180988');
				const code = args.join(' ');
				const errEmbed = new Discord.MessageEmbed()
					.setTitle('Error')
					.setDescription(
						`**Input:**\`\`\`xl\n${code}\`\`\`\n**Output:**\`\`\`xl\n${err}\`\`\``
					)
					.setColor(config.error);
				message.channel.send(errEmbed);
			}
		} else {
			message.react('849027739336179722');
		}
	}
	// Suggestion and bug report reactions
	if (
		message.channel.id === '846048807543504915' ||
		message.channel.id === '846048807543504916'
	) {
		message
			.react('848926275808919583')
			.then(() => message.react('848926439163559987'))
			.catch(error =>
				console.error('One of the emojis failed to react:', error)
			);
	}
	// FAQ channel
	if (message.channel.id === '846048807543504908') {
		message.channel.send(message.content);
		message.delete();
	}
	//Ping galaxy status reaction
	if (
		message.mentions.members.has('706948500197212240') &&
		message.guild == '846048806999162911'
	) {
		if (message.author.id == '706948500197212240') return;
		const user = client.users.cache.get('706948500197212240');
		if (user.presence.status == 'online') {
			message.react('848679999749619732');
		} else if (user.presence.status == 'idle') {
			message.react('848679999539118121');
		} else if (user.presence.status == 'dnd') {
			message.react('848679999442911243');
		} else if (user.presence.status == 'offline') {
			message.react('848680357414699039');
		}
	}
	let urlSet = getUrls(message.content);
	let urlArray = {};
	urlArray = [...urlSet];
	if (urlArray.length <= 0) {
		// Do nothing
	}
	for (i = 0; i < urlArray.length; i++) {
		axios.get(urlArray[i]).then(function(response) {
			let URL = response.request.res.responseUrl;
			for (i = 0; i <= youtubeData.length; i++) {
				if (URL.includes(youtubeData[i])) {
					if (
						message.guild.me
							.permissionsIn(message.channel)
							.has('MANAGE_MESSAGES')
					) {
						message.delete();
						const GlobalLogEmbed = new Discord.MessageEmbed()
							.setTitle(`<:trash:852700158969118760> Attempted rickroll`)
							.setDescription(
								`<:channel:841469338774929408> **Channel:** <#${
									message.channel.id
								}>\n**User:** ${message.author.tag} | <@${
									message.author.id
								}> | ${
									message.author.id
								}\n<:Box:852722348289163325> **Server:** ${
									message.guild.name
								} | ${
									message.guild.id
								}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
									message.content
								)}\`\`\``
							)
							.setColor(config.theme)
							.setTimestamp();
						client.channels.cache
							.get('846119889160503386')
							.send(GlobalLogEmbed);
						const RickWarning = new Discord.MessageEmbed()
							.setTitle(
								`<:trash:852700158969118760> Your message has been deleted because it had a potential rickroll!`
							)
							.setDescription(
								`<:channel:841469338774929408> **Channel:** <#${
									message.channel.id
								}>\n<:Box:852722348289163325> **Server:** ${
									message.guild.name
								} | ${
									message.guild.id
								}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
									message.content
								)}\`\`\``
							)
							.setColor(config.theme)
							.setTimestamp();
						message.author.send(RickWarning);
						let logChannel = message.guild.channels.cache
							.filter(c => c.type == 'text')
							.find(channel => channel.name === 'rick-logs');
						if (logChannel) {
							let button = new MessageButton()
								.setStyle('grey')
								.setLabel('Report false rickroll positive')
								.setEmoji('852719363256614982')
								.setID('report');

							const LogEmbed = new Discord.MessageEmbed()
								.setTitle(`<:trash:852700158969118760> Rickroll deleted`)
								.setDescription(
									`<:channel:841469338774929408> **Channel:** <#${
										message.channel.id
									}>\n<:Person:852720773840109610> **User:** ${
										message.author.tag
									} | <@${message.author.id}> | ${
										message.author.id
									}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
										message.content
									)}\`\`\``
								)
								.setColor(config.theme)
								.setTimestamp();
							logChannel.send('', {
								component: button,
								embed: LogEmbed
							});
						}
					} else {
					}
				}
			}
		});
	}
	if (!message.content.startsWith(prefix)) return;
	if (!client.commands.has(commandName)) return;
	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);
	if (!command) return;
	if (command.adminOnly) {
		if (message.author.id === '706948500197212240') {
		} else {
			message.react('849027739336179722');
			return;
		}
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.react('858457517965180988');
		const webhookClient = new Discord.WebhookClient(
			'857408251213512714',
			'el55bKxCFVczMh0JUsZkHnc32AKQIrywm6A4rWBMUEMdL-iIBuZ5Xrki12i31_giyqKi'
		);
		webhookClient.send(error);
		const embed = new Discord.MessageEmbed()
			.setDescription(
				'**<:cross:849027739336179722> Something went wrong. Please join the [support server](https://discord.gg/PKXXYP3xua)**'
			)
			.setColor(config.error);
		message.channel.send(embed);
	}
});

client.on('messageUpdate', (oldMessage,message) => {
	let urlSet = getUrls(message.content);
	let urlArray = {};
	urlArray = [...urlSet];
	if (urlArray.length <= 0) {
		// Do nothing
	}
	for (i = 0; i < urlArray.length; i++) {
		axios.get(urlArray[i]).then(function(response) {
			let URL = response.request.res.responseUrl;
			for (i = 0; i <= youtubeData.length; i++) {
				if (URL.includes(youtubeData[i])) {
					if (
						message.guild.me
							.permissionsIn(message.channel)
							.has('MANAGE_MESSAGES')
					) {
						message.delete();
						const GlobalLogEmbed = new Discord.MessageEmbed()
							.setTitle(`<:trash:852700158969118760> Attempted rickroll`)
							.setDescription(
								`<:channel:841469338774929408> **Channel:** <#${
									message.channel.id
								}>\n**User:** ${message.author.tag} | <@${
									message.author.id
								}> | ${
									message.author.id
								}\n<:Box:852722348289163325> **Server:** ${
									message.guild.name
								} | ${
									message.guild.id
								}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
									message.content
								)}\`\`\``
							)
							.setColor(config.theme)
							.setTimestamp();
						client.channels.cache
							.get('846119889160503386')
							.send(GlobalLogEmbed);
						const RickWarning = new Discord.MessageEmbed()
							.setTitle(
								`<:trash:852700158969118760> Your message has been deleted because it had a potential rickroll!`
							)
							.setDescription(
								`<:channel:841469338774929408> **Channel:** <#${
									message.channel.id
								}>\n<:Box:852722348289163325> **Server:** ${
									message.guild.name
								} | ${
									message.guild.id
								}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
									message.content
								)}\`\`\``
							)
							.setColor(config.theme)
							.setTimestamp();
						message.author.send(RickWarning);
						let logChannel = message.guild.channels.cache
							.filter(c => c.type == 'text')
							.find(channel => channel.name === 'rick-logs');
						if (logChannel) {
							let button = new MessageButton()
								.setStyle('grey')
								.setLabel('Report false rickroll positive')
								.setEmoji('852719363256614982')
								.setID('report');

							const LogEmbed = new Discord.MessageEmbed()
								.setTitle(`<:trash:852700158969118760> Rickroll deleted`)
								.setDescription(
									`<:channel:841469338774929408> **Channel:** <#${
										message.channel.id
									}>\n<:Person:852720773840109610> **User:** ${
										message.author.tag
									} | <@${message.author.id}> | ${
										message.author.id
									}\n\`\`\`${Discord.Util.cleanCodeBlockContent(
										message.content
									)}\`\`\``
								)
								.setColor(config.theme)
								.setTimestamp();
							logChannel.send('', {
								component: button,
								embed: LogEmbed
							});
						}
					} else {
					}
				}
			}
		});
	}
});
client.login(process.env['token']);