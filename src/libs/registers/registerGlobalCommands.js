require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

const commands = [
    {
        name: 'help',
        description: 'Get information about the bot and its features',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString()
    },
    {
        name: 'prompt',
        description: 'Change the bots personality',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'set',
                description: 'Set the current personality',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'prompt',
                        description: 'The personality to set',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: 'get',
                description: 'Get the current personality',
                type: ApplicationCommandOptionType.Subcommand
            }
        ]
    },
    {
        name: 'model',
        description: 'Change the bots model',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'set',
                description: 'Set the current model',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'model',
                        description: 'The model to set',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: 'get',
                description: 'Get the current model',
                type: ApplicationCommandOptionType.Subcommand
            }
        ]
    },
    {
        name: 'api',
        description: 'Change the bots API URL & Key',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'url',
                description: 'Change the current API URL',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'url',
                        description: 'The API URL',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: 'key',
                description: 'Change the current API Key',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'key',
                        description: 'The API Key',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            }
        ]
    },
    {
        name: 'thinking',
        description: 'Toggle display of LLM thinking sections',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'enabled',
                description: 'true or false',
                type: ApplicationCommandOptionType.Boolean,
                required: true
            },
        ]
    },
    {
        name: 'memory',
        description: 'Toggle message history',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'enabled',
                description: 'true or false',
                type: ApplicationCommandOptionType.Boolean,
                required: true
            },
        ]
    },
    {
        name: 'debug',
        description: 'Toggle verbose log messages',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'enabled',
                description: 'true or false',
                type: ApplicationCommandOptionType.Boolean,
                required: true
            },
        ]
    },
    {
        name: 'reset',
        description: 'Restart the bot and revert to default settings',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('[  ] Registering global slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('[  ] Global slash commands were registered successfully!');
    } catch (error) {
        console.log(error);
    }
})();