const express=require('express');
const router = express.Router();
const {getAssignedCoursesforStudent}=require('../controllers/student-controller');
router.get('/courses',getAssignedCoursesforStudent);
module.exports=router;