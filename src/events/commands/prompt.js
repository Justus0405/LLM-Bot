const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function prompt(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const promptSet = interaction.options.getString('prompt');

            manageState.AI_CONTEXT = promptSet;

            sendDebugMessage(`Changed the prompt to: ${prompt}`);

            await sendSuccessMessage(interaction, `Successfully changed the prompt to:\n \`\`\`${promptSet}\`\`\``);
            break;

        case "get":
            const promptGet = manageState.AI_CONTEXT;

            await sendSuccessMessage(interaction, `Current prompt:\n \`\`\`${promptGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = prompt;