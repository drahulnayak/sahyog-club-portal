import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api.js'; // <-- IMPORT API_BASE

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Use API_BASE for the URL
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate('/login'); // Redirect to login page on success
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Signup failed:', error);
       // More specific error for network issues
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
         alert('Failed to connect to the server. Please check your connection or try again later.');
      } else {
        alert('An error occurred during signup.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;