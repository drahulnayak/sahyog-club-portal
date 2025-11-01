const express = require('express');
const router = express.Router();
// --- THIS IS THE FIX ---
// Import must match the file name exactly: 'user.js' (lowercase)
const User = require('../models/user');
// --- END FIX ---

// @route   GET /api/users/count
// @desc    Get the total number of registered users
router.get('/count', async (req, res) => {
  try {
    // Use the countDocuments method to efficiently get the count
    const userCount = await User.countDocuments();
    res.json({ count: userCount });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;