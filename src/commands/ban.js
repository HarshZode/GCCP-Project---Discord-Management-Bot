const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member from the server')
        .addUserOption(option => option.setName('user').setDescription('Enter a user').setRequired(true)),
	async execute(interaction) {
        const member = interaction.options.getMember('user');
        const gdsc_role = process.env.ADMIN_ROLE;
        user = interaction.user.id;
        author = interaction.guild.members.cache.get(user)
        if (author.roles.cache.has(gdsc_role)) {
        if(member.user.id == interaction.user.id){
            await interaction.reply({content: `You cannot ban yourself`,  ephemeral: true })
        }
        try{
            member.ban();
            const exampleEmbed = new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTimestamp()
        .setTitle(`${member.user.username}#${+member.user.discriminator} was banned from the server`)
        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
        await interaction.reply({embeds: [exampleEmbed]})
        }catch(err){
           console.log(err)
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