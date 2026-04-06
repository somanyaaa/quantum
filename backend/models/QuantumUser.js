const mongoose = require("mongoose");

const quantumUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model("QuantumUser", quantumUserSchema);