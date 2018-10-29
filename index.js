//const
const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();



//var
var prefix = config.prefix;
var randnum = 0;



//Stats du bot
bot.on("ready", () => {
	var servers = bot.guilds.array().map(g => g.name).join(',');
	console.log(`---------------------`);
    console.log(`Pseudo : ${bot.user.username}`)
    console.log(`Compte : ${bot.user.tag}`)
    console.log(`Prefix: "${prefix}"`)
    console.log(`Id: ${bot.user.id}`)
    console.log(`Servers: ${bot.guilds.size}`)
    console.log(`Utilisateurs : ${bot.users.size}`)
    console.log(`Channels : ${bot.channels.size}`)
	console.log(`---------------------`)
	bot.user.setGame(`${prefix}help | in ${bot.guilds.array().length} servers`, 'https://www.twitch.tv/lindwen');
});



//Quand le bot rejoint un serveur
bot.on("guildCreate", guild => {
  console.log(`J'ai rejoins un nouveau serveur : ${guild.name} (id: ${guild.id}). Il y a ${guild.memberCount} membres !`);
  bot.user.setGame(`${prefix}help | in ${bot.guilds.array().length} servers`, 'https://www.twitch.tv/lindwen');
});



//Quand le bot part d'un serveur
bot.on("guildDelete", guild => {
  console.log(`J'ai été exclu d'un serveur : ${guild.name} (id: ${guild.id})`);
  bot.user.setGame(`${prefix}help | in ${bot.guilds.array().length} servers`, 'https://www.twitch.tv/lindwen');
});



//Commandes
bot.on('message', message => {


	//help
	if(message.content.startsWith(prefix + "help")){
			let embed = new Discord.RichEmbed()
				.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
				.setColor(config.color)
				.setThumbnail("https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
				.setTitle("__Liste des commandes :__")
				.setDescription(`Pour avoir la liste des commandes **${prefix}help**, le préfixe pour toutes les commandes est **${prefix}**`)
				.addField(":bust_in_silhouette: General", "help, serveurinfo, ping, userinfo, codes, avatar, uptime")
				.addField(":tada: Fun", "roll, hug, goodnight, kiss, mp")
				.addField(":white_check_mark: Pour m'inviter :","https://discordapp.com/oauth2/authorize?client_id=450353599365644288&scope=bot&permissions=8")
				.addField(":link: Mon code est open-source", "https://github.com/Lindwen/NekoBot\nhttps://gitlab.com/Lindwen/nekobot")
				.setFooter("J'ai été créé par Lindwen Aka Alexandre#2522")
			message.channel.send(embed);
	}


	//info serveur
	else if(message.content.startsWith(prefix + "serveurinfo")){
		let embed = new Discord.RichEmbed()
			.setColor(config.color)
			.setAuthor(bot.user.username, bot.user.avatarURL)
			.setDescription("Information du serveur")
			.addField("Propriétaire du serveur", message.guild.owner.user.tag)
			.addField("Nom du serveur", message.guild.name)
			.addField("Créer le", message.guild.createdAt)
			.addField("Utilisateurs sur le discord", message.guild.memberCount)
			.addField("Nombre de salons", message.guild.channels.size)
			.addField("Nombre de rôles", message.guild.roles.size)
			.addField("Liste des rôles", message.guild.roles.map(r => r.name).length > 900 ? "Trop de rôles" : message.guild.roles.map(r => r.name))
			.addField("Humains", message.guild.members.filter(member => !member.user.bot).size)
			.addField("Bots", message.guild.members.filter(member => member.user.bot).size)
			.addField("Region", message.guild.region)
			.setThumbnail(message.guild.iconURL)
		message.channel.send(embed);
	}


	//ping
	else if(message.content.startsWith(prefix + "ping")){
		message.channel.send("Pinging ...")
			.then((msg) => {
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + " ms")
			})
	}


	//userinfo
	else if(message.content.startsWith(prefix + "userinfo")){
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
				let embed = new Discord.RichEmbed()
				.setAuthor(member.user.username)
				.setColor(config.color)
				.addField("Pseudonyme :", `${member.user.username}#${member.user.discriminator}` ,true)
				.addField("ID :", member.user.id ,true)
				.addField("Créé le :", member.user.createdAt ,true)
				.setThumbnail(member.user.avatarURL)
			message.channel.send(embed);
		}
		else {
			let embed = new Discord.RichEmbed()
				.setAuthor(message.author.username)
				.setColor(config.color)
				.addField("Pseudonyme :", `${message.author.username}#${message.author.discriminator}` ,true)
				.addField("ID :", message.author.id ,true)
				.addField("Créé le :", message.author.createdAt ,true)
				.setThumbnail(message.author.avatarURL)
			message.channel.send(embed);
		}
	}


	//roll
	else if(message.content.startsWith(prefix + "roll")){ 
		var result = Math.floor((Math.random() * 100))
		let embed = new Discord.RichEmbed()
			.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
			.setColor(config.color)
			.setDescription("Roll demandé par : **" + message.author.username + "**\nRésultat du roll : **" + result + "**")
			.setFooter("Le roll donne un nombre aléatoire de 0 à 100.")
		message.channel.send(embed);
	}



	//codes
	else if(message.content.startsWith(prefix + "codes")){
		let embed = new Discord.RichEmbed()
			.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
			.setColor(config.color)
			.setDescription("Discord Formatting Codes")
			.addField("```*italics*```","*italics*")
			.addField("```**bold**```","**bold**")
			.addField("```~~strikeout~~```","~~strikeout~~")
			.addField("```__underline__```","__underline__")
			.addField("```***bold italics***```","***bold italics***")
			.addField("```__*underline italics*__```","__*underline italics*__")
			.addField("```__**underline bold**__```","__**underline bold**__")
			.addField("```__~~underline strikeout~~__```","__~~underline strikeout~~__")
			.addField("```**~~bold strikeout~~**```","**~~bold strikeout~~**")
			.addField("```__***underline bold italics***___```","__***underline bold italics***__")
			.addField("```__***~~underline bold italics stikeout~~***__```","__***~~underline bold italics stikeout~~***__")
		message.channel.send(embed);
	}


	//avatar
	else if(message.content.startsWith(prefix + "avatar")){
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
				let embed = new Discord.RichEmbed()
				.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
				.addField("Image de profil", member.user.username)
				.setImage(member.user.avatarURL)
				.setColor(config.color)
			message.channel.send(embed);
		} else {
			let embed = new Discord.RichEmbed()
				.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
				.addField("Image de profil", message.author.username)
				.setImage(message.author.avatarURL)
				.setColor(config.color)
			message.channel.send(embed);
		}
	}


	//hug
	else if(message.content.startsWith(prefix + "hug")) {
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
			message.channel.send(`${message.author} fait un calin a ${member} !`, {
				file: "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif"
			});
		}
	}


	//salut
	else if (message.content.includes("salut neko")) {
		message.channel.send(`Salut ${message.author} !`)
	}


	//goodnight
	else if(message.content.startsWith(prefix + "goodnight")) {
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
			message.channel.send(`${message.author} souhaite une bonne nuit a ${member} !`, {
				file: "https://media.giphy.com/media/1wn4WeXaCt3hHFyd67/giphy.gif"
			});
		}
	}


	//kiss
	else if(message.content.startsWith(prefix + "kiss")) {
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
			message.channel.send(`${message.author} fait un bisous a ${member} !`, {
				file: "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif"
			});
		}
	}


	//mp
	else if(message.content.startsWith(prefix + "mp")) {
		if(message.mentions.members.size == 1) {
			let member = message.mentions.members.first()
			message.channel.send(`${message.author} envoie un mp a ${member} !`, {
				file: "http://image.noelshack.com/fichiers/2018/43/6/1540629017-c04.gif"
			});
		}
	}


	//uptime
	else if(message.content.startsWith(prefix + "uptime")) {
		let totalSeconds = (bot.uptime / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let uptime = `${hours} heures, ${minutes} minutes et ${seconds} secondes`;
		let embed = new Discord.RichEmbed()
			.setAuthor(bot.user.username, "https://cdn.discordapp.com/app-icons/450353599365644288/4ac094e935782b098d7919e1332f954c.png?size=256")
			.setColor(config.color)
			.setDescription(`Je suis connecté depuis :\n${uptime}`)
		message.channel.send(embed);
	}


	/*
	//kick
	else if (message.content.startsWith(prefix + "kick")) {
		if(message.member.hasPermission("KICK_MEMBERS"));
		const user = message.mentions.users.first();
			if (user) {
				const member = message.guild.member(user);
				if (member) {
					member.kick('Raison facultative à afficher dans les journaux des logs.').then(() => {
						message.reply(`${user.tag} a été kick.`);
					}).catch(err => {
					message.reply('Je ne peux pas kick ce membre.');
					console.error(err);
				});
				} else {
						message.reply('Cet utilisateur n\'est pas sur le serveur !');
				}
			} else {
				message.reply('Veuillez mentionner un utilisateur a kick.');
	}


	//ban
	if (message.content.startsWith(prefix + "ban")) {
		if(message.member.hasPermission("BAN_MEMBERS"));
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
			member.ban({
			  reason: 'Le marteau de bannissement a frappé !',
			}).then(() => {
			  message.reply(`${user.tag} a été banni.`);
			}).catch(err => {
			  message.reply('Je ne peux pas bannir ce membre.');
			  console.error(err);
			});
		  } else {
			message.reply('Cet utilisateur n\'est pas sur le serveur !');
		  }
		} else {
		  message.reply('Veuillez mentionner un utilisateur a ban.');
		}
	}
	*/


});
	


bot.login(config.token)
