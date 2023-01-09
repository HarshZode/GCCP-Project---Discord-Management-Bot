const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
const Excel = require('exceljs');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    client = message.client;
    var bad = require('bad-words/lib/lang.json').words
    
    if(bad.some(word => message.content.includes(word))) message.delete() && message.channel.send(`<@${message.author.id}> please don't use foul language !!`)
    
    if (message.author.bot) return;
    
    //DMS
    if (message.channel.type == 1){

      const user =  message.author
      const exampleEmbed = new EmbedBuilder()
      .setColor(0xFFFFFF)
      .setTimestamp()
      .setDescription(`Message Content\n> ${message.content}`)
      .setTitle(`DM recievied from : ${user.username}#${user.discriminator} Id: ${user.id}`)

      await client.channels.cache.get('1058304037965004801').send({embeds: [exampleEmbed]});
    }
    
    if (message.content === 'g!vc') {
      // doing the same validation here as you did
      if (!message.member.voice.channel) {
        await message.reply('Error: Executor of command is not in a Voice Channel.');
        return;
      }
      const sendersChannel = message.member.voice.channel;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();

      today = dd + '-' + mm + '-' + yyyy;
      const channelName = message.member.voice.channel.name;
      const fileName = `${today}.xlsx`;
      const wb = new Excel.Workbook();
      const ws = wb.addWorksheet('My Sheet');

      ws.getCell('A1').value = 'Sr.no';
      ws.getCell('B1').value = 'Names';
      
      let arr = [];
      let nickNames = [];
       
      for (const [, member] of sendersChannel.members) {
        if (member.nickname == null) {
          arr.push(member.user.tag);
          nickNames.push(member.user.username);
        } else {
          arr.push(member.user.tag);
          nickNames.push(member.user.username);
        }
      }
      ws.getRow(1).values = [fileName]
      ws.getRow(2).values = ['Sr No','Names', 'Tag']
      for (let i = 0; i < arr.length; i++) {
      ws.getRow(i + 3).values = [i + 1, nickNames[i], arr[i]]
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
      .setDescription(`Total **${arr.length}** are in ${sendersChannel}`)
      .setTitle(`Vc Member list`)

      .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg' })
    const attachment = new AttachmentBuilder(fileName, { name: `${fileName}` });
      await message.reply({ files: [attachment], embeds: [exampleEmbed] })
    }

  },
};