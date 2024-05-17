const express = require('express');
const { adminLogin, teacherLogin, studentLogin, registerAdmin } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/admin-login', adminLogin);
router.post('/teacher-login', teacherLogin);
router.post('/student-login', studentLogin);
router.post('/register-admin', registerAdmin);

module.exports = router;
