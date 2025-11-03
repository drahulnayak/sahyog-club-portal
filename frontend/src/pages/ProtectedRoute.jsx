import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Use a relative path from 'pages' up to 'src' and down to 'context'
import { useAuth } from '../context/AuthContext.jsx'; 

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  // Use the new 'isLoggedIn' boolean, not 'isUser'
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;