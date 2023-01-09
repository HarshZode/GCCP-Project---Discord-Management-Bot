const { SlashCommandBuilder } = require( '@discordjs/builders');
const
      {EmbedBuilder, PermissionsBitField} = require('discord.js')
module.exports= {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription("Deletes a specific number of messages from a channel")
     .addIntegerOption(option => option.setName('amount').setDescription("The amount of messages to delete").setRequired(true)),
     async execute (interaction, client) {
        user = interaction.user.id;
        author = interaction.guild.members.cache.get(user)
        const gdsc_role = '1024228824709341194';

        if (author.roles.cache.has(gdsc_role)) {
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;
        if (!interaction.member.permissions.has(PermissionsBitField.ManageMessages)) return await interaction.reply({ content: "You don't have permission to execute this command", ephemeral: true});
        if (!amount) return await interaction. reply({content: "Please specify the amount of messages you want to delete", ephemeral: true});
        if(amount > 100 || amount < 1) return await interaction.reply({ content: "Please select a number *between* 100 and 1", ephemeral: true});

        await interaction.channel.bulkDelete(amount).catch(err => {
            return
        });

        const embed = new EmbedBuilder()
        .setColor("White")
        .setDescription(`:white_check_mark: Deleted **${amount}** messages.`)

        await interaction.reply({embeds : [embed]}).catch(err =>{
            return
        })}else {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTimestamp()
                .setDescription(`❌ You don't have permission to use this command`)
                .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
    
    
            interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
        }
    
     }
        
}
    