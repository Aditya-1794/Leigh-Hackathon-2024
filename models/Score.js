const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  // Add other fields as needed
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
