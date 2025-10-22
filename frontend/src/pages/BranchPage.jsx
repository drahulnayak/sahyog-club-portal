import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BRANCHES } from '../constant.js'; // This line also needs the file

const BranchPage = () => {
  const navigate = useNavigate();
  const { year } = useParams();

  const yearText = `${year}${
    year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'
  } Year`;

  const handleBranch = (branch) => {
    navigate(`/semester/${year}/${encodeURIComponent(branch)}`);
  };

  return (
    <div className="container">
      <h2>Select Branch ({yearText})</h2>
      <div className="options">
        {BRANCHES.map((b, idx) => (
          <button key={idx} onClick={() => handleBranch(b)}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchPage;