const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');

async function reset(interaction) {

    sendDebugMessage("Restarting the bot now...");

    await sendSuccessMessage(interaction, "Restarting the bot now...");

    // Just exit because docker should restart the programm automatically.
    // ¯\_(ツ)_/¯
    process.exit(0);
}

module.exports = reset;