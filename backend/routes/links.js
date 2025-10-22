const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const adminAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { year, branch, semester } = req.query;
    const filter = {};
    if (year) filter.year = year;
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    const links = await Link.find(filter).sort({ uploadedAt: -1 });
    res.json({ links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/upload', adminAuth, async (req, res) => {
  try {
    const { title, branch, year, semester, url } = req.body;
    const newLink = new Link({ title, branch, year, semester, url });
    await newLink.save();
    res.status(201).json({ message: 'Link uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;