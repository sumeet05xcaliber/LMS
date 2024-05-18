const express = require('express');
const { createCourse, bulkUploadStudents, bulkAssignStudents, bulkCreateTeachers, assignCoursesToTeachers, viewAllStudents, viewAllTeachers, bulkDeassignStudents, bulkDeassignCoursesFromTeachers,addChapter,getChapters,addLesson,getLessons } = require('../controllers/admin-controller');

const router = express.Router();

router.post('/create-course', createCourse);
router.post('/bulk-upload-students', bulkUploadStudents);
router.post('/bulk-assign-students', bulkAssignStudents);
router.post('/bulk-deassign-students',bulkDeassignStudents);
router.post('/bulk-create-teachers', bulkCreateTeachers);
router.post('/bulk-assign-teachers', assignCoursesToTeachers);
router.post('/bulk-deassign-teachers',bulkDeassignCoursesFromTeachers)
router.get('/view-all-students', viewAllStudents);
router.get('/view-all-teachers', viewAllTeachers);
router.post('/add-course-chapter',addChapter);
router.get('/get-course-chapter/:courseId',getChapters);
router.post('/add-chapter-lesson',addLesson);
router.get('/get-chapter-lesson/:chapterId',getLessons);

module.exports = router;
