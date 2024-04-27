// //const { CohereClient } = require('cohere-ai');
// import CohereClient from 'cohere-ai';

// export default function test() {
//   console.log('the test function is being run');
// };

// const cohere = new CohereClient({
//   token: 'o6wravLGPwpZ5lT5EpXKPfMHTS3DjI5I7uU6VsRf',
// });

// window.getAPIFeedback = async (prompt) => {
//   console.log('accessing API');
//   const chatStream = await cohere.chatStream({
//     chatHistory: [],
//     message: prompt,
//     // perform web search before answering the question. You can also use your own custom connector.
//     connectors: [{ id: 'web-search' }],
//   });

//   let messageText = '';
//   for await (const message of chatStream) {
//     if (message.eventType === 'text-generation') {
//       messageText += message.text;
//     }
//   }

//   return messageText;
// };

// window.getFeedback = function (s, h, p, ph, r) {
//   console.log('started');
  
//   //get stuff
//   const sleepTimeForFeedback = s
//   const homeworkTimeForFeedback = h
//   const phoneTimeForFeedback = p
//   const physicalTimeForFeedback = ph
//   const relaxTimeForFeedback = r

//   //build prompt
//   const prompt = 'I slept for ' + sleepTimeForFeedback + ' hours, did homework for ' + homeworkTimeForFeedback + ' hours, used their phone for ' + phoneTimeForFeedback + ' hours, did physical exercises for ' + physicalTimeForFeedback + ' hours, and relaxed for ' + relaxTimeForFeedback + ' hours. Give me detailed feedback on how they can improve their productivity by changing the amount of time they spend on any of these factors.'

//   console.log('prompt built')

//   //call api
//   const feedbackResult = getAPIFeedback(prompt);
//   return feedbackResult;
// }
