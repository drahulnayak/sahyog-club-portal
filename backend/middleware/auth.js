const jwt = require('jsonwebtoken');

// --- Middleware 1: Admin Password Check ---
// This checks for the 'x-admin-password' header
const adminAuth = (req, res, next) => {
  const password = req.header('x-admin-password');

  if (!password) {
    return res.status(401).json({ message: 'Access Denied: No admin password provided.' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    next(); // Password is correct, proceed
  } else {
    return res.status(403).json({ message: 'Access Denied: Invalid admin password.' });
  }
};

// --- Middleware 2: User Login (JWT) Check ---
// This checks for the 'x-auth-token' header for liking posts
// the next code is meant to be used as middleware in express routes
const jwtAuth = (req, res, next) => {

  console.log("HII from jwtAuth middleware");
  const token = req.header('x-auth-token');

  if (!token) {
    console.log("No token found in request headers");
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    console.log("Verifying token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- Export BOTH functions ---
module.exports = {
  adminAuth,
  jwtAuth
};