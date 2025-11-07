const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Create a post (Allowed: admin, editor)
router.post('/create', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  const { title, body } = req.body;
  const author = req.user.username;
  try {
    const post = new Post({ author, title, body });
    await post.save();
    res.status(201).json({ post });
  } catch (e) {
    res.status(400).json({ error: 'Error creating post' });
  }
});

// View all posts (Allowed: any logged-in user)
router.get('/view', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (e) {
    res.status(400).json({ error: 'Error fetching posts' });
  }
});

module.exports = router;
