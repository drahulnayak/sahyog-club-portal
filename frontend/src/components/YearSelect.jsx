// src/components/YearSelect.jsx

import React from "react";

const YearSelect = ({ onSelectYear }) => {
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <div className="container">
      <h2>Select Year</h2>
      <select onChange={(e) => onSelectYear(e.target.value)}>
        <option value="">-- Select Year --</option>
        {years.map((year, idx) => (
          <option key={idx} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelect;