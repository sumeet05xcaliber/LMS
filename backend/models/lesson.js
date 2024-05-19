const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  content: {
    type: String, // You can store the PDF file path or link here
    required: true
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
