import React, { useState, useContext } from 'react'; // Combined imports
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api.js';
import { AuthContext } from '../context/AuthContext.jsx';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <-- Add loading state
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // <-- Set loading true
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        login(data.token, data.user);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
           alert('Failed to connect to the server. Please check your connection or try again later.');
      } else {
         alert('An error occurred during signup.');
      }
    } finally {
        setIsLoading(false); // <-- Set loading false in finally block
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required disabled={isLoading}/> {/* Disable input */}

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required disabled={isLoading}/> {/* Disable input */}

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required disabled={isLoading}/> {/* Disable input */}

        {/* Disable button and change text when loading */}
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;