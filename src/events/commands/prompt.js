const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageState = require('../../libs/manageState');

async function prompt(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const promptSet = interaction.options.getString('value');

            manageState.AI_CONTEXT = promptSet;

            sendDebugMessage(`Changed the prompt to: ${prompt}`);

            sendSuccessMessage(interaction, `Successfully changed the prompt to:\n \`\`\`${promptSet}\`\`\``);
            break;

        case "get":
            const promptGet = manageState.AI_CONTEXT;
            sendSuccessMessage(interaction, `Current prompt:\n \`\`\`${promptGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = prompt;