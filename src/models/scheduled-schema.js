require('dotenv').config();
const mongoose = require('mongoose');
// const {mongodbAtlasLink} = require('./config.json');
const mongodbAtlasLink = process.env.MONGODB_LINK;


const reqString = {
    type: String,
    required: true
}

const scheduledSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    content: reqString,
    guildId: reqString,
    channelId: reqString
})

const scheduledMessage = new mongoose.model("messages", scheduledSchema)

const  connectToDb = () =>{
    mongoose.connect(mongodbAtlasLink,{
        useNewUrlparser : true,
        useUnifiedTopology: true,
        })
    .then(() => console.log("connection is successfull"))
    .catch((err) => console.log(err));
   
}

async function checkForPosts(client){
    const query = {
        date: {
            $lte: Date.now()
        }
    }
    const results = await scheduledMessage.find(query)
    for (const post of results){
        const { guildId, channelId, content} = post

        const guild = await client.guilds.fetch(guildId)
        if(!guild){
            continue
        }

        const channel = guild.channels.cache.get(channelId)
        if(!channel){
            continue
        }

        await channel.send(content)
    }
    await scheduledMessage.deleteMany(query)

    const theclient = await client 
    await new Promise(resolve => setTimeout(resolve, 1000 * 10));
    // await sleep( 1000 * 10)
    await checkForPosts(theclient)
}


// module.exports = scheduledMessage  && scheduledSchema && connectToDb && checkForPosts
module.exports = {
    checkForPosts: checkForPosts,
    connectToDb: connectToDb,
    scheduledMessage: scheduledMessage,
    scheduledSchema: scheduledSchema
}
