const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/quantum")
  .then(() => console.log("Quantum DB Connected"))
  .catch(err => console.log(err));

// Model
const User = require("./models/QuantumUser");

// Routes

// Create Quantum Profile
app.post("/quantum/user", async (req, res) => {
  try {
    const { name, skills, experience, lookingFor } = req.body;

    if (!name || !skills || skills.length === 0) {
      return res.status(400).json({ message: "Invalid Quantum Data" });
    }

    const user = new User({
      name,
      skills,
      experience,
      lookingFor
    });

    await user.save();

    res.json({
      message: "Quantum Profile Created",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Quantum Match Engine
app.get("/quantum/match/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const users = await User.find({ _id: { $ne: currentUser._id } });

    if (users.length === 0) {
      return res.json({ message: "No quantum states available" });
    }

    let bestMatch = null;
    let maxScore = -1;
    let matchDetails = {};

    users.forEach(user => {
      let score = 0;
      let commonSkills = [];

      //Skill Entanglement
      user.skills.forEach(skill => {
        if (currentUser.skills.includes(skill)) {
          score += 3;
          commonSkills.push(skill);
        }
      });

      //Intent Matching
      if (
        currentUser.lookingFor &&
        user.skills.includes(currentUser.lookingFor)
      ) {
        score += 4;
      }

      //Experience Sync
      if (currentUser.experience === user.experience) {
        score += 2;
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = user;
        matchDetails = { commonSkills };
      }
    });

    const percentage = Math.min((maxScore / 15) * 100, 100);

    res.json({
      _QuantumMatch: bestMatch,
      score: maxScore,
      matchPercentage: percentage.toFixed(2) + "%",
      entanglement: matchDetails
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Quantum Server running on port 3000");
});