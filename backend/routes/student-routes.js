const express=require('express');
const router = express.Router();
const {getAssignedCoursesforStudent,getStudentInfo}=require('../controllers/student-controller');
router.get('/courses/:userId',getAssignedCoursesforStudent);
router.get('/info/:userId',getStudentInfo);
module.exports=router;