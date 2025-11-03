import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
// --- FIX: Added .jsx extensions ---
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Route Wrapper Components
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import PublicOnlyRoute from './pages/PublicOnlyRoute.jsx'; 

// Page Components
import Home from './pages/Home.jsx';
import BranchPage from './pages/BranchPage.jsx';
import SemesterPage from './pages/SemesterPage.jsx';
import Viewer from './pages/Viewer.jsx';
import AdminPage from './pages/AdminPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
// --- END FIX ---

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="page-container">
        <Routes>

          {/* === PROTECTED ROUTES (for logged-in users) === */}
          {/* These routes are ONLY visible if you are logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/branch/:year" element={<BranchPage />} />
            <Route path="/semester/:year/:branch" element={<SemesterPage />} />
            <Route path="/viewer/:year/:branch/:semester" element={<Viewer />} />
          </Route>

          {/* === PUBLIC-ONLY ROUTES (for logged-out users) === */}
          {/* These routes are ONLY visible if you are logged OUT */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* === FULLY PUBLIC ROUTES (visible to everyone) === */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* The Admin page is now public, so its own password prompt will show */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Catch-all route to redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

