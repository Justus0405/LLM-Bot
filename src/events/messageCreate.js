const sendDebugMessage = require('../libs/sendDebugMessage');
const manageState = require('../libs/manageState');
const { OpenAI } = require('openai');

// LLM Interface URL and KEY.
// Compatible with, OpenAI, Ollama & LLama.CPP.
const openai = new OpenAI({
    baseURL: manageState.API_URL,
    apiKey: manageState.API_KEY,
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
            const username = message.author.globalName;

            // Remove the id of the bot.
            // Converts "@BOT_ID Hello!" -> "Hello!".
            const userMessage = message.content.replace(`<@${client.user.id}>`, '').trim();

            // Makes the prompt to look like "Justus0405 says: Hello!".
            const prompt = `${username} says: ${userMessage}`;

            await sendDebugMessage(prompt);

            const response = await openai.chat.completions.create({
                model: manageState.AI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: manageState.AI_CONTEXT
                    },
                    {
                        role: 'user',
                        content: prompt,
                    }
                ],
            });

            // Get the LLMs response.
            const responseMessage = response.choices[0].message.content;

            // Formatting for thinking models.
            let messageContent;

            if (manageState.SHOW_THINKING === true) {
                // This is for formatting the thinking section into a code block.
                messageContent = responseMessage.replace("<think>", "```thoughts\n").replace("</think>", "```\n");
            }
            else if (manageState.SHOW_THINKING === false) {
                // This is for removing the thinking section.
                messageContent = responseMessage.replace(/<think>[\s\S]*?<\/think>/g, '');
            }
            else {
                // No formatting needed.
                messageContent = responseMessage;
            }

            await sendDebugMessage(messageContent);

            // Split the response if bigger than 2000 characters which is discords message limit for bots.
            // And non nitro users shm.
            const chunkSizeLimit = 2000;

            // Just split the message after 2000 characters and send the reply for each message.
            for (let i = 0; i < messageContent.length; i += chunkSizeLimit) {
                const chunk = messageContent.substring(i, i + chunkSizeLimit);
                await message.reply(chunk);
            }
        } catch (error) {
            console.log(error)
            await message.reply('Something went wrong, please try again.');
        } finally {
            // After everything is done, stop sending typing packets.
            clearInterval(sendTypingInterval);
        }
    });
};