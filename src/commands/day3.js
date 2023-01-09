const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { loadavg } = require('os');
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('day3')
        .setDescription('Checks previous role and adds new role')
        .addUserOption(option => option.setName('user').setDescription('Enter a user').setRequired(true)),

    async execute(interaction) {

        if (interaction.channel.id === process.env.ADMIN_CHANNEL) {
            user = interaction.options.get('user').value;

            userId = interaction.user.id;
            member = interaction.guild.members.cache.get(userId)
            const gdsc_role = process.env.ADMIN_ROLE;
            if (member.roles.cache.has(gdsc_role)) {
                member = interaction.guild.members.cache.get(user)
                const day2_role = '1023241239530836068'
                const day3_role = '1024251132140339210'
                if (member.roles.cache.has(day3_role)) {
                    const exampleEmbed = new EmbedBuilder()
                        .setColor(0xFFFFFF)
                        .setTimestamp()
                        .setDescription(`✅ <@${user}> already has the role\nCommand used by : <@${interaction.user.id}>`)
                        .setTitle(`Day 3 Role`)

                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
                    try {


                        member.roles.add(day3_role);
                        interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
                    } catch (error) {
                        console.log(error)
                    }
                }
                else if (member.roles.cache.has(day2_role)) {
                    try {


                        const exampleEmbed = new EmbedBuilder()
                            .setColor(0xFFFFFF)
                            .setTimestamp()
                            .setDescription(`✅ The user has the role\nNew role has been added to <@${user}>\nCommand used by : <@${interaction.user.id}>`)
                            .setTitle(`Day 3 Role`)

                            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


                        try {


                            member.roles.add(day3_role);
                            interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
                        } catch (error) {
                            console.log(error)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                else {
                    const exampleEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTimestamp()
                        .setDescription(`❌ The user <@${user}> doesn't have the role.`)
                        .setTitle(`Day 3 Role`)

                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


                    interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
                }
            } else {
                const exampleEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .setDescription(`❌ You don't have the permission to use this command`)
                    .setTitle(`Day 3 Role`)

                    .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


                interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
            }
        }
        else {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTimestamp()
                .setDescription(`❌ You cannot use this command in this channel`)
                .setTitle(`Day 3 Role`)

                .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


            interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
        }


    },
};