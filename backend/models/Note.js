const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
