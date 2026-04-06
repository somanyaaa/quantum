require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the Database
// This looks for your secret link in the .env file
mongoose.connect("mongodb+srv://hackathonuser:manu123@cluster0.jutxdtw.mongodb.net/DevMatch?retryWrites=true&w=majority")
  .then(() => console.log("✅ Database Connected!"))
  .catch(err => console.log("❌ DB Error: ", err));

// Define what a "User" looks like
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  role: String
}));

// Route 1: Save a new user
app.post('/api/users', async (req, res) => {
 try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send("Error saving user to database");
  }
});

// Route 2: Get all users (to see if it worked)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// THE MATCHING LOGIC

app.get('/api/match/:id', async (req, res) => {
  try {
    // Find the student who is looking for a team
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    // Find everyone else
    const others = await User.find({ _id: { $ne: user._id } });

    // Compare skills and give a score
    const matches = others.map(other => {
      const common = other.skills.filter(s => user.skills.includes(s));
      return { ...other._doc, score: common.length };
    }).sort((a, b) => b.score - a.score); // Best matches at the top

    res.json(matches);
  } catch (err) {
    res.status(500).send("Error calculating matches");
  }
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running on Port 5000"));