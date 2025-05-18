// models/Skill.js

const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  source: { type: String },
  type: { type: String, required: true },
  subfield: { type: String, required: true }
});

module.exports = mongoose.model('Skill', SkillSchema);
