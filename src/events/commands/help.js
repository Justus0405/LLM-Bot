const { EmbedBuilder } = require('discord.js');

async function help(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('Command Overview')
        .setDescription('Quick reference of all available commands.')
        .setColor(0xede693)
        .addFields(
            {
                name: 'Commands',
                value: [
                    '`/help` — Displays this message',
                    '`/prompt set` — Set the current personality',
                    '`/prompt get` — Get the current personality',
                    '`/model set` — Set the current model',
                    '`/model get` — Get the current model',
                    '`/api url` — Change the current API URL',
                    '`/api key` — Change the current API Key',
                    '`/thinking` — Toggle display of LLM thinking sections',
                    '`/debug` — Toggle verbose log messages',
                    '`/reset` — Restart the bot and revert to default settings'
                ].join('\n'),
                inline: false,
            }
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = help;