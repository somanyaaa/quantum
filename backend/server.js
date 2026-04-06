const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devmatch";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], default: [] },
  skillLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  projects: { type: Number, default: 0 },
  commits: { type: Number, default: 0 },
  lookingFor: {
    skills: { type: [String], default: [] },
    minLevel: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  },
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(400).json({ error: "Unable to create user", details: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error("Users fetch error:", error.message);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
});

function normalizeLevel(level) {
  const order = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };
  return order[level] || 0;
}

function calculateMatchScore(user, candidate) {
  let score = 0;

  if (!user || !candidate) {
    return score;
  }

  const commonSkills = user.lookingFor?.skills?.filter((skill) =>
    candidate.skills.includes(skill)
  ) || [];
  score += commonSkills.length * 10;

  const userMinLevel = user.lookingFor?.minLevel;
  if (userMinLevel && normalizeLevel(candidate.skillLevel) >= normalizeLevel(userMinLevel)) {
    score += 20;
  }

  score += Math.min(candidate.projects || 0, 10);
  score += Math.min((candidate.commits || 0) / 50, 10);

  return Math.round(score * 100) / 100;
}

app.get("/match/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const candidates = await User.find({ _id: { $ne: user._id } });
    const matches = candidates
      .map((candidate) => ({
        user: candidate,
        score: calculateMatchScore(user, candidate),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return res.json(matches);
  } catch (error) {
    console.error("Match error:", error.message);
    return res.status(500).json({ error: "Unable to calculate matches" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});