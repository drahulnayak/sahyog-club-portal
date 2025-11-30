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
const profileRoute = require('./routes/profile');


const app = express();


// --- Middleware ---

// === THIS IS THE CORRECTION ===
// Setup secure CORS to only allow your frontend
// It reads the URL from your environment variables (e.g., your Netlify or Render frontend URL)
if (!process.env.CORS_ORIGIN) {
  console.warn('CORS_ORIGIN is not set. Defaulting to allow all origins.');
}
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Fallback to all origins if not set
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// === END OF CORRECTION ===

app.use(express.json()); // Body parser

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/links', linksRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/profile', profileRoute);

// Start Server & Connect to DB
const start = async () => {
  try {
    // Ensure you have a MONGO_URI variable set in your Render environment
    if (!process.env.MONGO_URI) {
        throw new Error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas!');

    // Render provides its own port, or defaults to 4000
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`✅ Server is running on port ${port}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); // Exit if connection fails
  }
};

start();
