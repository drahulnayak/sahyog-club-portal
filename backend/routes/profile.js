const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwtAuth = require('../middleware/jwtAuth'); // Middleware to check login token
const User = require('../models/user');

// Configure multer storage for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save to the uploads folder
  filename: (req, file, cb) => {
    // Create a unique filename based on user ID to prevent overwrites
    cb(null, 'profile-' + req.user.id + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// @route   POST /api/profile/upload-picture
// @desc    Upload or update user profile picture
// @access  Private (Requires login token)
router.post('/upload-picture', [jwtAuth, upload.single('profilePic')], async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload an image file.' });
    }

    // Find the user in the database using the ID from the JWT token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Construct the URL path for the saved image
    const imageUrl = `uploads/${req.file.filename}`;

    // Update the user's profile picture URL
    user.profilePictureUrl = imageUrl;
    await user.save();

    // Send back a success message and the updated user info (excluding password)
    res.json({ 
      msg: 'Profile picture updated successfully', 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl 
      } 
    });

  } catch (err) {
    console.error('Profile Picture Upload Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;