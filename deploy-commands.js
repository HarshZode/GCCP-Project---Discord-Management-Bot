require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');


const clientId = "1023971498949619752";
const guildId = "1016017939587149835";
const token = process.env.TOKEN

const commands = [];
const commandsPath = path.join(__dirname, './src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered all application commands.'))
	.catch(console.error);
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// // for global commands
