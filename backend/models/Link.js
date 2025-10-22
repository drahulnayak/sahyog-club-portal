// models/Link.js
const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  url: { type: String, required: true }, // Changed from googleDriveUrl to url
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Link', LinkSchema);