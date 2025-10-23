import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import UserCount from './UserCount.jsx';
import sahyogLogo from '../assets/sahyog-logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left side of Navbar */}
      <Link to="/" className="navbar-brand">
        <img 
          src={sahyogLogo}
          alt="Sahyog Club Logo" 
          className="navbar-icon"
        />
        SAHYOG - The Mentorship Club
      </Link>

      {/* Right side of Navbar */}
      <div className="navbar-links">
        <Link to="/events" className="navbar-link">Events</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
        {user ? (<UserCount />) : null}
        {user ? (
          <>
            <span className="navbar-user">Welcome!</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Sign Up</Link>
          </>
        )}
        <img 
          src="https://d2lk14jtvqry1q.cloudfront.net/media/large_National_Institute_of_Technology_Raipur_NIT_Raipur_7b96ea4177_d18e211c83.png" 
          alt="NIT Raipur Logo" 
          className="navbar-icon-right"
        />
      </div>
    </nav>
  );
};

export default Navbar;