const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows help info and commands'),
	async execute(interaction) {
            const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTimestamp()
            .setTitle(`Commands of GDSC GHRCEM BOT`)
            .setDescription(`Made with <a:purpleheart:1061968785369731133> for GDSC GHRCEM Discord Server\n<:discord_bot_dev:1061968117930139648> Made by: [Harsh Zode](https://github.com/HarshZode)\n`)
            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
            .setFields( { name: '`/help`', value: `Shows help info and commands`, inline: true },
            { name: '`/ban`', value: `Ban a member from the server`, inline: true },
            { name: '`/kick`', value: `Kick a member from the server`, inline: true },
            { name: '`/timeout`', value: `Set timeout to a member`, inline: true },
            { name: '`/ping`', value: `Shows bot latency`, inline: true },
            { name: '`/commonrole`', value: `Adds a role to everyone`, inline: true },
            { name: '`/feedbackform`', value: `Share the feedback form of GDSC Event`, inline: true },
            { name: '`/poll`', value: `Create polls to improve community interaction`, inline: true },
            { name: '`/pollresult`', value: `Shows results of poll and provides and excel file`, inline: true },
            { name: '`/schedulemessage`', value: `Schedule your messages / Set reminder messages`, inline: true },
            { name: '`/senddm`', value: `Send direct message to a member`, inline: true },
            { name: '`/showmembers`', value: `Get the list of members present in the event`, inline: true },
            { name: '`/documentation`', value: `Documentation of the bot`, inline: true },
            { name: '`g!vc`', value: `Get members present in Event Voice Channel`, inline: true }
            )
            .setFooter({ text: 'Bot Dev: Harsh Zode', iconURL: 'https://avatars.githubusercontent.com/u/69814744?v=4' });// respect the licence, please avoid editing it.
            
        interaction.reply({ embeds: [embed], ephemeral: false });
	},
};