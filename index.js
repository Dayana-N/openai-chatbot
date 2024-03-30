import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are helpful assistant.',
      },
      {
        role: 'user',
        content: `What is the capital of Ireland`,
      },
    ],
    temperature: 2,
    model: 'gpt-4',
  });

  console.log(completion.choices[0].message.content);
}

main();
