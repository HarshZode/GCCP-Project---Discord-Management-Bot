require('dotenv').config();
const fs = require('fs');
const keepAlive = require("./server")
const path = require('node:path');
const { Discord, Partials, Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
}); 

client.commands = new Collection();
const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, '/src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (client, commands, ...args) => event.execute(client, commands, ...args));
  }
}

client.login(process.env.TOKEN);
// keepAlive()