
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Excel = require('exceljs');
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('showmembers')
    .setDescription('returns the list of people with role')
    .addMentionableOption(option => option.setName('role').setDescription('Enter a role').setRequired(true)),
  async execute(interaction) {
    user = interaction.user.id;
    author = interaction.guild.members.cache.get(user)
    if (author.roles.cache.has(gdsc_role)) {
    await interaction.deferReply();
    const role = interaction.options.get('role').value;
    const roleName = interaction.options.get('role').role.name;

    let everyone = await interaction.guild.members.fetch()

    const theArray = everyone.map(m => m.user.id);

    const fileName = `${roleName}.xlsx`;
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    ws.getCell('A1').value = 'Sr.no';
    ws.getCell('B1').value = 'Names';


    len = theArray.length;

    let FinalArray = [];
    let NAMES = [];
    // interaction.reply("creating excel file.....")

    for (let x = 0; x < len; x++) {
      member = interaction.guild.members.cache.get(theArray[x])
      if (member.roles.cache.has(role)) {
        if (member.nickname == null) {
          FinalArray.push(member.user.username);
          NAMES.push(member.user.username);
        } else {
          FinalArray.push(member.nickname);
          NAMES.push(member.user.username);
        }
      }
    }
    ws.getRow(1).values = [roleName]
    ws.getColumn(1).width = 5
    ws.getColumn(2).width = 20
    ws.getColumn(3).width = 20
    ws.getRow(1).values = ["Sr No", "Nickname", "Username"];
    let x = 1;
    for (let i = 0; i < FinalArray.length; i++) {
      ws.getRow(i + 2).values = [x, FinalArray[i], NAMES[i]];
      x++;
    }

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
      .setDescription(`Total **${FinalArray.length}** members have **${interaction.options.get('role').role.name} role**`)
      .setTitle(`Show member's with role`)

      .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
    const attachment = new AttachmentBuilder(fileName, { name: `${fileName}` });
    interaction.editReply({ files: [attachment], embeds: [exampleEmbed] })
    .then(() => {
      fs.unlinkSync(fileName);
      console.log('file deleted')
    });
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