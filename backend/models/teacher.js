const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  schoolName: String,
  schoolId: String,
  city: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

teacherSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Teacher', teacherSchema);
