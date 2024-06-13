const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

module.exports = mongoose.model('Image', imageSchema);
