const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: String,
  father: String,
  contact: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  grade: String,
  academicYear: {
    type: String,
    default: new Date().getFullYear().toString(),
  },
  dob: Date,
  uniqueStudentId: {
    type: String,
    unique: true,
    required: true,
  },
  schoolName: String,
  schoolId: String,
  city: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
