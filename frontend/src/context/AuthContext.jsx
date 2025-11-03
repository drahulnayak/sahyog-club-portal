import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Start as null
  
  // --- THIS IS THE FIX ---
  // We add a 'isLoading' state.
  // This will be 'true' until we have checked localStorage.
  const [isLoading, setIsLoading] = useState(true);

  // This hook now runs only ONCE when the app first loads
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        } else {
          // Token is valid
          setUser(decodedToken.user || decodedToken);
          setToken(storedToken);
        }
      } catch (error) {
        // Token is invalid/malformed
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    }
    // We are done checking, so set loading to false
    setIsLoading(false);
  }, []); // Empty array means this runs only on mount

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!user;

  // Don't render the app until we've finished checking the token
  if (isLoading) {
    // You can replace this with a proper loading spinner component
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><h2>Loading Session...</h2></div>;
  }

  return (
    // We now provide 'isLoading' to the rest of the app
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// This hook is a convenient way to access the context
export const useAuth = () => useContext(AuthContext);