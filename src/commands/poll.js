const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const { title } = require('process');

global.progressBar = (value, maxValue, size) => {
    const percentage = value / maxValue; // Calculate the percentage of the bar
    const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

    const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
    const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
    const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

    const bar = ` ${percentageText} : ${progressText}  `; // Creating the bar
    return bar;
};

global.initialprogressBar = (value, maxValue, size) => {
    const percentage = value / maxValue; // Calculate the percentage of the bar
    const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

    const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
    const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
    const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

    const bar = ` ${percentageText} : ${emptyProgressText}  `; // Creating the bar
    return bar;
};
module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create poll')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of poll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('Option 1')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Option 2')
                .setRequired(true)),
    async execute(interaction) {
        interaction.deferReply();

        userId = interaction.user.id;
        author = interaction.guild.members.cache.get(userId)

        const gdsc_role = '1024228824709341194';

        if (author.roles.cache.has(gdsc_role)) {

        const title = interaction.options.get('title').value;
        const option1 = interaction.options.get('option1').value;
        const option2 = interaction.options.get('option2').value;

        var initialbar = initialprogressBar(0, 10, 20);
        var initialbar1 = initialprogressBar(0, 10, 20);


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('poll-id-1')
                    .setLabel(`${option1}`)
                    .setStyle(ButtonStyle.Primary),
            ).addComponents(
                new ButtonBuilder()
                    .setCustomId('poll-id-2')
                    .setLabel(`${option2}`)
                    .setStyle(ButtonStyle.Primary),
            );

        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTimestamp()
            .setDescription(`
        ${option1}: 0 votes
        ${initialbar}
        ${option2}: 0 votes
        ${initialbar1}`)
            .setTitle(`${title}`)
            .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
        interaction.deleteReply();
        await interaction.channel.send({ components: [row], embeds: [exampleEmbed] });
        setTimeout(() => { console.log("brr"); }, 500);
        var msgid = await interaction.channel.messages.fetch({ limit: 1 })
            .then(messages => {
                let lastMessage = messages.first();
                id = lastMessage.id
                return id;
            }
            )
            .catch(console.error);

        const poll = {
            'poll': {
                'title': title,
                [msgid]: [
                    { 'title': title,'option-name': option1, 'votes': "0" },
                    { 'title': title,'option-name': option2, 'votes': "0" }
                ],
                'membersvoted':[
                   
                ]
            }
        }
        const jsonString = JSON.stringify(poll)
        fs.writeFile(`.\\src\\db\\poll-${msgid}.json`, jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })}else {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTimestamp()
                .setDescription(`❌ You don't have permission to use this command`)
                .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
                

            interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
        }
    },
};