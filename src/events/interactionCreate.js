// Commands Moderators.
const helpCommand = require('./commands/help')
const promptCommand = require('./commands/prompt')
const modelCommand = require('./commands/model')
const apiCommand = require('./commands/api')
const limitCommand = require('./commands/limit')
const temperatureCommand = require('./commands/temperature')
const thinkingCommand = require('./commands/thinking')
const memoryCommand = require('./commands/memory')
const debugCommand = require('./commands/debug')
const resetCommand = require('./commands/reset')

module.exports = (client) => {

    // Slash commands interactions.
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch (interaction.commandName) {

            // Moderator Commands.
            case 'help':
                helpCommand(interaction);
                break;
            case 'prompt':
                promptCommand(interaction);
                break;
            case 'model':
                modelCommand(interaction);
                break;
            case 'api':
                apiCommand(interaction);
                break;
            case 'limit':
                limitCommand(interaction);
                break;
            case 'temperature':
                temperatureCommand(interaction);
                break;
            case 'thinking':
                thinkingCommand(interaction);
                break;
            case 'memory':
                memoryCommand(interaction);
                break;
            case 'debug':
                debugCommand(interaction);
                break;
            case 'reset':
                resetCommand(interaction);
                break;


            // Unkown Commands.
            default:
                break;
        }
    });
}