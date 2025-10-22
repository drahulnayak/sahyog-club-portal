const express = require('express');
const router = express.Router();
const User = require('../models/User');

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