const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');

async function reset(interaction) {

    await sendDebugMessage("Restarting the bot now...");

    await sendSuccessMessage(interaction, "Restarting the bot now...");

    // Just exit because docker should restart the programm automatically.
    // ¯\_(ツ)_/¯
    process.exit(0);
}

module.exports = reset;