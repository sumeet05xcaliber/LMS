const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

const loginUser = async (req, res, User) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = (req, res) => {
  loginUser(req, res, Admin);
};

exports.teacherLogin = (req, res) => {
  loginUser(req, res, Teacher);
};

exports.studentLogin = (req, res) => {
  loginUser(req, res, Student);
};

exports.registerAdmin = registerAdmin;
