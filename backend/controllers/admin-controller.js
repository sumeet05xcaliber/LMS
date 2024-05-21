const Admin = require('../models/admin');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Chapter=require('../models/chapter');
const Lesson=require('../models/lesson');



const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const generateUniqueId = () => {
  return uuidv4();
};

// const generateSchoolUniqueId = (schoolName) => {
//   return crypto.createHash('md5').update(schoolName).digest('hex');
// };

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk upload students to a course
exports.bulkUploadStudents = async (req, res) => {
  try {
    const students = req.body.students;
    console.log(students);
    const academicYear = new Date().getFullYear();

    const studentPromises = students.map(async (studentData) => {
      const { name, father, contact, email, password, grade, dob, schoolName,schoolUniqueId, city } = studentData;
      const uniqueStudentId = generateUniqueId(); 

      const student = new Student({ 
        name, father, contact, email, password, grade, academicYear, dob, uniqueStudentId, schoolName, schoolUniqueId, city 
      });
      await student.save();
      return student;
    });

    const createdStudents = await Promise.all(studentPromises);
    res.status(201).json({ message: 'Students uploaded successfully', students: createdStudents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk assign/deassign students to/from a course
// exports.bulkAssignStudents = async (req, res) => {
//   try {
//     const { courseId, studentIds } = req.body; // Assuming courseId and studentIds are sent in the request body
//     const students = await Student.find({ _id: { $in: studentIds } });
//     const course = await Course.findById(courseId);

//     students.forEach(async (student) => {
//       if (!student.courses.includes(courseId)) {
//         student.courses.push({
//           courseId: courseId,
//           title: course.title,
//           description: course.description
//         });
//         await student.save();
//       }
//     });

//     course.students.push(...studentIds);
//     await course.save();

//     res.status(200).json({ message: 'Courses assigned successfully to students' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



exports.bulkAssignStudents = async (req, res) => {
  try {
    const { courseId, studentIds } = req.body; // Assuming courseId and studentIds are sent in the request body

    const students = await Student.find({ _id: { $in: studentIds } });
    const course = await Course.findById(courseId)
      .populate({
        path: 'chapters',
        populate: {
          path: 'lessons'
        }
      });

    const courseDetails = {
      courseId: course._id,
      title: course.title,
      description: course.description,
      chapters: course.chapters.map(chapter => ({
        chapterId: chapter._id,
        title: chapter.title,
        lessons: chapter.lessons.map(lesson => ({
          lessonId: lesson._id,
          title: lesson.title,
          content: lesson.content,
          order: lesson.order
        }))
      }))
    };

    for (const student of students) {
      const existingCourse = student.courses.find(c => c.courseId.toString() === courseId);
      if (!existingCourse) {
        student.courses.push(courseDetails);
        await student.save();
      }
    }

    course.students.push(...studentIds);
    await course.save();

    res.status(200).json({ message: 'Courses assigned successfully to students' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.bulkDeassignStudents = async (req, res) => {
  try {
    const { courseId, studentIds } = req.body; // Assuming courseId and studentIds are sent in the request body
    const students = await Student.find({ _id: { $in: studentIds } });

    // Update each student
    for (const student of students) {
      const index = student.courses.findIndex(course => course.courseId.toString() === courseId);
      if (index !== -1) {
        student.courses.splice(index, 1);
        await student.save();
      }
    }

    // Update the course to remove student IDs
    const course = await Course.findById(courseId);
    course.students = course.students.filter(studentId => !studentIds.includes(studentId.toString()));
    await course.save();

    res.status(200).json({ message: 'Courses deassigned successfully from students' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Bulk create teachers
exports.bulkCreateTeachers = async (req, res) => {
  try {
    const teachers = req.body.teachers; // Assuming teachers data is sent in the body as an array of teacher objects

    const teacherPromises = teachers.map(async (teacherData) => {
      const { name, contact, email, password, schoolName,schoolUniqueId, city } = teacherData;

      const teacher = new Teacher({ 
        name, contact, email, password, schoolName,schoolUniqueId, city 
      });
      await teacher.save();
      return teacher;
    });

    const createdTeachers = await Promise.all(teacherPromises);
    res.status(201).json({ message: 'Teachers created successfully', teachers: createdTeachers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Assign/deassign courses to/from teachers
// exports.assignCoursesToTeachers = async (req, res) => {
//   try {
//     const { courseId, teacherIds } = req.body; // Assuming courseId and teacherIds are sent in the request body
//     const teachers = await Teacher.find({ _id: { $in: teacherIds } });
//     const course =await Course.findById(courseId);

//     teachers.forEach(async (teacher) => {
//       if (!teacher.courses.includes(courseId)) {
//         teacher.courses.push({
//           courseId:courseId,
//           title:course.title,
//           description:course.description
//         });
//         await teacher.save();
//       }
//     });

//     course.teachers.push(...teacherIds);
//     await course.save();

//     res.status(200).json({ message: 'Courses assigned successfully to teachers' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


exports.assignCoursesToTeachers = async (req, res) => {
  try {
    const { courseId, teacherIds } = req.body; // Assuming courseId and teacherIds are sent in the request body
    const teachers = await Teacher.find({ _id: { $in: teacherIds } });
    const course = await Course.findById(courseId)
      .populate({
        path: 'chapters',
        populate: {
          path: 'lessons'
        }
      });

    const courseDetails = {
      courseId: course._id,
      title: course.title,
      description: course.description,
      chapters: course.chapters.map(chapter => ({
        chapterId: chapter._id,
        title: chapter.title,
        lessons: chapter.lessons.map(lesson => ({
          lessonId: lesson._id,
          title: lesson.title,
          content: lesson.content,
          order: lesson.order
        }))
      }))
    };

    for (const teacher of teachers) {
      if (!teacher.courses.some(c => c.courseId.toString() === courseId)) {
        teacher.courses.push(courseDetails);
        await teacher.save();
      }
    }

    course.teachers.push(...teacherIds);
    await course.save();

    res.status(200).json({ message: 'Courses assigned successfully to teachers' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.bulkDeassignCoursesFromTeachers = async (req, res) => {
  try {
    const { courseId, teacherIds } = req.body; // Assuming courseId and teacherIds are sent in the request body

    // Remove the course from the teachers' courses array
    const teachers = await Teacher.find({ _id: { $in: teacherIds } });

    for (const teacher of teachers) {
      console.log(teacher.courses);  
      const courseIndex = teacher.courses.findIndex(course => course.courseId.toString() === courseId);

      if (courseIndex !== -1) {
        teacher.courses.splice(courseIndex, 1);
        await teacher.save();
      }
    }

    // Remove the teachers from the course's teachers array
    const course = await Course.findById(courseId);
    course.teachers = course.teachers.filter(teacherId => !teacherIds.includes(teacherId.toString()));
    await course.save();

    res.status(200).json({ message: 'Courses deassigned successfully from teachers' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// View all students
exports.viewAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all teachers
exports.viewAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.addChapter = async (req, res) => {
  try {
    const { courseId, title } = req.body;

    const chapter = new Chapter({ title, course: courseId });
    await chapter.save();

    const course = await Course.findById(courseId);
    course.chapters.push(chapter._id);
    await course.save();

    res.status(201).json({ message: 'Chapter added successfully', chapter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.getChapters = async (req, res) => {
  try {
    const { courseId } = req.params;

    const chapters = await Chapter.find({ course: courseId }).populate('lessons');

    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.addLesson = async (req, res) => {
  try {
    const { chapterId, content } = req.body;

    const lesson = new Lesson({ content, chapter: chapterId });
    await lesson.save();

    const chapter = await Chapter.findById(chapterId);
    chapter.lessons.push(lesson._id);
    await chapter.save();

    res.status(201).json({ message: 'Lesson added successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getLessons = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await Chapter.findById(chapterId).populate('lessons');

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json(chapter.lessons);
  } catch (error) {
    res.status500().json({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: 'students',
        select: 'name email grade schoolName uniqueStudentId'
      })
      .populate({
        path: 'teachers',
        select: 'name email schoolName'
      })
      .populate({
        path: 'chapters',
        populate: {
          path: 'lessons',
          select: 'title content'
        }
      });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
