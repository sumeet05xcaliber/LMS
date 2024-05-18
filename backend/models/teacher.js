// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const teacherSchema = new mongoose.Schema({
//   name: String,
//   contact: String,
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   schoolName: String,
//   schoolUniqueId: String,
//   city: String,
//   courses: [{
//     _id: false,
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//     title: String,
//     description: String
//   }]
// });


// module.exports = mongoose.model('Teacher', teacherSchema);

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
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

module.exports = mongoose.model('Teacher', teacherSchema);
