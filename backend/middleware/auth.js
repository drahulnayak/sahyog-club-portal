// This file likely contains your adminAuth middleware.
// We will make it check the 'x-admin-password' header.

const adminAuth = (req, res, next) => {
  const password = req.header('x-admin-password');

  // Check if password was sent
  if (!password) {
    return res.status(401).json({ message: 'No admin password provided. Access denied.' });
  }

  // Check if the password is correct
  // It compares against the ADMIN_PASSWORD you set on Render
  if (password === process.env.ADMIN_PASSWORD) {
    next(); // Password is correct, proceed
  } else {
    return res.status(403).json({ message: 'Invalid admin password. Access denied.' });
  }
};

module.exports = adminAuth;

// Note: If this file also contains 'jwtAuth', just leave that part as-is
// and make sure the adminAuth function is corrected like above.
