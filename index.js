require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { registerCommands } = require('./commands.js');
const { handleInteraction } = require('./interactionHandler.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

registerCommands();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', handleInteraction);

client.login(process.env.DISCORD_TOKEN);