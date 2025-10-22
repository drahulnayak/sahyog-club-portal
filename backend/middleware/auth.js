// backend/middleware/auth.js

const adminAuth = (req, res, next) => {
  const password = req.header('x-admin-password');

  if (!password) {
    return res.status(401).json({ message: 'Access Denied. No password provided.' });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ message: 'Invalid Admin Password.' });
  }

  next(); // Password is correct, proceed.
};

module.exports = adminAuth;