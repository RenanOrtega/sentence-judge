const { REST } = require('@discordjs/rest');
const { Routes, SlashCommandBuilder } = require('discord.js');

async function registerCommands() {
    const commands = [
        new SlashCommandBuilder()
            .setName('responder')
            .setDescription('Responde a um usuário usando a IA com base em um texto.')
            .addUserOption(option => option.setName('delinquente').setDescription('O usuário do Discord.').setRequired(true))
            .addStringOption(option => option.setName('frase').setDescription('Frase do delinquente.').setRequired(true))
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('Comandos registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
}

module.exports = { registerCommands };