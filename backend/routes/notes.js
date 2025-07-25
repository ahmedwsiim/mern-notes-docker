const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Create a note
router.post('/', async (req, res) => {
  const newNote = new Note(req.body);
  const saved = await newNote.save();
  res.json(saved);
});

// Delete a note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
