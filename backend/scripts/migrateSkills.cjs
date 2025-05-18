// scripts/migrateSkills.cjs

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Skill = require('../models/Skill.js');

// Mapping for directories to their "type" and subdirectory names to "subfield"
const BASE_DIR = path.join(__dirname, '../../client/src/data/skills');

const CATEGORY_MAP = {
  tools: 'Tools',
  languages: 'Languages',
  libraries: 'Libraries'
};

// Title-casing helper for subfields
function formatSubfieldName(name) {
  return name
    .replace(/\.json$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Collect and format skills
function loadSkillsFromDirectory(basePath) {
  const allSkills = [];

  for (const categoryDir of fs.readdirSync(basePath)) {
    const categoryPath = path.join(basePath, categoryDir);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const type = CATEGORY_MAP[categoryDir.toLowerCase()];
    if (!type) continue;

    for (const file of fs.readdirSync(categoryPath)) {
      if (!file.endsWith('.json')) continue;

      const subfield = formatSubfieldName(file);
      const filePath = path.join(categoryPath, file);
      const rawSkills = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      const enrichedSkills = rawSkills.map(item => ({
        ...item,
        type,
        subfield
      }));

      allSkills.push(...enrichedSkills);
    }
  }

  return allSkills;
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Skill.deleteMany({});
    console.log('🧹 Cleared existing skills');

    const allSkills = loadSkillsFromDirectory(BASE_DIR);
    await Skill.insertMany(allSkills);
    console.log(`✅ Inserted ${allSkills.length} skills`);

    mongoose.disconnect();
  } catch (err) {
    console.error('🚨 Migration error:', err);
    process.exit(1);
  }
})();
