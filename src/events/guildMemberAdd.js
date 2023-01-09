
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        if(!member.guild) return;

    const exampleEmbed = new EmbedBuilder()
    .setColor(0xFFFFFF)
    .setTimestamp()
    .setDescription(`<@${member.id}>\nMake Sure to check:- <#1023561176807915570>`)
    .setTitle(`Welcome to ${member.guild.name}!`)
    .setAuthor({ name: 'GDSC GHRCEM', iconURL: 'https://cdn.discordapp.com/attachments/834644376780013574/1023814671809138698/301448943_1414811449025808_6886991396920414630_n.jpg'})
    .setImage('https://pbs.twimg.com/media/E9XhwpcVEAAaLZu.jpg')
    .setThumbnail('https://pbs.twimg.com/media/E9XhwpcVEAAaLZu.jpg')
      const channel = member.guild.channels.cache.find(ch => ch.id === "1016017940111429643");
      
      channel.send({embeds : [exampleEmbed]});

        
    },
};