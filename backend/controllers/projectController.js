// controllers/projectController.js

const Project = require('../models/Project');

// GET all project previews
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}, 'slug title summary tech image date featured'); // Only select preview fields
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// GET full project by slug
exports.getProjectBySlug = async (req, res) => {
  // console.log('Fetching project for slug:', req.params.slug);

  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      // console.log('Project not found for slug:', req.params.slug);
      return res.status(404).json({ message: 'Project not found' });
    }

    // console.log('Project found:', project.slug);
    res.json(project);
  } catch (err) {
    // console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

