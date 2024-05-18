const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
});

module.exports = mongoose.model('Course', courseSchema);
