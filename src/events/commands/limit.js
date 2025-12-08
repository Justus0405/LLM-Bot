const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function limit(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const limitSet = interaction.options.getString('limit');

            manageState.MAX_TOKENS = parseInt(limitSet, 10);

            sendDebugMessage(`Changed the token limit to: ${limitSet}`);

            await sendSuccessMessage(interaction, `Successfully changed the token limit to:\n \`\`\`${limitSet}\`\`\``);
            break;

        case "get":
            const limitGet = manageState.MAX_TOKENS

            await sendSuccessMessage(interaction, `Current token limit:\n \`\`\`${limitGet}\`\`\``);
            break;

        default:
            break;
    }
}

module.exports = limit;