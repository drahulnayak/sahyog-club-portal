import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import UserCount from './UserCount.jsx';
import sahyogLogo from '../assets/sahyog-logo.png';
import homeIcon from '../assets/home2.webp'; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Inline style for the container to ensure relative positioning
  const navStyle = {
    position: 'relative', // This is needed so the center text can position itself relative to the bar
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    // Add your existing padding/height from css here if needed
  };

  // Inline style to center the text absolutely
  const centerMessageStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 'bold',
    fontSize: '1.1rem', // Adjust size as needed
    color: '#fffbfbff' // Adjust color to match your theme
  };

  return (
    <nav className="navbar" style={navStyle}>
      
      {/* --- LEFT SIDE --- */}
      <Link to="/" className="navbar-brand">
        <img 
          src={sahyogLogo}
          alt="Sahyog Club Logo" 
          className="navbar-icon"
        />
        SAHYOG - The Mentorship Club
        <img 
          src={homeIcon} 
          alt="Home Icon"
          style={{ 
            height: '22px', 
            width: '22px', 
            marginLeft: '8px', 
            verticalAlign: 'middle' 
          }} 
        />
      </Link>

      {/* --- CENTER SECTION (Welcome Message) --- */}
      {/* Only show this if the user is logged in */}
      {user && (
        <div style={centerMessageStyle} className="navbar-welcome-message">
          Welcome!
        </div>
      )}

      {/* --- RIGHT SIDE --- */}
      <div className="navbar-links">
        <Link to="/events" className="navbar-link">Events</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
        
        {user ? (<UserCount />) : null}
        
        {user ? (
          // Removed the Welcome span from here
          <button onClick={handleLogout} className="navbar-button">Logout</button>
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