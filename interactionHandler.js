const { generateAIResponse } = require('./openaiService');

const ALLOWED_CHANNEL_ID = '1210799963827609660';

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    
    if (interaction.channelId !== ALLOWED_CHANNEL_ID) {
        await interaction.reply({
            content: 'Este comando só pode ser usado em um canal específico.',
            ephemeral: true
        });
        return;
    }

    if (commandName === 'responder') {
        const user = interaction.options.getUser('delinquente');
        const text = interaction.options.getString('frase');

        if (!user || !text) {
            await interaction.reply({
                content: 'Por favor, forneça um usuário e um texto válidos.',
                ephemeral: true
            });
            return;
        }

        try {
            const botReply = await generateAIResponse(text);

            await interaction.reply({
                content: `**${text}** - ${user}\n\n**Fiscalizado:** ${botReply}`,
                ephemeral: false
            });
        } catch (error) {
            console.error('Erro ao gerar resposta de IA:', error);
            await interaction.reply({
                content: 'Desculpe, ocorreu um erro ao tentar gerar a resposta.',
                ephemeral: true
            });
        }
    }
}

module.exports = { handleInteraction };