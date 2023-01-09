const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('senddm')
        .setDescription('Sends dm to a user')
        .addUserOption(option => option.setName('user').setDescription('Enter a user').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('The message to dm').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        user = interaction.user.id;
        author = interaction.guild.members.cache.get(user)

        const gdsc_role = '1024228824709341194';

        if (author.roles.cache.has(gdsc_role)) {
        const message = interaction.options.get('message').value;
        const userId = interaction.options.get('user').value;
        member = interaction.guild.members.cache.get(userId);


        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTimestamp()
            .setTitle(`${message}`)
            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


        
        try {
            await member.send({embeds :[exampleEmbed]})
            interaction.editReply({content: 'DM Sent',embeds :[exampleEmbed]});
        } catch (error) {
            console.log(`User's dms are closed`)
            interaction.editReply(`<@${userId}> dms are closed`)
        }
    }else {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTimestamp()
            .setDescription(`❌ You don't have permission to use this command`)
            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


        interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
    }


    },
};