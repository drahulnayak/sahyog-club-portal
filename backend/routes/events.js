const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// --- THIS IS THE FIX ---
// Import must match the file name exactly: 'event.js' (lowercase)
const Event = require('../models/event');
// --- END FIX ---

const adminAuth = require('../middleware/auth');
const jwtAuth = require('../middleware/jwtAuth');

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'event-' + Date.now() + path.extname(file.originalname));
  }
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
router.post('/upload', adminAuth, upload.single('eventImage'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }
    const imageUrl = `uploads/${req.file.filename}`;
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