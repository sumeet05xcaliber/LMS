const Student = require('../models/student');

exports.getAssignedCoursesforStudent = async (req, res) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const student = await Student.findById(userId).populate('courses');

    if (!student) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    res.status(200).json({ courses: student.courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
