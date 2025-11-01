const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this path points correctly to your User model

// --- Configuration Check ---
// It's crucial that JWT_SECRET is defined in your environment variables (e.g., on Render)
if (!process.env.JWT_SECRET) {
  console.error("\n*** FATAL ERROR: JWT_SECRET environment variable is not defined! ***\n");
  // Optional: Throw an error to prevent the app from starting incorrectly in some setups
  // throw new Error("JWT_SECRET environment variable is missing.");
}

// --- Registration Route ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Basic Input Validation
  if (!name || !email || !password) {
    // Check if essential fields are provided
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
      password // Password will be hashed before saving
    });

    // 4. Hash password
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // 5. Save user to database
    await user.save();

    // 6. Create JWT Payload
    const payload = {
      user: {
        id: user.id // MongoDB uses 'id' as a virtual getter for '_id'
      }
    };

    // 7. Sign JWT Token (Check secret again just in case)
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not available during token signing!');
      return res.status(500).json({ message: 'Server configuration error.' });
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '3h' } // Token valid for 3 hours
    );

    // 8. Send Success Response (Token + User Info) ✨
    res.status(201).json({
      token,
      user: { // Send back user info needed by frontend (excluding password!)
        id: user.id,
        name: user.name,
        email: user.email
        // Add any other non-sensitive fields if needed
      },
      message: 'User registered successfully!'
    });

  } catch (error) {
    // 9. Handle Errors
    console.error('Registration Server Error:', error.message); // Log the specific error
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
      // Use a generic message for security (don't reveal if email exists)
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Use a generic message for security
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 4. Create JWT Payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // 5. Sign JWT Token (Check secret again just in case)
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not available during token signing!');
      return res.status(500).json({ message: 'Server configuration error.' });
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '3h' } // Token valid for 3 hours
    );

    // 6. Send Success Response (Token + User Info) ✨
    res.json({ // Default status is 200 OK
      token,
      user: { // Send back user info needed by frontend (excluding password!)
        id: user.id,
        name: user.name,
        email: user.email
        // Add any other non-sensitive fields if needed
      }
    });

  } catch (error) {
    // 7. Handle Errors
    console.error('Login Server Error:', error.message); // Log the specific error
    res.status(500).json({ message: 'Server error during login. Please try again later.' });
  }
});

module.exports = router; // Export the router for use in your main server file