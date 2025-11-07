const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Prevent duplicate usernames
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Allow only one admin, restrict further admin registration
    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (adminExists) {
        return res.status(400).json({ message: "Admin user already exists" });
      }
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.log("Login error:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
