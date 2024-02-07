const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profile: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  connections: {
    type: [],
    default: [],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  social: {
    type: {},
  },
  headline: {
    type: String,
  },
  experience: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  domain: {
    type: String,
    enum: [
      "full stack",
      "android",
      "ios",
      "frontend",
      "backend",
      "devops",
      "data science",
      "machine learning",
      "artificial intelligence",
      "blockchain",
      "cybersecurity",
      "cloud computing",
      "web development",
      "mobile development",
      "game development",
      "ui/ux design",
      "testing",
      "database management",
      "other",
    ],
    lowercase: true,
  },
});

module.exports = mongoose.model("User", userSchema);
