const { EmbedBuilder } = require('discord.js');
const fs = require("fs");
require('dotenv').config();
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

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.customId == "poll-id-1") {
            try {

                msgid = interaction.message.id
                console.log(msgid)
                const jsonString = fs.readFileSync(`src\\db\\poll-${msgid}.json`);
                const poll = JSON.parse(jsonString);

                const ids = poll.poll.membersvoted
                console.log(ids)
                var idexists = false
                index = 0
                for (x in ids) {
                    listid = ids[x]['id']
                    if (interaction.user.id == listid) {
                        idexists = true
                        index = x
                        break
                    }
                    else {
                        idexists = false
                    }
                }
                if (idexists) {
                    const votedembed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTimestamp()
                        .setDescription(`**${ids[index]["option"]}** : **${ids[index]["votedto"]}**`)
                        .setTitle(`You have already voted`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.reply({ embeds:[votedembed], ephemeral: true })
                    return
                } 
                else {

                    var title = poll.poll[msgid][0]['title']
                    var opt1name = poll.poll[msgid][0]['option-name']
                    var opt2name = poll.poll[msgid][1]['option-name']
                    var votes = parseInt(poll.poll[msgid][0]['votes'])
                    newvote = votes + 1
                    poll.poll[msgid][0]['votes'] = newvote
                    const info = {
                        "id": interaction.user.id,
                        "votedto": opt1name,
                        "option": 'Option 1'
                    }
                    poll.poll.membersvoted.push(info)

                    var opt1votes = parseInt(poll.poll[msgid][0]['votes'])
                    var opt2votes = parseInt(poll.poll[msgid][1]['votes'])

                    var total_votes = opt1votes + opt2votes
                    var progressbar1 = progressBar(opt1votes, total_votes, 20);
                    var progressbar2 = progressBar(opt2votes, total_votes, 20);
                    const exampleEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTimestamp()
                        .setDescription(`
            ${opt1name} : ${opt1votes} votes
            ${progressbar1}
    
            ${opt2name} : ${opt2votes} votes
            ${progressbar2}`)
                        .setTitle(`${title}`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.message.edit({ embeds: [exampleEmbed] });
                    
                    const votedembed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTimestamp()
                        .setDescription(`You voted for option 1 : **${opt1name}**`)
                        .setTitle(`${title}`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.reply({ embeds:[votedembed], ephemeral: true })

                    const newpoll = JSON.stringify(poll)
                    fs.writeFile(`src\\db\\poll-${msgid}.json`, newpoll, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    })
                }

            } catch (error) {
                console.log(error)

            }
        }
        if (interaction.customId == "poll-id-2") {
            try {

                msgid = interaction.message.id
                console.log(msgid)
                const jsonString = fs.readFileSync(`src\\db\\poll-${msgid}.json`);
                const poll = JSON.parse(jsonString);

                const ids = poll.poll.membersvoted
                console.log(ids)
                var idexists = false
                index = 0
                for (x in ids) {
                    listid = ids[x]['id']
                    if (interaction.user.id == listid) {
                        idexists = true
                        index = x
                        break
                    }
                    else {
                        idexists = false
                    }
                }
                if (idexists) {
                    const votedembed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTimestamp()
                        .setDescription(`**${ids[index]["option"]}** : **${ids[index]["votedto"]}**`)
                        .setTitle(`You have already voted`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.reply({ embeds:[votedembed], ephemeral: true })
                    return
                   
                } else {
                    var title = poll.poll[msgid][0]['title']
                    var opt1name = poll.poll[msgid][0]['option-name']
                    var opt2name = poll.poll[msgid][1]['option-name']
                    var votes = parseInt(poll.poll[msgid][1]['votes'])
                    newvote = votes + 1
                    poll.poll[msgid][1]['votes'] = newvote
                    const info = {
                        "id": interaction.user.id,
                        "votedto": opt2name,
                        "option": 'Option 2'
                    }
                    poll.poll.membersvoted.push(info)

                    var opt1votes = parseInt(poll.poll[msgid][0]['votes'])
                    var opt2votes = parseInt(poll.poll[msgid][1]['votes'])

                    var total_votes = opt1votes + opt2votes
                    var progressbar1 = progressBar(opt1votes, total_votes, 20);
                    var progressbar2 = progressBar(opt2votes, total_votes, 20);
                    const exampleEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTimestamp()
                        .setDescription(`
            ${opt1name} : ${opt1votes} votes
            ${progressbar1}
    
            ${opt2name} : ${opt2votes} votes
            ${progressbar2}`)
                        .setTitle(`${title}`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.message.edit({ embeds: [exampleEmbed] });

                    const votedembed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTimestamp()
                        .setDescription(`You voted for option 2 : **${opt2name}**`)
                        .setTitle(`${title}`)
                        .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })

                    await interaction.reply({ embeds:[votedembed], ephemeral: true })
                    const newpoll = JSON.stringify(poll)
                    fs.writeFile(`src\\db\\poll-${msgid}.json`, newpoll, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    })
                }

            } catch (error) {
                console.log(error)

            }
        }

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;
        // if (interaction.channel.id === process.env.ADMIN_CHANNEL) {
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            // await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        // }
        // else {
        //     const exampleEmbed = new EmbedBuilder()
        //         .setColor(0xFFFFFF)
        //         .setTimestamp()
        //         .setDescription(`❌ You cannot use this command in this channel`)


        //         .setAuthor({ name: 'GDSC GHRCEM BOT', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


        //     interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
        // }
    },
};