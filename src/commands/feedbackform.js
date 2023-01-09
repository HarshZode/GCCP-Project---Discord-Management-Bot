const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedbackform')
        .setDescription('Sends a feedback form')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Event name')
                .setRequired(true))
        .addStringOption(option =>
                    option.setName('link')
                        .setDescription('Link of feedback form')
                        .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        userId = interaction.user.id;
        author = interaction.guild.members.cache.get(userId)

        const gdsc_role = '1024228824709341194';

        if (author.roles.cache.has(gdsc_role)) {
        userId = interaction.user.id;
        member = interaction.guild.members.cache.get(userId)
        const title = interaction.options.get('title').value;
        const link = interaction.options.get('link').value;
        const gdsc_role = '1024228824709341194';
        if (member.roles.cache.has(gdsc_role)) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // .setCustomId('primary')
                    .setURL(`${link}`)
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Link),
            );

        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTimestamp()
            .setDescription(`Click the button below to get the feedback form :)`)
            .setTitle(`${title} Feedback Form`)

            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


        await interaction.editReply({ components: [row] , embeds: [exampleEmbed]});
            }}
            else {
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .setDescription(`❌ You cannot use this command in this channel`)
                    .setTitle(`Common role`)
    
                    .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
    
    
                interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
            }
    },
};