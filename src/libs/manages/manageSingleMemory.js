async function manageSingleMemory(client, message) {

    // Array for roles and prompts.
    let conversation = [];

    // Get the username of the message author.
    const username = message.author.globalName;

    // Remove the id of the bot.
    // Converts "@BOT_ID Hello!" -> "Hello!".
    const userMessage = message.content.replace(`<@${client.user.id}>`, '').trim();

    // Makes the prompt to look like "Justus0405 says: Hello!".
    const prompt = `${username} says: ${userMessage}`;

    // Push only the latest message from the user into the conversation array.
    conversation.push({
        role: 'user',
        content: prompt,
    })

    return conversation;
}

module.exports = manageSingleMemory;