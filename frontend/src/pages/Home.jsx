import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const years = [1, 2, 3, 4];

  const handleYear = (year) => {
    navigate(`/branch/${year}`);
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.8rem', fontWeight: '700', color: '#2c3e50', marginBottom: '0.5rem' }}>
        Welcome to the SAHYOG Portal
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#555', marginTop: 0, maxWidth: '600px', margin: 'auto' }}>
        Your central hub for academic resources, including Previous Year Questions, notes, and essential books.
      </p>
      <h2 style={{ marginTop: '3rem', fontWeight: '600' }}>Select Your Academic Year</h2>
      <div className="options">
        {years.map((y) => (
          <button key={y} onClick={() => handleYear(y)}>
            {y}{y === 1 ? 'st' : y === 2 ? 'nd' : y === 3 ? 'rd' : 'th'} Year
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;