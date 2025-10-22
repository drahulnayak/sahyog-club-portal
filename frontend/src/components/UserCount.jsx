import React, { useState, useEffect } from 'react';

const UserCount = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserCount = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/users/count');
      const data = await res.json();
      setCount(data.count);
    } catch (error) {
      console.error('Failed to fetch user count:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch the count when the component first loads
    fetchUserCount();
  }, []);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="user-count-container">
      <button onClick={handleToggle} className="navbar-button count-button">
        {isVisible ? 'Hide User Count' : 'Show User Count'}
      </button>
      {isVisible && (
        <span className="user-count-display">
          Total Users: {isLoading ? '...' : count}
        </span>
      )}
    </div>
  );
};

export default UserCount;