const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function thinking(interaction) {

    const choice = interaction.options.getBoolean('enabled');

    manageState.SHOW_THINKING = choice;

    sendDebugMessage(`Changed the thinking mode to: ${choice}`);

    await sendSuccessMessage(interaction, `Successfully set thinking mode to:\n \`\`\`${choice}\`\`\``);
}

module.exports = thinking