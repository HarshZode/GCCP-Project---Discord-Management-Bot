const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const momentTimezone = require('moment-timezone')
const mongoose = require('mongoose');
const { scheduledMessage }= require('../models/scheduled-schema')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedulemessage')
		.setDescription('Send scheduled messages in a channel')
		.addStringOption(option =>
			option.setName('date')
				.setDescription(`YYYT-MM-DD format`)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('time')
				.setDescription(`HH:mm format`)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('clocktype')
				.setDescription(`Select AM or PM`)
				.setRequired(true)
				.addChoices(
					{ name: 'AM', value: 'AM' },
					{ name: 'PM', value: 'PM' },
				))
				.addStringOption(option =>
					option.setName('message')
						.setDescription(`Reminder Message`)
						.setRequired(true)),

	init: (client) => {
		
	},
	async execute(interaction) {
		const targetChannel = interaction.channel.id
		const date = interaction.options.get('date').value;
		const time = interaction.options.get('time').value;
		const clockType = interaction.options.get('clocktype').value;
		const message = interaction.options.get('message').value;
		// const validTimezones = momentTimezone.tz.names()
		const timezone = "Asia/Kolkata"

		const targetDate = momentTimezone.tz(
			`${date} ${time} ${clockType}`,
			'YYYY-MM-DD HH:mm A',
			timezone
		)
		// const scheduledMessage = new mongoose.model("message",scheduledSchema)
		const scheduledmessage =  new scheduledMessage({
			date : targetDate.valueOf(),
			content: message,
			guildId: interaction.guild.id,
			channelId: targetChannel
		})
		scheduledmessage.save()

		interaction.reply(`Your message is scheduled`)
	},
};