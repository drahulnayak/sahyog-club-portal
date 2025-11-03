// This middleware checks for the simple admin password
// from the 'x-admin-password' header.

const adminAuth = (req, res, next) => {
  // 1. Get the password from the request header
  const password = req.header('x-admin-password');

  // 2. Check if the header was sent
  if (!password) {
    return res.status(401).json({ message: 'Access Denied: No admin password provided.' });
  }

  // 3. Check if the password is correct
  //    It compares against the 'ADMIN_PASSWORD' you set on Render
  if (password === process.env.ADMIN_PASSWORD) {
    // 4. Password is correct! Proceed to the upload.
    next();
  } else {
    // 5. Password is wrong.
    return res.status(403).json({ message: 'Access Denied: Invalid admin password.' });
  }
};

module.exports = adminAuth;