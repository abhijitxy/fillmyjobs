// import OpenAI from "openai";

// // Initialize the OpenAI client
// const client = new OpenAI({
//   apiKey: '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', // Replace with your actual API key
// });

// async function analyzeImage(imageUrl) {
//   try {
//     const response = await client.chat.completions.create({
//       model: 'gpt-4-vision-preview',
//       messages: [
//         {
//           role: 'user',
//           content: [
//             { type: 'text', text: 'What’s in this image?' },
//             { type: 'image_url', image_url: { url: imageUrl } },
//           ],
//         },
//       ],
//       max_tokens: 300,
//     });

//     console.log(response.choices[0].message.content[0].text);
//     // You can process the response further as needed
//   } catch (error) {
//     console.error('Error analyzing image:', error.message);
//   }
// }

// // Call the function with an image URL
// const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg';
// analyzeImage(imageUrl);

// console.log('Image analysis request sent!');