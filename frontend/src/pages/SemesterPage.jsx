import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SEMESTERS } from '../constant.js'; // This line causes the error if the file is missing

const SemesterPage = () => {
  const navigate = useNavigate();
  const { year, branch } = useParams();
  
  const yearText = `${year}${
    year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'
  } Year`;

  const handleSemester = (sem) => {
    navigate(`/viewer/${yearText}/${encodeURIComponent(branch)}/${encodeURIComponent(sem)}`);
  };

  return (
    <div className="container">
      <h2>
        Select Semester - {branch} ({yearText})
      </h2>
      <div className="options">
        {SEMESTERS.map((s, idx) => (
          <button key={idx} onClick={() => handleSemester(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SemesterPage;