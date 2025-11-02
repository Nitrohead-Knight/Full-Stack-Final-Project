const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Register a new user (Admin/Editor/Viewer)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login and issue JWT with role
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Registration logic as before...
    // ...
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Only allow admin registration if no admin exists
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Check if an admin already exists
    if (role === 'admin') {
      const adminUser = await User.findOne({ role: 'admin' });
      if (adminUser) {
        // If one exists, deny registration as admin
        return res.status(403).json({ message: 'Admin account already exists. You cannot register as admin.' });
      }
    }
    // Forbid selecting role 'admin' unless it's the first time
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: role === 'admin' ? 'admin' : role });
    await user.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Example protected route: Admin only
router.get('/admin-data', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ secret: 'Admin data' });
});

// Example protected route: Editor and Admin
router.get('/editor-data', authenticateToken, authorizeRoles('admin', 'editor'), (req, res) => {
  res.json({ secret: 'Editor & Admin data' });
});

// Example protected route: All logged-in users
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
