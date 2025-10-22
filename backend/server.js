require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const linksRoute = require('./routes/links');
const feedbackRoute = require('./routes/feedback');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const eventsRoute = require('./routes/events');
const profileRoute = require('./routes/profile'); // <-- Make sure this line exists

const app = express();

// --- Middleware ---
app.use(cors()); // Allows requests from any origin
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/links', linksRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/profile', profileRoute); // <-- Make sure this line exists

// Start Server & Connect to DB
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas!');
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`✅ Server is running on port ${port}`));
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error);
  }
};

start();