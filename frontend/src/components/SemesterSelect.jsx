import React from "react";

const SemesterSelect = ({ onSelectSemester }) => {
  const semesters = ["Semester 1", "Semester 2"];

  return (
    <div className="container">
      <h2>Select Semester</h2>
      <select onChange={(e) => onSelectSemester(e.target.value)}>
        <option value="">-- Select Semester --</option>
        {semesters.map((sem, idx) => (
          <option key={idx} value={sem}>
            {sem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SemesterSelect;
