import React, { useState } from "react";
import { BRANCHES, YEARS, SEMESTERS } from "../constant";
import { uploadLink } from "../api"; // Import the api function

// This component now receives the password from AdminPage
export default function AdminUpload({ adminPassword }) {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branch || !year || !semester || !title || !link) {
      alert("Please fill all fields");
      return;
    }

    const payload = { branch, year, semester, title, url: link };

    try {
      const data = await uploadLink(payload, adminPassword);
      alert(data.message || "Upload successful!");
      // Clear form
      setBranch(""); setYear(""); setSemester(""); setTitle(""); setLink("");
    } catch (error) {
      alert("Upload failed. See console for details.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Upload Panel</h2>
      <form onSubmit={handleSubmit}>
        <label>Branch:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">-- Select Branch --</option>
          {BRANCHES.map((b, i) => <option key={i} value={b}>{b}</option>)}
        </select>

        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">-- Select Year --</option>
          {YEARS.map((y, i) => <option key={i} value={y}>{y}</option>)}
        </select>

        <label>Semester:</label>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">-- Select Semester --</option>
          {SEMESTERS.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>

        <label>Title (e.g., "End Sem 2024"): </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title for the link" />

        <label>Google Drive Link:</label>
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Paste your link here" />

        <button type="submit">Upload PYQ</button>
      </form>
    </div>
  );
}