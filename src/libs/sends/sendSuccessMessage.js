const { EmbedBuilder } = require('discord.js');

async function sendSuccessMessage(interaction, message) {

    const embed = new EmbedBuilder()
        .setTitle('Success!')
        .setDescription(message)
        .setColor('#ede693')
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = sendSuccessMessage;