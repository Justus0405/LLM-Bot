async function manageMultipleMemory(client, message, conversation) {

    // Get the last 20 messages.
    let prevMessages = await message.channel.messages.fetch({ limit: 20 });

    // Reverse because discord returns the latest message first.
    prevMessages.reverse();

    prevMessages.forEach((msg) => {

        // Ignore messages from other bots.
        if (msg.author.bot && msg.author.id !== client.user.id) return;

        // Filter the message responses from the bot.
        if (msg.author.id === client.user.id) {

            // Ignore replies that dont belong to the current conversation of the user.
            if (!msg.mentions.users.has(message.author.id)) return;

            conversation.push({
                role: 'assistant',
                content: msg.content,
            });

            return;
        }

        // Filter the messages from the user the bot is responding to.
        if (msg.author.id === message.author.id) {

            // Ignore messages that dont mention the bot.
            // These messages dont count as part of the conversation.
            if (!msg.mentions.users.has(client.user.id)) return;

            // Remove the id of the bot.
            // Converts "@BOT_ID Hello!" -> "Hello!".
            const prompt = msg.content.replace(`<@${client.user.id}>`, '').trim();

            conversation.push({
                role: 'user',
                content: prompt,
            });

            return;
        }

    });

    return conversation;
}

module.exports = manageMultipleMemory;