async function manageMultipleMemory(client, message, conversation) {

    // Get the last 20 messages.
    let prevMessages = await message.channel.messages.fetch({ limit: 20 });

    // Use alternating user and assistant role which is required by some APIs.
    // NOTE:
    // This causes for some messages to be ignored in history,
    // currently older messages are prioritised over newer ones,
    // maybe I should reverse the entries first when I have filtered them.
    let prevRole = 'none'

    // Reverse because discord returns the latest message first.
    prevMessages.reverse();

    prevMessages.forEach((msg) => {

        // Ignore messages from other bots.
        if (msg.author.bot && msg.author.id !== client.user.id) return;

        // Filter the message responses from the bot.
        if (msg.author.id === client.user.id) {

            // Ignore replies that dont belong to the current conversation of the user.
            if (!msg.mentions.users.has(message.author.id)) return;

            // If the previous or first message is a assistant message discard it.
            // This fixes llamacpp error:
            // Error: Jinja Exception: Conversation roles must alternate user/assistant/user/assistant/...
            if (prevRole !== 'user') return;

            conversation.push({
                role: 'assistant',
                content: msg.content,
            });

            // Set the variable to assistant for allowing the next processed message to be a user one.
            prevRole = 'assistant'

            return;
        }

        // Filter the messages from the user the bot is responding to.
        if (msg.author.id === message.author.id) {

            // Ignore messages that dont mention the bot.
            // These messages dont count as part of the conversation.
            if (!msg.mentions.users.has(client.user.id)) return;

            // If the previous message is also a user message discard it.
            // This fixes llamacpp error:
            // Error: Jinja Exception: Conversation roles must alternate user/assistant/user/assistant/...
            if (prevRole !== 'assistant' && prevRole !== 'none') return;

            // Remove the id of the bot.
            // Converts "@BOT_ID Hello!" -> "Hello!".
            const prompt = msg.content.replace(`<@${client.user.id}>`, '').trim();

            conversation.push({
                role: 'user',
                content: prompt,
            });

            // Set the variable to user for allowing the next processed message to be a assistant one.
            prevRole = 'user'

            return;
        }

    });

    return conversation;
}

module.exports = manageMultipleMemory;