const crypto = require('crypto');

// Function to generate a JWT secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate a JWT secret key
const jwtSecret = generateJWTSecret();

// Log the generated JWT secret key
console.log(`Generated JWT secret key: ${jwtSecret}`);
