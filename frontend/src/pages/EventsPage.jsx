import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- THIS IS THE FIX ---
// 1. Import your custom 'useAuth' hook
import { useAuth } from '../context/AuthContext.jsx'; 
// 2. Import all the API functions you need
import { fetchEvents, likeEvent, API_BASE_URL } from '../api.js'; 
// --- END FIX ---

// --- Heart SVG Icon Component ---
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);


// --- Reusable EventCard Component ---
const EventCard = ({ event, user, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the current user has liked this event
  const currentUserId = user?.id || user?._id || null;
  const isLikedByCurrentUser = !!currentUserId && event.likes.some(like => String(like) === String(currentUserId));

  // The imageUrl from the database is now a full https:// link from Cloudinary
  const fullImageUrl = event.imageUrl;

  const shortDescription = event.description.length > 100
    ? event.description.substring(0, 100) + '...'
    : event.description;

  // Call the handleLike function that was passed down from the parent
  const handleLikeClick = () => {
    onLike(event._id);
  };

  return (
    <div className="event-card-grid">
      <img
        src={fullImageUrl}
        alt={event.title}
        className="event-image-grid"
        // Add a fallback image in case the URL is broken
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/2c3e50/f8f9fa?text=Image+Missing'; }}
      />
      <div className="event-content-grid">
        <h2>{event.title}</h2>
        <p>{isExpanded ? event.description : shortDescription}</p>
        <div className="event-footer">
          <button onClick={() => setIsExpanded(!isExpanded)} className="read-more-btn">
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          <div className="like-section">
            <button onClick={handleLikeClick} className={`like-btn ${isLikedByCurrentUser ? 'liked' : ''}`}>
              <HeartIcon />
            </button>
            <span>{event.likes.length}</span>
          </div>
        </div>
        <small>Posted on: {new Date(event.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};


// --- Main EventsPage Component ---
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- THIS IS THE FIX ---
  // Get everything you need directly from your useAuth hook
  const { user, token, isLoggedIn } = useAuth();
  // --- END FIX ---
  
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEvents(); // Use the function from api.js
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setError(error.message); 
      }
      setIsLoading(false);
    };
    load();
  }, []); // Runs once on page load

  const handleLike = async (eventId) => {
    if (!isLoggedIn) {
      alert('You must be logged in to like a post.');
      navigate('/login');
      return;
    }
    
    // The 'token' variable is now correctly provided by useAuth()
    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const updatedLikesArray = await likeEvent(eventId, token);
      
      // Update the main events state
      setEvents(currentEvents =>
        currentEvents.map(event =>
          event._id === eventId
            ? { ...event, likes: updatedLikesArray } 
            : event
        )
      );
    } catch (err) {
      console.error('Failed to like post:', err);
      alert('Failed to like post. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container"><h2>Loading Events...</h2></div>;
  }
  
  if (error) {
    return <div className="container"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="container events-grid-container">
      <h1>SAHYOG - Club Events</h1>
      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events posted yet. Check back soon!</p>
        ) : (
          events.map(event => (
            <EventCard
              key={event._id}
              event={event}
              user={user} // Pass the user from useAuth
              onLike={handleLike}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;