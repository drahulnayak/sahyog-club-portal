const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Import models and middleware
const Event = require('../models/Event');
const { adminAuth, jwtAuth } = require('../middleware/auth');

// --- 1. CONFIGURE CLOUDINARY ---
// This uses the environment variables you just set on Render
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

// Remove the old diskStorage
// const storage = multer.diskStorage({ ... });

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
// --- 3. THIS ROUTE IS NOW UPDATED ---
router.post('/upload', adminAuth, upload.single('eventImage'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    // --- 4. GET THE URL FROM CLOUDINARY ---
    // Instead of a local path, req.file.path is now a secure https:// URL
    const imageUrl = req.file.path;

    const newEvent = new Event({ title, description, imageUrl });
    await newEvent.save();
    res.status(201).json({ message: 'Event uploaded successfully!' });
  } catch (error) {
    console.error('Event Upload Error:', error);
    res.status(500).send('Server Error during upload');
  }
});

// PUT /api/events/like/:id - Like or unlike an event
router.put('/like/:id', jwtAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.likes.some(like => like.toString() === req.user.id)) {
      event.likes = event.likes.filter(
        like => like.toString() !== req.user.id
      );
    } else {
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
