const Teacher = require('../models/teacher');
const Student=require('../models/student');
const Course = require('../models/course');



exports.getAssignedCoursesforTeacher = async (req, res) => {
  try {
    const userId = req.params.userId;

    
    const teacher = await Teacher.findById(userId).populate('courses');

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher Not Found' });
    }

    res.status(200).json({ courses: teacher.courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.viewAllStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



exports.getTeacherInfo = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from request params

    const teacher = await Teacher.findById(userId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher Not Found' });
    }

    res.status(200).json({ 
      name: teacher.name,
      contact: teacher.contact,
      email: teacher.email,
      schoolName: teacher.schoolName,
      schoolUniqueId: teacher.schoolUniqueId,
      city: teacher.city
      // Add any other fields you need to send to the frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};