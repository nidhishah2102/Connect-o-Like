const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  location: {
    type: String
  },
  domain: {
    type: String,
    enum: ['full stack developer', 'mobile app developer', 'frontend developer', 'backend developer', 'devops developer', 'data engineer', 'other']
  }
});

module.exports = mongoose.model("User", userSchema);
