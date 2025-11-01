import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { API_BASE_URL, fetchEvents as fetchEventsApi } from '../api.js';

// --- Reusable EventCard Component ---
const EventCard = ({ event, user, token }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(event.likes || []);

  // robust check for current user's id (token payload stores user.id)
  const currentUserId = user?.id || user?._id || null;
  const isLikedByCurrentUser = !!currentUserId && likes.some(like => String(like) === String(currentUserId));
  
  const handleLike = async () => {
    if (!user) {
      alert('You must be logged in to like a post.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/events/like/${event._id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data);
      }
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const fullImageUrl = `${API_BASE_URL}/${event.imageUrl}`;
  const shortDescription = event.description.length > 100 
    ? event.description.substring(0, 100) + '...'
    : event.description;

  return (
    <div className="event-card-grid">
      <img src={fullImageUrl} alt={event.title} className="event-image-grid" />
      <div className="event-content-grid">
        <h2>{event.title}</h2>
        <p>{isExpanded ? event.description : shortDescription}</p>
        <div className="event-footer">
          <button onClick={() => setIsExpanded(!isExpanded)} className="read-more-btn">
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          <div className="like-section">
            <button onClick={handleLike} className={`like-btn ${isLikedByCurrentUser ? 'liked' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <span>{likes.length}</span>
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
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEventsApi();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  if (isLoading) {
    return <div className="container"><h2>Loading Events...</h2></div>;
  }

  return (
    <div className="container">
      <h1>SAHYOG - Club Events</h1>
      <div className="events-grid"> {/* <-- This is the main grid container */}
        {events.length === 0 ? (
          <p>No events posted yet. Check back soon!</p>
        ) : (
          events.map(event => (
            <EventCard key={event._id} event={event} user={user} token={token} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;