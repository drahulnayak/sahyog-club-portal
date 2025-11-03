// // frontend/src/api.js

// // 1. Define the API base URL using environment variables.
// //    - On Netlify, it will read VITE_API_BASE from your Netlify settings.
// //    - Locally (npm run dev), it will read VITE_API_BASE from your .env file.
// //    - If neither is found, it defaults to localhost.
// export const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// /**
//  * Fetches PYQ links based on filters.
//  */
// export async function fetchLinks({ year, branch, semester }) {
//   const params = new URLSearchParams();
//   if (year) params.set('year', year);
//   if (branch) params.set('branch', branch);
//   if (semester) params.set('semester', semester);

//   const res = await fetch(`${API_BASE_URL}/api/links?${params.toString()}`);

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({ message: 'Failed to fetch links' }));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }
//   return res.json();
// }

// /**
//  * Uploads a new PYQ link (requires admin password).
//  */
// export async function uploadLink(payload, adminPassword) {
//   const res = await fetch(`${API_BASE_URL}/api/links/upload`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-admin-password': adminPassword
//     },
//     body: JSON.stringify(payload)
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({ message: 'Failed to upload link' }));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }
//   return res.json();
// }

// /**
//  * Sends feedback from users.
//  */
// export async function sendFeedback(payload) {
//   const res = await fetch(`${API_BASE_URL}/api/feedback`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({ message: 'Failed to send feedback' }));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }
//   return res.json();
// }

// // --- ADDED MISSING FUNCTIONS ---

// /**
//  * Fetches all events.
//  */
// export async function fetchEvents() {
//   const res = await fetch(`${API_BASE_URL}/api/events`);

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({ message: 'Failed to fetch events' }));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }
//   return res.json();
// }

// /**
//  * Fetches the total user count.
//  */
// export async function fetchUserCount() {
//   const res = await fetch(`${API_BASE_URL}/api/users/count`);

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({ message: 'Failed to fetch user count' }));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }
//   return res.json();
// }


// frontend/src/api.js

// 1. Define the API base URL using environment variables.
export const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

/**
 * Fetches PYQ links based on filters.
 */
export async function fetchLinks({ year, branch, semester }) {
  const params = new URLSearchParams();
  if (year) params.set('year', year);
  if (branch) params.set('branch', branch);
  if (semester) params.set('semester', semester);

  const res = await fetch(`${API_BASE_URL}/api/links?${params.toString()}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to fetch links' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Uploads a new PYQ link (requires admin password).
 */
export async function uploadLink(payload, adminPassword) {
  const res = await fetch(`${API_BASE_URL}/api/links/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': adminPassword
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to upload link' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Sends feedback from users.
 */
export async function sendFeedback(payload) {
  const res = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to send feedback' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetches all events.
 */
export async function fetchEvents() {
  const res = await fetch(`${API_BASE_URL}/api/events`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to fetch events' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetches the total user count.
 */
export async function fetchUserCount() {
  const res = await fetch(`${API_BASE_URL}/api/users/count`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to fetch user count' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}


// --- THIS IS THE MISSING FUNCTION ---

/**
 * Likes or unlikes an event.
 * Requires the user's auth token.
 */
export async function likeEvent(eventId, token) {
  const res = await fetch(`${API_BASE_URL}/api/events/like/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // The backend 'jwtAuth' middleware looks for this token
      'x-auth-token': token,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to like event' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  // The backend route returns the new 'likes' array
  return res.json(); 
}