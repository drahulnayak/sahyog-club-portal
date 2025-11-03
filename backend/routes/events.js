const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Import Event model (matches 'Event.js' file name)
const Event = require('../models/Event');

// --- THIS IS THE FIX ---
// Import BOTH functions from your single middleware file using destructuring
const { adminAuth, jwtAuth } = require('../middleware/auth');
// --- END FIX ---

// --- 1. CONFIGURE CLOUDINARY ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- 2. CONFIGURE MULTER STORAGE TO USE CLOUDINARY ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sahyog-events', // A folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// --- ROUTES ---

// GET /api/events - Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/events/upload - Admin uploads a new event
// This route now correctly uses the imported 'adminAuth'
router.post('/upload', adminAuth, upload.single('eventImage'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }
    const imageUrl = req.file.path; // This is the Cloudinary URL
    const newEvent = new Event({ title, description, imageUrl });
    await newEvent.save();
    res.status(201).json({ message: 'Event uploaded successfully!' });
  } catch (error) {
    console.error('Event Upload Error:', error);
    res.status(500).send('Server Error during upload');
  }
});

// PUT /api/events/like/:id - Like or unlike an event
// This route now correctly uses the imported 'jwtAuth'
router.put('/like/:id', jwtAuth, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id);
    const event = await Event.findById(req.params.id);

    if (event.likes.some(like => like.toString() === req.user.id)) {
      event.likes = event.likes.filter(
        like => like.toString() !== req.user.id
      );
    } else {
      console.log("liked")
      event.likes.push(req.user.id);
    }

    await event.save();
    res.json(event.likes); // Return the updated likes array
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;