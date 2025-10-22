import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { API_BASE_URL } from '../api.js'; // <-- IMPORT API_BASE_URL

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use API_BASE_URL for the URL
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Pass both token and user object to login function
        login(data.token, data.user); 
        navigate('/'); // Redirect to home page on success
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Login failed:', error);
      // More specific error for network issues
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('Failed to connect to the server. Please check your connection or try again later.');
      } else {
        alert('An error occurred during login.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;