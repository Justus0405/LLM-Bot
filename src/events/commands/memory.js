const sendSuccessMessage = require('../../libs/sends/sendSuccessMessage');
const sendDebugMessage = require('../../libs/sends/sendDebugMessage');
const manageState = require('../../libs/manages/manageState');

async function memory(interaction) {

    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case "set":
            const memorySet = interaction.options.getString('length');

            manageState.MEMORY_LENGTH = parseInt(memorySet, 10);

            sendDebugMessage(`Changed the memory length to: ${memorySet}`);

            await sendSuccessMessage(interaction, `Successfully changed the memory length to:\n \`\`\`${memorySet} messages\`\`\``);
            break;

        case "get":
            const memoryGet = manageState.MEMORY_LENGTH;

            await sendSuccessMessage(interaction, `Current memory length:\n \`\`\`${memoryGet} messages\`\`\``);
            break;

        case "toggle":
            const memoryToggle = interaction.options.getBoolean('enabled');

            manageState.ENABLE_MEMORY = memoryToggle;

            sendDebugMessage(`Changed the memory mode to: ${memoryToggle}`);

            await sendSuccessMessage(interaction, `Successfully set memory mode to:\n \`\`\`${memoryToggle}\`\`\``)
            break;

        default:
            break;
    }
}

module.exports = memory;