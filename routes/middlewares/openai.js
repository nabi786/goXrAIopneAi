const OpenAI = require("openai-api");

const openApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(openApiKey);

module.exports = openai;
