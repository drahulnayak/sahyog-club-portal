import React, { createContext, useState, useEffect, useContext } from 'react';

// --- THIS IS THE FIX ---
// Use a named import { jwtDecode } instead of a default import
import { jwtDecode } from 'jwt-decode';
// --- END FIX ---

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This hook runs once when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired
          localStorage.removeItem('token');
          setUser(null); // Ensure user state is cleared
        } else {
          // Token is valid, set the user
          setUser(decodedToken.user || decodedToken);
        }
      } catch (error) {
        // Token is invalid/malformed
        localStorage.removeItem('token');
        setUser(null); // Ensure user state is cleared
      }
    }
  }, []); // Empty array means this runs only on mount

  // The login function now accepts BOTH the token and the user data
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Create a boolean 'isLoggedIn' based on whether 'user' exists.
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// This hook is a convenient way to access the context
export const useAuth = () => useContext(AuthContext);