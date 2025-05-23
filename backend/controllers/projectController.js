// controllers/projectController.js

const Project = require('../models/Project');

// GET all project previews
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}, 'slug title summary tech featured purpose');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// GET full project by slug
exports.getProjectBySlug = async (req, res) => {
  const rawSlug = req.params.slug;

  try {
    const allProjects = await Project.find({}, 'slug');
    const slugs = allProjects.map(p => `"${p.slug}"`);

    const project = await Project.findOne({
      slug: new RegExp(`^${rawSlug}$`, 'i') // Case-insensitive match
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('🚨 Error fetching project:', err);
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

