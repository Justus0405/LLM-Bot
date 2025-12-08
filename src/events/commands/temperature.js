const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function temperature(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const temperatureSet = interaction.options.getString('temperature');

            manageState.TEMPERATURE = parseFloat(temperatureSet);

            sendDebugMessage(`Changed the temperature to: ${temperatureSet}`);

            await sendSuccessMessage(interaction, `Successfully changed the temperature to:\n \`\`\`${temperatureSet}\`\`\``);
            break;

        case "get":
            const temperatureGet = manageState.TEMPERATURE

            await sendSuccessMessage(interaction, `Current temperature:\n \`\`\`${temperatureGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = temperature;