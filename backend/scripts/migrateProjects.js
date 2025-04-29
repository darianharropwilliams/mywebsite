// scripts/migrateProjects.js

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/blogDB')
  .then(() => console.log('Connected to MongoDB for migration'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// 2. Load and migrate
const projectsDir = path.join(__dirname, '../../client/src/data/projects');

async function migrate() {
  try {
    // Clear all existing projects
    await Project.deleteMany({});
    console.log('✅ Cleared old projects.');

    // Read all project files
    const files = fs.readdirSync(projectsDir);
    const projectFiles = files.filter(file => file.endsWith('.json'));

    const errors = [];

    for (const file of projectFiles) {
      try {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const projectData = JSON.parse(fileContent);

        // Validate required fields before saving
        if (!projectData.slug || !projectData.title || !projectData.summary) {
          console.warn(`⚠️ Skipping ${file} — missing required fields (slug, title, summary).`);
          errors.push(`Invalid structure: ${file}`);
          continue;
        }

        const newProject = new Project(projectData);
        await newProject.save();
        console.log(`✅ Inserted project: ${projectData.slug}`);
      } catch (fileErr) {
        console.error(`❌ Error processing ${file}:`, fileErr.message);
        errors.push(`Failed to process ${file}: ${fileErr.message}`);
        continue;
      }
    }

    console.log('✅ Migration complete.');

    if (errors.length > 0) {
      console.log('⚠️ Some issues detected:');
      errors.forEach(err => console.log(' -', err));
    }
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

migrate();
