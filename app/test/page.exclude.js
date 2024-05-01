// import OpenAI from 'openai';
// import { createInterface } from 'readline';

// const readline = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function askFoodAndFetchNutrition() {
//   const openai = new OpenAI(process.env.OPENAI_API_KEY);

//   readline.question('Enter the food item: ', async (food) => {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a helpful assistant designed to output JSON. Give the nutrition information for the following food in Singapore. Give your answer in calories, fat, protein, and carbs.',
//         },
//         {
//           role: 'user',
//           content: `This is the food: ${food}`,
//         },
//       ],
//     });

//     console.log(completion.choices[0].message.content);

//     readline.close();
//   });
// }

// askFoodAndFetchNutrition();
