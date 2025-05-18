// routes/skillRoutes.js

const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// /api/skills
router.get('/skills', skillController.getSkills);

module.exports = router;
