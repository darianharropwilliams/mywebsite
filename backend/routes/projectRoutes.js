// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// /api/projects
router.get('/projects', projectController.getProjects);

// /api/projects/:slug
router.get('/projects/:slug', projectController.getProjectBySlug);

module.exports = router;

