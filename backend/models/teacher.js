const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  schoolName: String,
  schoolUniqueId: String,
  city: String,
  courses: [{
    _id: false,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    description: String
  }]
});


module.exports = mongoose.model('Teacher', teacherSchema);
