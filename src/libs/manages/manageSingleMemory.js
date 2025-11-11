async function manageSingleMemory(client, message, conversation) {

    // Remove the id of the bot.
    // Converts "@BOT_ID Hello!" -> "Hello!".
    const prompt = message.content.replace(`<@${client.user.id}>`, '').trim();

    // Push only the latest message from the user into the conversation array.
    conversation.push({
        role: 'user',
        content: prompt,
    })

    return conversation;
}

module.exports = manageSingleMemory;