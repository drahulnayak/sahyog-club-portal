// frontend/src/api.js

// 1. Define the API base URL using environment variables.
//    - On Vercel, it will read VITE_API_BASE from your Vercel settings.
//    - Locally (npm run dev), it will read VITE_API_BASE from your .env file.
//    - If neither is found, it defaults to localhost (useful for initial setup).
export const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Export the base URL if needed elsewhere, though using the functions below is better.
// export default API_BASE_URL;

/**
 * Fetches PYQ links based on filters.
 */
export async function fetchLinks({ year, branch, semester }) {
  const params = new URLSearchParams();
  if (year) params.set('year', year);
  if (branch) params.set('branch', branch);
  if (semester) params.set('semester', semester);

  // Use the correctly defined API_BASE_URL
  const res = await fetch(`${API_BASE_URL}/api/links?${params.toString()}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to fetch links and parse error' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Uploads a new PYQ link (requires admin password).
 */
export async function uploadLink(payload, adminPassword) {
  // Use the correctly defined API_BASE_URL
  const res = await fetch(`${API_BASE_URL}/api/links/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': adminPassword
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to upload link and parse error' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

/**
 * Sends feedback from users.
 */
export async function sendFeedback(payload) {
  // Use the correctly defined API_BASE_URL
  const res = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to send feedback and parse error' }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

// REMOVED the standalone fetch call that was here.
// You should call these functions from your React components, not directly in this file.