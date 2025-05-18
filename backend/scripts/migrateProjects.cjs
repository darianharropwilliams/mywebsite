// scripts/migrateProjects.cjs

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

async function runMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for migration');

    const projectsDir = path.join(__dirname, '../../client/src/data/projects');

    // Clear all existing projects
    await Project.deleteMany({});
    console.log('Cleared old projects.');

    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.json'));
    const errors = [];

    for (const file of files) {
      try {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const projectData = JSON.parse(fileContent);

        if (!projectData.slug || !projectData.title || !projectData.summary) {
          console.warn(`Skipping ${file} missing required fields`);
          errors.push(file);
          continue;
        }

        await new Project(projectData).save();
        console.log(`Inserted project: ${projectData.slug}`);
      } catch (fileErr) {
        console.error(`Failed to insert ${file}:`, fileErr.message);
        errors.push(file);
      }
    }

    console.log('Migration complete.');
    if (errors.length > 0) {
      console.log('Issues found in:');
      errors.forEach(e => console.log(' -', e));
    }
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

runMigration();
