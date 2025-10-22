import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <span>&copy; {currentYear} All rights reserved | Designed by&nbsp;</span>
        <a 
          href="https://www.linkedin.com/in/dharavath-rahul-nayak-769332258/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-link"
        >
          Dharavath Rahul Nayak
        </a>
        <a 
          href="https://www.linkedin.com/in/dharavath-rahul-nayak-769332258/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-icon-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;