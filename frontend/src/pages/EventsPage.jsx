// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { API_BASE_URL, fetchEvents as fetchEventsApi } from '../api.js';

// // --- Reusable EventCard Component ---
// const EventCard = ({ event, user, token }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [likes, setLikes] = useState(event.likes || []);

//   // robust check for current user's id (token payload stores user.id)
//   const currentUserId = user?.id || user?._id || null;
//   const isLikedByCurrentUser = !!currentUserId && likes.some(like => String(like) === String(currentUserId));
  
//   const handleLike = async () => {
//     if (!user) {
//       alert('You must be logged in to like a post.');
//       return;
//     }
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/events/like/${event._id}`, {
//         method: 'PUT',
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setLikes(data);
//       }
//     } catch (err) {
//       console.error('Failed to like post:', err);
//     }
//   };

//   const fullImageUrl = `${API_BASE_URL}/${event.imageUrl}`;
//   const shortDescription = event.description.length > 100 
//     ? event.description.substring(0, 100) + '...'
//     : event.description;

//   return (
//     <div className="event-card-grid">
//       <img src={fullImageUrl} alt={event.title} className="event-image-grid" />
//       <div className="event-content-grid">
//         <h2>{event.title}</h2>
//         <p>{isExpanded ? event.description : shortDescription}</p>
//         <div className="event-footer">
//           <button onClick={() => setIsExpanded(!isExpanded)} className="read-more-btn">
//             {isExpanded ? 'Show Less' : 'Read More'}
//           </button>
//           <div className="like-section">
//             <button onClick={handleLike} className={`like-btn ${isLikedByCurrentUser ? 'liked' : ''}`}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//               </svg>
//             </button>
//             <span>{likes.length}</span>
//           </div>
//         </div>
//         <small>Posted on: {new Date(event.createdAt).toLocaleDateString()}</small>
//       </div>
//     </div>
//   );
// };

// // --- Main EventsPage Component ---
// const EventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user } = useContext(AuthContext);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await fetchEventsApi();
//         setEvents(data);
//       } catch (error) {
//         console.error('Failed to fetch events:', error);
//       }
//       setIsLoading(false);
//     };
//     load();
//   }, []);

//   if (isLoading) {
//     return <div className="container"><h2>Loading Events...</h2></div>;
//   }

//   return (
//     <div className="container">
//       <h1>SAHYOG - Club Events</h1>
//       <div className="events-grid"> {/* <-- This is the main grid container */}
//         {events.length === 0 ? (
//           <p>No events posted yet. Check back soon!</p>
//         ) : (
//           events.map(event => (
//             <EventCard key={event._id} event={event} user={user} token={token} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// --- FIX: Use the useAuth hook and import all API functions ---
import { useAuth } from '../context/AuthContext.jsx';
import { API_BASE_URL, fetchEvents as fetchEventsApi, likeEvent } from '../api.js';

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
// This component is now "dumb" - it just displays data given to it.
const EventCard = ({ event, user, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if the current user has liked this event
  const currentUserId = user?.id || user?._id || null;
  const isLikedByCurrentUser = !!currentUserId && event.likes.some(like => String(like) === String(currentUserId));

  // --- FIX: Build the full, absolute URL for the image ---
  const fullImageUrl = `${API_BASE_URL}/${event.imageUrl}`;

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
// This component is "smart" - it fetches data and manages state.
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- FIX: Get user, token, and login status from useAuth hook ---
  const { user, token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Fetch all events on page load
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEventsApi(); // Use the function from api.js
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setError(error.message); // Set error state to display to user
      }
      setIsLoading(false);
    };
    load();
  }, []); // Empty array ensures this runs only once

  // --- FIX: Like handler now lives in the parent component ---
  const handleLike = async (eventId) => {
    if (!isLoggedIn) {
      alert('You must be logged in to like a post.');
      navigate('/login');
      return;
    }
    
    try {
      // 1. Call the API using the function from api.js
      const updatedLikesArray = await likeEvent(eventId, token);
      
      // 2. Update the *main* events state
      setEvents(currentEvents =>
        currentEvents.map(event =>
          event._id === eventId
            ? { ...event, likes: updatedLikesArray } // Update just the one event
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
    // Use the container class, but also events-grid-container for width overrides
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
              user={user}
              token={token} // Pass token and user down
              onLike={handleLike} // Pass the handler function down
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;