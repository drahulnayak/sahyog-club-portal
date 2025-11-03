import React from 'react';

// --- IMPORT YOUR IMAGES ---
// Make sure these images are in your frontend/src/assets/ folder
import facultyPhoto1 from '../assets/Screenshot 2025-10-30 222622.png';
import facultyPhoto2 from '../assets/Screenshot 2025-10-30 222715.png';

const AboutPage = () => {
  return (
    // This wrapper is used to contain the hero and the main content
    <div className="about-page-container">
      
      {/* === Hero Section === */}
      <header className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story: The Heart of Mentorship</h1>
          <p>Discover the journey and vision behind SAHYOG - The Mentorship Club.</p>
        </div>
      </header>

      {/* === Main Content Area (uses the glassmorphism container) === */}
      <main className="container about-container">
        
        {/* --- Introduction Section --- */}
        <section className="about-section">
          <h2>Forged in Friendship, Founded on Vision</h2>
          <p>
            Established around <strong>2017</strong> at NIT Raipur, <strong>SAHYOG – The Mentorship Club</strong> was born from a simple yet profound vision: to create a supportive ecosystem where every student feels guided, supported, and uplifted. We are the bridge between juniors and seniors, a guiding light that helps freshers navigate the exciting yet challenging waters of college life—academically, emotionally, and socially.
          </p>
        </section>

        {/* --- Faculty In-Charge Section --- */}
        <section className="about-section faculty-section">
          <h2>Our Guiding Pillars</h2>
          <div className="faculty-grid">
            
            {/* === Card 1: Corrected with Link === */}
            <div className="faculty-card">
              <img src={facultyPhoto1} alt="Dr. A.K. Dash" /> {/* Uses imported image */}
              <h3>
                {/* Name is now a clickable link */}
                <a href="https://nitrr.ac.in/viewdetails.php?q=min.akdash" target="_blank" rel="noopener noreferrer" className="faculty-link">
                  Dr. A.K. Dash
                </a>
              </h3>
              <p className="faculty-designation">Assistant Professor, Mining Department</p>
              <blockquote>
                "Sahyog represents the spirit of collaborative growth that we cherish at our institution. It's inspiring to see students uplift one another."
              </blockquote>
            </div>

            {/* === Card 2: Corrected with Link === */}
            <div className="faculty-card">
              <img src={facultyPhoto2} alt="Dr. Madhukrishna Priyadarsini" /> {/* Uses imported image */}
              <h3>
                {/* Name is now a clickable link */}
                <a href="https://nitrr.ac.in/viewdetails.php?q=cse.mpriyadarsini" target="_blank" rel="noopener noreferrer" className="faculty-link">
                  Dr. Madhukrishna Priyadarsini
                </a>
              </h3>
              <p className="faculty-designation">Assistant Professor, Computer Science & Engineering</p>
              <blockquote>
                "Mentorship is key to unlocking a student's full potential. Sahyog provides the perfect platform for this transformative journey."
              </blockquote>
            </div>
          </div>
        </section>

        {/* --- Activities Section --- */}
        <section className="about-section activities-section">
          <h2>Empowering Every Step of the Journey</h2>
          <div className="about-activities-grid">
            <div className="activity-card">
              <h3>Academic Excellence</h3>
              <p>From focused remedial sessions to our innovative <strong>Green Library</strong> for sharing study resources, we ensure no student is left behind.</p>
            </div>
            <div className="activity-card">
              <h3>Career Readiness</h3>
              <p>Our acclaimed <strong>Mock Placement Sessions</strong> and insightful <strong>Career Guidance Talks</strong> empower students to face interviews and professional life with confidence.</p>
            </div>
            <div className="activity-card">
              <h3>Community & Compassion</h3>
              <p>Annual events like the large-scale <strong>Blood Donation Camp</strong>, in collaboration with <strong>AIIMS Raipur</strong>, unite our community under a single cause: growth with compassion.</p>
            </div>
          </div>
        </section>

        {/* --- Motto Section --- */}
        <section className="about-section motto-section">
          <blockquote>
            “Together we grow, together we succeed.”
            <footer>— Our Guiding Spirit</footer>
          </blockquote>
          <p>
            This isn't just our motto; it's our promise. We believe in transforming the NIT Raipur campus into a true community of care and collaboration. 
            <br/><br/>
            सच में, ये सिर्फ़ एक क्लब नहीं, बल्कि एक <strong>परिवार है</strong> — where every student finds guidance, friendship, and the courage to move forward.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;