const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Score = require('./models/Score');

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