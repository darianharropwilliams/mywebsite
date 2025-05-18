// controllers/skillController.js

const Skill = require('../models/Skill');

// GET all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills', error: err.message });
  }
};
