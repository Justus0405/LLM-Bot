const sendSuccessMessage = require('../../libs/sendSuccessMessage');
const manageState = require('../../libs/manageState');

async function api(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "url":
            const apiURL = interaction.options.getString('value');

            manageState.API_URL = apiURL;

            sendSuccessMessage(interaction, `Successfully changed the API URL to:\n \`\`\`${apiURL}\`\`\``);
            break;

        case "key":
            const apiKey = interaction.options.getString('value');

            manageState.API_KEY = apiKey;

            sendSuccessMessage(interaction, `Successfully changed the API Key to:\n \`\`\`${apiKey}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = api;