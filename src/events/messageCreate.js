require('dotenv').config({ quiet: true });
const { OpenAI } = require('openai');

// LLM Interface URL and KEY.
// Compatible with, OpenAI, Ollama & LLama.CPP.
const openai = new OpenAI({
    baseURL: process.env.API_URL,
    apiKey: process.env.API_KEY,
});

module.exports = (client) => {

    // Do somthing when a new message is written.
    client.on('messageCreate', async (message) => {

        // Ignore bot messages.
        if (message.author.bot) return;

        // Ignore messages that dont mention the bot.
        if (!message.mentions.users.has(client.user.id)) return;

        // Typing indicator.
        await message.channel.sendTyping();

        // Send the typing indicator packet every 5 seconds if no response is send.
        const sendTypingInterval = setInterval(() => {
            message.channel.sendTyping();
        }, 5000);

        try {
            // Get the username of the message author.
            const username = message.author.username;

            // Remove the id of the bot.
            // Converts "@BOT_ID Hello!" -> "Hello!".
            const userMessage = message.content.replace(`<@${client.user.id}>`, '').trim();

            // Makes the prompt to look like "Justus0405 says: Hello!".
            const prompt = `${username} says: ${userMessage}`;

            const response = await openai.chat.completions.create({
                model: process.env.AI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: process.env.AI_CONTEXT
                    },
                    {
                        role: 'user',
                        content: prompt,
                    }
                ],
            });

            // Split the response if bigger than 2000 characters which is discords message limit for bots.
            // And non nitro users shm.
            const responseMessage = response.choices[0].message.content;
            const chunkSizeLimit = 2000;

            // Just split the message after 2000 characters and send the reply for each message.
            for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
                const chunk = responseMessage.substring(i, i + chunkSizeLimit);
                await message.reply(chunk);
            }
        } catch {
            await message.reply('Something went wrong, please try again.');
        } finally {
            // After everything is done, stop sending typing packets.
            clearInterval(sendTypingInterval);
        }
    });
};