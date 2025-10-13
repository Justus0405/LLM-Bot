const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageState = require('../../libs/manageState');

async function thinking(interaction) {

    const choice = interaction.options.getBoolean('option');

    manageState.SHOW_THINKING = choice;

    await sendDebugMessage(`Changed the thinking mode to: ${choice}`);

    await sendSuccessMessage(interaction, `Successfully set thinking mode to:\n \`\`\`${choice}\`\`\``);
}

module.exports = thinking