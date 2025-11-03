import React, { useState } from 'react';
import AdminUpload from '../components/AdminUpload.jsx';
import AdminEventUpload from '../components/AdminEventUpload.jsx';

// This is your chosen admin password
const ADMIN_PASSWORD = "rahul@2K2";

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    // --- THIS IS THE FIX ---
    // Check if the entered password matches your secret password
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect admin password. Please try again.');
    }
  };

  // If not "authenticated", show the login form
  if (!isAuthenticated) {
    return (
      <div className="container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label>Admin Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={{ marginBottom: '1rem' }}
          />
          {/* Show error message if login fails */}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // If "authenticated", show the upload components
  // and pass the password down as a prop
  return (
    <div className="admin-container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <AdminUpload adminPassword={password} />
      <hr style={{ margin: '2rem 0' }} />
      <AdminEventUpload adminPassword={password} />
    </div>
  );
};

export default AdminPage;
