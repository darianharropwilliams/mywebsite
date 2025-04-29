// models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  tech: { type: [String], default: [] },
  image: { type: String },
  date: { type: String },
  featured: { type: Boolean, default: false },
  description: {
    situation: String,
    task: String,
    action: String,
    result: String
  },
  challenges: { type: [String], default: [] },
  contributions: { type: [String], default: [] },
  links: { 
    type: [{ label: String, url: String }], 
    default: [] 
  },
  skills: { type: [String], default: [] },
  achievements: { type: String },
  resume_bullet: { type: String },
  story_mode: { type: String }
});

module.exports = mongoose.model('Project', ProjectSchema);
