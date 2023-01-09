const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { loadavg } = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commonrole')
        .setDescription('Gives everyone in the server the selected role')
        .addMentionableOption(option => option.setName('role').setDescription('Enter a role').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        if (interaction.channel.id === '1024311075841249361') {
            const role = interaction.options.get('role').value;
            const roleName = interaction.options.get('role').role.name;
            let everyone = await interaction.guild.members.fetch()

            const theArray = everyone.map(m => m.user.id);

            userId = interaction.user.id;
            author = interaction.guild.members.cache.get(userId)

            const gdsc_role = '1024228824709341194';

            len = theArray.length;


            if (author.roles.cache.has(gdsc_role)) {

                for (let x = 0; x < len; x++) {
                    user = interaction.guild.members.cache.get(theArray[x])
                    // if (user.roles.cache.has(role)) {
                    //     try {
                    //         console.log(`already has role.. ${x}`)
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // } else {
                        try {
                           await  user.roles.add(role)
                        } catch (error) {
                            console.log(`already has role...${x}`)
                        }
                    // }
                }
                
                 interaction.editReply(`Added ${roleName} role to everyone !`);
            }
            else {
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .setDescription(`❌ You don't have the permission to use this command`)
                    .setTitle(`Common role`)

                    .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


                interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
            }
        }
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