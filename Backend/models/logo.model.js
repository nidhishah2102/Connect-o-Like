// models/CommonLogo.js

const mongoose = require('mongoose');

const logo = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
});

const CommonLogo = mongoose.model('Logo', logo);

module.exports = CommonLogo;
