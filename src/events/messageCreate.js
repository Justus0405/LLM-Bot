const manageMultipleMemory = require('../libs/manages/manageMultipleMemory');
const manageSingleMemory = require('../libs/manages/manageSingleMemory');
const sendDebugMessage = require('../libs/sends/sendDebugMessage');
const manageState = require('../libs/manages/manageState');
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
            // Array for roles and prompts.
            let conversation = [];

            // Get the username of the message author.
            const username = message.author.globalName;

            const systemContent = `${manageState.AI_CONTEXT}. The username of the person you are talking to is ${username}.`;

            // System prompt
            conversation.push({
                role: 'system',
                content: systemContent
            });

            // Handle bot conversation memory.
            if (manageState.ENABLE_MEMORY === true) {

                conversation = await manageMultipleMemory(client, message, conversation);
            } else {

                conversation = await manageSingleMemory(client, message, conversation);
            }

            // Print the conversation if debug is enabled.
            sendDebugMessage(conversation);

            // Send the chat to the LLM.
            const response = await openai.chat.completions.create({
                model: manageState.AI_MODEL,
                messages: conversation,
                max_tokens: manageState.MAX_TOKENS,
                temperature: manageState.TEMPERATURE,
            });

            // Get the LLMs response.
            const responseMessage = response.choices[0].message.content;

            // Print the response if debug is enabled.
            sendDebugMessage(responseMessage);

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
            await message.channel.send('Something went wrong, please try again.');
        } finally {
            // After everything is done, stop sending typing packets.
            clearInterval(sendTypingInterval);
        }
    });
};