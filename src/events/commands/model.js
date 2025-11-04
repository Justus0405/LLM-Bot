const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function model(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const modelSet = interaction.options.getString('value');

            manageState.AI_MODEL = modelSet;

            sendDebugMessage(`Changed the model to: ${modelSet}`);

            await sendSuccessMessage(interaction, `Successfully changed the model to:\n \`\`\`${modelSet}\`\`\``);
            break;

        case "get":
            const modelGet = manageState.AI_MODEL;

            await sendSuccessMessage(interaction, `Current model:\n \`\`\`${modelGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = model;