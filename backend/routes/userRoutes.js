const express = require("express");
const router = express.Router();
const QuantumUser = require("../models/QuantumUser");

// Create user
router.post("/", async (req, res) => {
  const { name, skills } = req.body;
  if (!name || !skills) return res.status(400).json({ message: "Name and skills required" });
  try {
    const user = await QuantumUser.create({ name, skills });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get matches
router.get("/:id", async (req, res) => {
  try {
    const user = await QuantumUser.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const users = await QuantumUser.find({ _id: { $ne: user._id } });
    const matches = users
      .map(u => {
        const common = u.skills.filter(s => user.skills.includes(s));
        const score = common.length;
        return { _id: u._id, name: u.name, skills: u.skills, score };
      })
      .sort((a, b) => b.score - a.score);

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;