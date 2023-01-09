const {ActivityType} = require('discord.js')
const {connectToDb, checkForPosts } = require('../models/scheduled-schema')


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        connectToDb();
        console.log(`${client.user.tag} has logged in.`);
        await client.user.setPresence({
            activities: [
                {
                    name: 'over GDSC GHRCEM',
                    type: ActivityType.Watching
                }
            ],
            status: "online"
        })
        await checkForPosts(client)
    },
};