const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function api(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "url":
            const apiURL = interaction.options.getString('value');

            manageState.API_URL = apiURL;

            sendDebugMessage(`Changed the API URL to: ${apiURL}`);

            await sendSuccessMessage(interaction, `Successfully changed the API URL to:\n \`\`\`${apiURL}\`\`\``);
            break;

        case "key":
            const apiKey = interaction.options.getString('value');

            manageState.API_KEY = apiKey;

            sendDebugMessage(`Changed the API Key to: ${apiKey}`);

            await sendSuccessMessage(interaction, `Successfully changed the API Key to:\n \`\`\`${apiKey}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = api;