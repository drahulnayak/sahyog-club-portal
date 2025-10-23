import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api.js'; // Ensure this path is correct
import { AuthContext } from '../context/AuthContext.jsx'; // Ensure this path is correct

const LoginPage = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for displaying errors
  const [error, setError] = useState('');

  // Hook for navigation
  const navigate = useNavigate();
  // Get login function from authentication context
  const { login } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      // Send login request to the backend
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send credentials
      });

      // Parse the JSON response from the backend
      const data = await res.json();

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
        // --- SUCCESS ---
        login(data.token, data.user); // Save token and user data using context
        navigate('/'); // Redirect to the home page
      } else {
        // --- FAILURE ---
        // If backend returned an error (e.g., invalid credentials)
        setError(data.message || 'Login failed. Please check credentials.');
      }
    } catch (err) { // Catch network errors or other issues during fetch
      console.error('Login fetch error:', err);
      // Provide user-friendly error messages
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Failed to connect to the server. Please check connection.');
      } else {
        setError('An unexpected error occurred during login.');
      }
    } finally {
      setIsLoading(false); // Stop loading, whether success or error
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading} // Disable input while loading
        />

        {/* Password Input */}
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={isLoading} // Disable input while loading
        />

        {/* Display error message if login fails */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;