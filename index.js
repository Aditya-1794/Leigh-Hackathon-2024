const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Score = require('./models/Score');

const { CohereClient } = require('cohere-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://hrudayiitb:TkpBlr_301@cluster0.ccgy8a4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

console.log('Connecting to MongoDB Atlas...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define API endpoints as before

// Define API endpoints as before



// Get leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add score
app.post('/add-score', async (req, res) => {
  try {
    const { username, score } = req.body;
    const newScore = new Score({ username, score: parseInt(score, 10) });
    await newScore.save();
    res.json({ message: 'Score added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Assuming you have an existing Express app initialized

// Get scores based on username
app.get('/scores/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch scores from MongoDB Atlas based on username
    const scores = await Score.find({ username });

    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Define route to handle feedback request
app.post('/api/getFeedback', async (req, res) => {
  //console.log('node received req');
  try {
    //console.log('Received feedback request');
    const { s, h, p, ph, r } = req.body;
    console.log('Request body:', req.body);
    const prompt = `I slept for ${s} hours, did homework for ${h} hours, used my phone for ${p} hours, did physical exercises for ${ph} hours, and relaxed for ${r} hours. Give me a one detailed paragraph with no bullet points of what factors I should increase or decrease and how I can change them to increase my productivity. Make sure your response is around 200 words. Don't bold or italicize any words in the response`;

    //console.log('Prompt built:', prompt);

    // Call Cohere API to get feedback
    //Initialize Cohere client
    const cohere = new CohereClient({
      token: 'o6wravLGPwpZ5lT5EpXKPfMHTS3DjI5I7uU6VsRf',
    });
    
    const chatStream = await cohere.chatStream({
      chatHistory: [],
      message: prompt,
      connectors: [{ id: 'web-search' }],
    });

    let messageText = '';
    for await (const message of chatStream) {
      if (message.eventType === 'text-generation') {
        messageText += message.text;
      }
    }

    //console.log('Feedback received:', messageText);

    // Send feedback back to client
    res.json({ feedbackResult: messageText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});