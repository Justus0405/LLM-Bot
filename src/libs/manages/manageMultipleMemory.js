async function manageMultipleMemory(client, message) {

    // Array for roles and prompts.
    let conversation = [];

    // Get the last 10 messages.
    let prevMessages = await message.channel.messages.fetch({ limit: 10 });

    // Reverse because discord returns the latest message first.
    prevMessages.reverse();

    prevMessages.forEach((msg) => {

        // if a message is from another bot, ignore it.
        if (msg.author.bot && msg.author.id !== client.user.id) return;

        // Filter the message responses from the bot.
        if (msg.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                content: msg.content,
            });

            return;
        }

        // Get the username of the message author.
        const username = msg.author.globalName;

        // Remove the id of the bot.
        // Converts "@BOT_ID Hello!" -> "Hello!".
        const userMessage = msg.content.replace(`<@${client.user.id}>`, '').trim();

        // Makes the prompt to look like "Justus0405 says: Hello!".
        const prompt = `${username} says: ${userMessage}`;

        // Push all messages for the history as user into the conversation array.
        conversation.push({
            role: 'user',
            content: prompt,
        })
    });

    return conversation;
}

module.exports = manageMultipleMemory;