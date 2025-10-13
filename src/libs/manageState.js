require('dotenv').config({ quiet: true });

module.exports = {
    AI_CONTEXT: process.env.AI_CONTEXT,
    AI_MODEL: process.env.AI_MODEL,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    SHOW_THINKING: String(process.env.SHOW_THINKING).toLowerCase() === 'true'
}