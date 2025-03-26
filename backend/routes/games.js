// const express = require('express');
// const router = express.Router();
// const Game = require('../models/Game'); // Assuming the Game model is in models/Game.js

// // Get all games
// router.get('/games', async (req, res) => {
//   try {
//     const games = await Game.find();
//     res.json(games);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get specific game by ID
// router.get('/games/:id', async (req, res) => {
//   try {
//     const game = await Game.findById(req.params.id);
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }
//     res.json(game);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
