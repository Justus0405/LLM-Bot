const sendDebugMessage = require('../libs/sends/sendDebugMessage');
const manageState = require('../libs/manages/manageState');
const { ActivityType } = require('discord.js');

module.exports = (client) => {

    // This function runs code once the bot is ready.
    client.once('clientReady', async () => {

        // Print this message when the bot is loaded.
        console.log(`[  ] ${client.user.tag} is online!`);

        // Debug log for non-sensitive enviroment variables.
        sendDebugMessage(`Using model ${manageState.AI_MODEL} via ${manageState.API_URL}`);

        // Set Presence.
        const updatePresence = () => {
            client.user.setPresence({
                activities: [{ name: `Ready to help!`, type: ActivityType.Custom }],
                status: 'online',
            });
        }

        // Inital Presence.
        updatePresence();

        // Update Presence every 1 minute.
        // This is needed because otherwise the status randomly gets blank idk.
        const sendPresenceInterval = setInterval(() => {
            updatePresence();
        }, 60000);
    });
};