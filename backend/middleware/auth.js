// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   console.log("this runnnned");
//   if (!token) {
//     console.log('No token found');
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     console.log('Decoded user:', decoded);
//     next();
//   } catch (error) {
//     console.error('Error decoding token:', error.message);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// const roleMiddleware = (roles) => (req, res, next) => {
//   console.log(req);
//   console.log('User role:', req.user ? req.user.role : 'Not available');
//   if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   next();
// };

// module.exports = { authMiddleware, roleMiddleware };
