import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Use a relative path from 'pages' up to 'src' and down to 'context'
import { useAuth } from '../context/AuthContext.jsx';

const PublicOnlyRoute = () => {
  // This code is correct
  const { isLoggedIn } = useAuth();

  // If you are logged in, redirect to Home.
  // Otherwise, show the Login/Signup page.
  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;