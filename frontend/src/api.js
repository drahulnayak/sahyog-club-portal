export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';


export async function fetchLinks({ year, branch, semester }){
const params = new URLSearchParams();
if (year) params.set('year', year);
if (branch) params.set('branch', branch);
if (semester) params.set('semester', semester);
const res = await fetch(`${API_BASE}/api/links?${params.toString()}`);
return res.json();
}


export async function uploadLink(payload, adminPassword){
const res = await fetch(`${API_BASE}/api/links/upload`, {
method: 'POST',
headers: { 'Content-Type':'application/json', 'x-admin-password': adminPassword },
body: JSON.stringify(payload)
});
return res.json();
}


export async function sendFeedback(payload){
const res = await fetch(`${API_BASE}/api/feedback`, {
method: 'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload)
});
return res.json();
}