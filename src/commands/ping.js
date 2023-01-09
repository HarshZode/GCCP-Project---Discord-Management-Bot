const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with API Latency'),
	async execute(interaction) {
        interaction.reply(`${Math.round(interaction.client.ws.ping)}ms`)
	},
};