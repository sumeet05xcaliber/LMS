const Student = require('../models/student');

exports.getAssignedCoursesforStudent = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from request params

    const student = await Student.findById(userId).populate('courses');

    if (!student) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    res.status(200).json({ courses: student.courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getStudentInfo = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from request params

    const student = await Student.findById(userId);

    if (!student) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    res.status(200).json({ 
      name: student.name,
      father: student.father,
      contact:student.contact,
      grade: student.grade,
      email: student.email,
      academicYear:student.academicYear,
      dob:student.dob,
      schoolName:student.schoolName,
      studentId:student.uniqueStudentId,
      city:student.city
      // Add any other fields you need to send to the frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};