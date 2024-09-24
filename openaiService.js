const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateAIResponse(text) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Temos um canal no Discord onde colocamos diversas frases ditas pela galera, frases que podem ser comprometedoras, quero que você seja um juiz e de um castigo de acordo com a frase, seja mais agressivo e breve.' },
                { role: 'user', content: text }
            ],
            model: 'gpt-3.5-turbo-0125'
        });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao gerar resposta da IA:', error);
        throw error;
    }
}

module.exports = { generateAIResponse };