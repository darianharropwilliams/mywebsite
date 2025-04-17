const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Blog post model

// Create a new post
router.post('/blog', async (req, res) => {
  const { title, content, author, tags, attachments, links } = req.body;
  
  const newPost = new Post({
    title,
    content,
    author,
    tags,
    attachments,
    links
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Return the created post
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all posts, sorted by datePosted descending
router.get('/blog', async (req, res) => {
  try {
    const posts = await Post.find().sort({ datePosted: -1 });
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

// PUT update post
router.put('/blog/:id', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete('/blog/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
