// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   father: { type: String, required: true },
//   contact: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   grade: { type: String, required: true },
//   academicYear: {
//     type: String,
//     default: new Date().getFullYear().toString(),
//   },
//   dob: { type: Date, required: true },
//   uniqueStudentId: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   schoolName: { type: String, required: true },
//   schoolUniqueId: { type: String, required: true },
//   city: { type: String, required: true },
//   courses: [{
//     _id: false,
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//     title: String,
//     description: String
//   }]
// });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  father: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  grade: { type: String, required: true },
  academicYear: { type: String, required: true },
  dob: { type: Date, required: true },
  uniqueStudentId: { type: String, required: true },
  schoolName: { type: String, required: true },
  schoolUniqueId: { type: String, required: true },
  city: { type: String, required: true },
  courses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    description: String,
    chapters: [{
      chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
      title: String,
      lessons: [{
        lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        title: String,
        content: String,
        order: Number
      }]
    }]
  }]
});

module.exports = mongoose.model('Student', studentSchema);
