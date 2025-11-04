const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function memory(interaction) {

    const choice = interaction.options.getBoolean('enabled');

    manageState.ENABLE_MEMORY = choice;

    sendDebugMessage(`Changed the memory mode to: ${choice}`);

    await sendSuccessMessage(interaction, `Successfully set memory mode to:\n \`\`\`${choice}\`\`\``)
}

module.exports = memory;