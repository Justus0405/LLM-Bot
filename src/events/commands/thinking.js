const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageState = require('../../libs/manageState');

async function thinking(interaction) {

    const choice = interaction.options.getBoolean('option');

    manageState.SHOW_THINKING = choice;

    sendDebugMessage(`Changed the thinking mode to: ${choice}`);

    sendSuccessMessage(interaction, `Successfully set thinking mode to:\n \`\`\`${choice}\`\`\``);
}

module.exports = thinking