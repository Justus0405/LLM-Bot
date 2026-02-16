require('dotenv').config({ quiet: true });

module.exports = {
    AI_CONTEXT: process.env.AI_CONTEXT,
    AI_MODEL: process.env.AI_MODEL,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    SHOW_THINKING: String(process.env.SHOW_THINKING).toLowerCase() === 'true',
    SHOW_DEBUG: String(process.env.SHOW_DEBUG).toLowerCase() === 'true',
    ENABLE_MEMORY: String(process.env.ENABLE_MEMORY).toLowerCase() === 'true',
    MEMORY_LENGTH: parseInt(process.env.MEMORY_LENGTH, 10),
    MAX_TOKENS: parseInt(process.env.MAX_TOKENS, 10),
    TEMPERATURE: parseFloat(process.env.TEMPERATURE)
}