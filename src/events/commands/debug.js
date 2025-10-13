const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageState = require('../../libs/manageState');

async function debug(interaction) {

    const choice = interaction.options.getBoolean('option');

    manageState.SHOW_DEBUG = choice;

    await sendDebugMessage(`Changed the debug mode to: ${choice}`);

    await sendSuccessMessage(interaction, `Successfully set debug mode to:\n \`\`\`${choice}\`\`\``)
}

module.exports = debug;