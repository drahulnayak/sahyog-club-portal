import React from "react";

const BranchSelect = ({ onSelectBranch }) => {
  const branches = [
    "Applied Geology",
    "Architecture & Planning",
    "Bio Medical Engineering",
    "Bio Technology",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science & Engineering",
    "Chemistry",
    "Computer Application",
    "Mathematics",
    "Physics",
    "Humanities & Social Sciences",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Mining Engineering",
    "Metallurgical and Materials Engineering"
  ];

  return (
    <div className="branch-select">
      <h2>Select Your Branch</h2>
      <select onChange={(e) => onSelectBranch(e.target.value)}>
        <option value="">-- Select Branch --</option>
        {branches.map((branch, idx) => (
          <option key={idx} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelect;
