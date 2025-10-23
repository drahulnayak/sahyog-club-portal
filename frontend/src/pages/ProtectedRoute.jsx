import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { isUser } = useAuth();

  return isUser ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;