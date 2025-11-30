// frontend/src/components/AdminEventUpload.jsx
// Component for admin to upload new event with image and description
import React, { useState } from 'react';
import { API_BASE_URL } from '../api.js';

const AdminEventUpload = ({ adminPassword }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      alert('Please fill all fields and select an image');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('eventImage', imageFile); // This name MUST match upload.single('eventImage')

    try {
      const res = await fetch(`${API_BASE_URL}/api/events/upload`, {
        method: 'POST',
        headers: {
          // The browser sets 'Content-Type' for FormData automatically.
          'x-admin-password': adminPassword,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        // Reset form
        setTitle('');
        setDescription('');
        setImageFile(null);
        document.getElementById('event-image-input').value = null;
      } else {
        // Show the specific error from the backend
        alert(`Upload Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Upload failed from frontend:', error);
      alert('Upload failed. See the browser console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h2>Upload New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the event" required />

        <label>Event Image:</label>
        <input 
          id="event-image-input"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])} 
          required
        />

        <label>Description / Matter:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write about the event..." required />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Event'}
        </button>
      </form>
    </div>
  );
};

export default AdminEventUpload;
