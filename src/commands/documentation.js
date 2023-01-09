const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('documentation')
		.setDescription(`Shares a link to bot's documentation`),
	async execute(interaction) {
        
            const exampleEmbed = new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTimestamp()
        .setTitle(`Documentation`)
        .setDescription(`Link: [GDSC GHRCEM BOT](https://github.com/HarshZode/GCCP-Project---Discord-Management-Bot/blob/master/README.md)`)
        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
        await interaction.reply({embeds: [exampleEmbed]})
        
	},
};