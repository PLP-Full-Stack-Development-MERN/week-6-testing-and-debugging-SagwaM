// routes/bugs.js
const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Get all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ updatedAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bug by id
router.get('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create bug
router.post('/', async (req, res) => {
  const bug = new Bug({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  try {
    const newBug = await bug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update bug
router.patch('/:id', async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedBug) return res.status(404).json({ message: 'Bug not found' });
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete bug
router.delete('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    
    await bug.remove();
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
