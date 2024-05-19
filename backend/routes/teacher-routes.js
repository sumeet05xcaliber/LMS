const express=require('express');
const router = express.Router();
const {getAssignedCoursesforTeacher,viewAllStudents,getTeacherInfo}=require('../controllers/teacher-controller');
router.get('/courses/:userId',getAssignedCoursesforTeacher);
router.get('/view-all-students',viewAllStudents);
router.get('/info/:userId',getTeacherInfo);
module.exports=router;