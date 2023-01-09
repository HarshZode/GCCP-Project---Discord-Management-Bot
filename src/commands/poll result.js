const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Excel = require('exceljs');
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pollresult')
        .setDescription('Shows the results of poll')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message ID')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        userId = interaction.user.id;
        author = interaction.guild.members.cache.get(userId)

        const gdsc_role = '1024228824709341194';

        if (author.roles.cache.has(gdsc_role)) {

            const msgid = interaction.options.get('message').value;

            const jsonString = fs.readFileSync(`src\\db\\poll-${msgid}.json`);
            const poll = JSON.parse(jsonString);

            const fileName = `poll-result-${msgid}.xlsx`;
            const wb = new Excel.Workbook();
            const ws = wb.addWorksheet('My Sheet');

            ws.getCell('A1').value = 'Sr.no';
            ws.getCell('B1').value = 'Names';
            len = poll.poll.membersvoted.length;

            let memberIds = poll.poll.membersvoted;
            let votedTo = []
            let NAMES = []
            let OPTIONS = []

            for (let x = 0; x < len; x++) {
                member = interaction.guild.members.cache.get(memberIds[x]['id'])

                votedTo.push(memberIds[x]["votedto"])
                OPTIONS.push(memberIds[x]["option"])
                if (member.nickname == null) {
                    NAMES.push(member.user.username);
                } else {
                    NAMES.push(member.nickname);
                }

            }

            ws.getColumn(1).width = 5
            ws.getColumn(2).width = 17
            ws.getColumn(3).width = 15
            ws.getColumn(4).width = 15
            ws.getRow(1).values = ['Sr No', 'Names', 'Option Name', 'Option Id']
            let x = 1;
            for (let i = 0; i < memberIds.length; i++) {
                ws.getRow(i + 2).values = [x, NAMES[i], OPTIONS[i], votedTo[i]];
                x++;
            }
            var title = poll.poll[msgid][0]['title']
            var opt1votes = parseInt(poll.poll[msgid][0]['votes'])
            var opt2votes = parseInt(poll.poll[msgid][1]['votes'])

            var total_votes = opt1votes + opt2votes

            await wb.xlsx
                .writeFile(fileName)
                .then(() => {
                    console.log('file created');
                })
                .catch(err => {
                    console.log(err.message);
                });

            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setTimestamp()
                .setTitle(`Poll Result`)
                .setDescription(`Poll Title : **${title}**
                Total votes : **${total_votes}**`)

                .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
            const attachment = new AttachmentBuilder(fileName, { name: `${fileName}` });
            interaction.editReply({ files: [attachment], embeds: [exampleEmbed] })
            .then(() => {
                fs.unlinkSync(fileName);
                console.log('file deleted')
              });
        } else {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTimestamp()
                .setDescription(`❌ You don't have permission to use this command`)
                .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })


            interaction.editReply({ embeds: [exampleEmbed], ephemeral: false });
        }
    },
};