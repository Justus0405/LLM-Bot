const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sendDebugMessage');
const manageState = require('../../libs/manageState');

async function model(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const modelSet = interaction.options.getString('value');

            manageState.AI_MODEL = modelSet;

            sendDebugMessage(`Changed the model to: ${modelSet}`);

            sendSuccessMessage(interaction, `Successfully changed the model to:\n \`\`\`${modelSet}\`\`\``);
            break;

        case "get":
            const modelGet = manageState.AI_MODEL;
            sendSuccessMessage(interaction, `Current model:\n \`\`\`${modelGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = model;