import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api.js'; // Ensure this path is correct
import { AuthContext } from '../context/AuthContext.jsx'; // Ensure this path is correct

const SignupPage = () => {
  // State for form inputs
  const [name, setName] = useState('');
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
      // Send registration request to the backend
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // Send user data
      });

      // Parse the JSON response from the backend
      const data = await res.json();

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
        alert(data.message || 'Signup successful!'); // Show success message (optional)
        login(data.token, data.user); // Log the user in immediately using context
        navigate('/'); // Redirect to the home page
      } else {
        // If backend returned an error (e.g., user exists, validation error)
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) { // Catch network errors or other issues during fetch
      console.error('Signup fetch error:', err);
      // Provide user-friendly error messages
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Failed to connect to the server. Please check your connection.');
      } else {
        setError('An unexpected error occurred during signup.');
      }
    } finally {
      setIsLoading(false); // Stop loading, whether success or error
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label htmlFor="signup-name">Name:</label>
        <input
          id="signup-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          disabled={isLoading} // Disable input while loading
        />

        {/* Email Input */}
        <label htmlFor="signup-email">Email:</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading} // Disable input while loading
        />

        {/* Password Input */}
        <label htmlFor="signup-password">Password:</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          disabled={isLoading} // Disable input while loading
        />

        {/* Display error message if signup fails */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;