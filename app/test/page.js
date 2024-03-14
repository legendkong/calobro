import React from 'react';
import OpenAI from 'openai';

export default async function page() {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant designed to output JSON.',
      },
      {
        role: 'user',
        content:
          'What is the nutrition information for singapores ya kun set a? Give your answer in calorie, fat, protein and carbs',
      },
    ],
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
  });
  console.log(completion.choices[0].message.content);
  return <div>{completion.choices[0].message.content}</div>;
}
