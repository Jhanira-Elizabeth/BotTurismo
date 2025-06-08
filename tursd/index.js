// index.js

const path = require('path');
const restify = require('restify');

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the Bot Framework and services.
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');

// This bot's main dialog.
const { EchoBot } = require('./bot'); // Este bot ahora importará nuestra lógica desde bot.js

// Read environment variables from .env file
const dotenv = require('dotenv');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

// Create the adapter.
// See https://aka.ms/about-bot-adapter to learn more about bot adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Define state store for your bot.
// See https://aka.ms/about-bot-state to learn more about bot state.
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create the main dialog.
// Asegúrate de que EchoBot acepte conversationState y userState en su constructor
const myBot = new EchoBot(conversationState, userState);

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log(`\nGet the Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open the Emulator select "Open Bot"`);
    console.log(`and enter your bot's endpoint: ${ server.url }/api/messages`);
});

// Listen for incoming requests.
server.post('/api/messages', async (req, res) => { // <-- ¡AÑADE 'async' AQUÍ!
    await adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await myBot.run(context);
    });
});
