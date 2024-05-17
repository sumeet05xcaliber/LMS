const express = require('express');
const { createCourse, bulkUploadStudents, bulkAssignStudents, bulkCreateTeachers, assignCoursesToTeachers, viewAllStudents, viewAllTeachers } = require('../controllers/admin-controller');

const router = express.Router();

router.post('/create-course', createCourse);
router.post('/bulk-upload-students', bulkUploadStudents);
router.post('/bulk-assign-students', bulkAssignStudents);
router.post('/bulk-create-teachers', bulkCreateTeachers);
router.post('/assign-courses-teachers', assignCoursesToTeachers);
router.get('/view-all-students', viewAllStudents);
router.get('/view-all-teachers', viewAllTeachers);

module.exports = router;
