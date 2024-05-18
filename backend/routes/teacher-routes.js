const express=require('express');
const router = express.Router();
const {getAssignedCoursesforTeacher,viewAllStudents}=require('../controllers/teacher-controller');
router.get('/courses',getAssignedCoursesforTeacher);
router.get('/view-all-students',viewAllStudents);
module.exports=router;