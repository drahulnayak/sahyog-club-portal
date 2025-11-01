import React, { createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode token and validate expiry
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          setIsUser(0);
        } else {
          // Token valid — use the `user` payload if present (backend puts user under `user`)
          setUser(decodedToken.user || decodedToken);
          setIsUser(1);
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('token');
        setIsUser(0);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded.user || decoded);
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