import React, { useState } from "react";
import { sendFeedback } from "../api"; // Import the api function

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const data = await sendFeedback({ name, email, message });
      alert(data.message || "Feedback sent!");
      setName(""); setEmail(""); setMessage("");
    } catch (error) {
      alert("Failed to send feedback.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Send Feedback / Query</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />

        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />

        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Query / Feedback" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}