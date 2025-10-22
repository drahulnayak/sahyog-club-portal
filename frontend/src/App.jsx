import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BranchPage from './pages/BranchPage';
import SemesterPage from './pages/SemesterPage';
import Viewer from './pages/Viewer';
import AdminPage from './pages/AdminPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage'; // <-- IMPORT THE NEW PAGE

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="page-container">
        <Routes>
          {/* All your existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/branch/:year" element={<BranchPage />} />
          <Route path="/semester/:year/:branch" element={<SemesterPage />} />
          <Route path="/viewer/:year/:branch/:semester" element={<Viewer />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} /> {/* <-- ADD THE NEW ROUTE */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}