const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- THIS IS THE FIX ---
// Import must match the file name exactly: 'User.js' (uppercase)
const User = require('../models/User');
// --- END FIX ---

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error("\n*** FATAL ERROR: JWT_SECRET environment variable is not defined! ***\n");
}

// --- Registration Route ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Basic Input Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password.' });
  }

  try {
    // 2. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // 3. Create new user instance
    user = new User({
      name,
      email,
      password
    });

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Save user to database
    await user.save();

    // 6. Create JWT Payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // 7. Sign JWT Token
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not set!');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    // 8. Send Success Response
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      message: 'User registered successfully!'
    });

  } catch (error) {
    // 9. Handle Errors
    console.error('Registration Server Error:', error.message);
    res.status(500).json({ message: 'Server error during registration. Please try again later.' });
  }
});

// --- Login Route ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Basic Input Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // 2. Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 4. Create JWT Payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // 5. Sign JWT Token
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not set!');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    // 6. Send Success Response
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    // 7. Handle Errors
    console.error('Login Server Error:', error.message);
    res.status(500).json({ message: 'Server error during login. Please try again later.' });
  }
});

module.exports = router;