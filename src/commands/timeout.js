const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member from the server')
        .addUserOption(option => option.setName('user').setDescription('Enter a user').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('duration of timeout (in mins)').setRequired(false)),
	async execute(interaction) {
        const member = interaction.options.getMember('user');
        const duration = interaction.options.get('time').value;

        const gdsc_role = process.env.ADMIN_ROLE;
        user = interaction.user.id;
        author = interaction.guild.members.cache.get(user)
        if (author.roles.cache.has(gdsc_role)) {
        if(member.user.id == interaction.user.id){
            await interaction.reply({content: `You cannot timeout yourself`,  ephemeral: true })
        }
        try{
            member.timeout(300_000); // Timeout for five minutes
        }catch(err){
           console.log(err)
        }
        
        const exampleEmbed = new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTimestamp()
        .setTitle(`${member.user.username}#${+member.user.discriminator} was put to timeout`)
        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
        await interaction.reply({embeds: [exampleEmbed]})

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