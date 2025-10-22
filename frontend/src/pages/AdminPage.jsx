import React, { useState } from 'react';
import AdminUpload from '../components/AdminUpload.jsx';
import AdminEventUpload from '../components/AdminEventUpload.jsx';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
    } else {
      alert('Please enter the admin password.');
    }
  };

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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <AdminUpload adminPassword={password} />
      <hr />
      <AdminEventUpload adminPassword={password} />
    </>
  );
};

export default AdminPage;