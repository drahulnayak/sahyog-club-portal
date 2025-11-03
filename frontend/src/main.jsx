import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles.css'; 

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* --- THIS IS THE CORRECTION --- */}
    {/* AuthProvider MUST wrap BrowserRouter */}
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    {/* --- END CORRECTION --- */}
  </React.StrictMode>
);
