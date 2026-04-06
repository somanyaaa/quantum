const mongoose = require("mongoose");

const quantumUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  experience: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  lookingFor: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("QuantumUser", quantumUserSchema);