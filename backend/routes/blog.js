const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Blog post model

// Create a new post
router.post('/blog', async (req, res) => {
  const { title, content, author } = req.body;
  
  const newPost = new Post({
    title,
    content,
    author,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Return the created post
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts
router.get('/blog', async (req, res) => {
  try {
    const posts = await Post.find(); // Retrieve all posts
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post by ID
router.get('/blog/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post); // Return the post details
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
