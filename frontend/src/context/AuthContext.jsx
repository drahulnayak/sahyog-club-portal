import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Check if the token is expired
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired, remove it
          localStorage.removeItem('token');
          setIsUser(0);
        } else {
          // Token is valid, set the user
          setUser(decodedToken);
          setIsUser(1);
        }
      } catch (error) {
        // If token is invalid for any reason, remove it
        localStorage.removeItem('token');
        setIsUser(0);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    setIsUser(1);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsUser(0);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);