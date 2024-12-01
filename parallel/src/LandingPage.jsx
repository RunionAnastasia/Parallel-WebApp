// import React from 'react'

// const LandingPage = () => {
//   return (
//     <div>
//       <h1>Landing Page</h1>
      
//     </div>
//   )
// }

// export default LandingPage

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles/LandingPage.css';

// const LandingPage = () => {
//   return (
//     <div className="landing-container">
//       <header className="landing-header">
//         <h1>Welcome to Parallel</h1>
//         <p>Join Parallel today.</p>
//       </header>
//       <main className="landing-main">
//         <div className="landing-buttons">
//           <Link to="/signup" className="btn btn-signup">Create Account</Link>
//           <Link to="/login" className="btn btn-login">Log In</Link>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default LandingPage;



// import React from "react";
// import {Link} from "react-router-dom";
// import './styles/LandingPage.css';

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       {/* Hero Section */}
//       <header className="hero-section">
//         <div className="hero-content">
//           <h1>Find Your Community</h1>
//           <p>Connect with like-minded people and create meaningful friendships.</p>
//           <Link to="/signup" className="cta-button">Join Now!</Link>
//         </div>
//       </header>

//       {/* Feature Section */}
//       <section className="features-section">
//         <h2>How It Works</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Discover"
//               className="feature-image"
//             />
//             <h3>Discover</h3>
//             <p>Find people nearby who share your interests and goals.</p>
//           </div>
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Connect"
//               className="feature-image"
//             />
//             <h3>Connect</h3>
//             <p>Start chatting and build a strong connection with new friends.</p>
//           </div>
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Meet Up"
//               className="feature-image"
//             />
//             <h3>Meet Up</h3>
//             <p>Take your online connections offline for fun and exciting meetups.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="cta-section">
//         <h2>Ready to Start?</h2>
//         <p>Download the app and start building your community today!</p>
//         <Link to="/signup" className="cta-button">Get Started!</Link>
       
//       </section>
//     </div>
//   );
// };

// export default LandingPage;


import React from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css';
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
        <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Community</h1>
          <p>Connect with like-minded people and create meaningful friendships.</p>
          <Link to="/signup" className="cta-button">Join Now!</Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Discover"
              className="feature-image"
            />
            <h3>Discover</h3>
            <p>Find people nearby who share your interests and goals.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Connect"
              className="feature-image"
            />
            <h3>Connect</h3>
            <p>Start chatting and build a strong connection with new friends.</p>
          </div>
          <div className="feature-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Meet Up"
              className="feature-image"
            />
            <h3>Meet Up</h3>
            <p>Take your online connections offline for fun and exciting meetups.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-hero">
  <div className="testimonial-container">
    {/* Left Side: Image with Enhanced Bubble */}
    <div className="testimonial-image-bubble">
      <div className="bubble-background">
        <img
          src="./wedding.jpg"
          alt="Couple smiling together"
          className="testimonial-image"
        />
      </div>
    </div>

    {/* Right Side: Testimonial */}
    <div className="testimonial-bubble">
      <p>
        "We met on Parallel through our shared love of photography and hiking. 
        Now we're happily married and exploring the world together!"
      </p>
      <h3>- Emily & John</h3>
    </div>
  </div>
</section>


      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Download the app and start building your community today!</p>
        <Link to="/signup" className="cta-button">Get Started!</Link>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; {new Date().getFullYear()} Parallel. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;



// import React from "react";
// import { Link } from "react-router-dom";
// import './styles/LandingPage.css';
// import Navbar from "./Navbar";

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       {/* Header */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Find Love and Friendship</h1>
//           <p>Connect with singles who share your values and goals.</p>
//           <Link to="/signup" className="cta-button">Join Now!</Link>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="features-section">
//         <h2>How It Works</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Match"
//               className="feature-image"
//             />
//             <h3>Match</h3>
//             <p>Discover potential matches based on your interests and preferences.</p>
//           </div>
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Connect"
//               className="feature-image"
//             />
//             <h3>Connect</h3>
//             <p>Start chatting with people who share your values and build strong connections.</p>
//           </div>
//           <div className="feature-card">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Meet"
//               className="feature-image"
//             />
//             <h3>Meet</h3>
//             <p>Take your connection to the next level with in-person dates and activities.</p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h2>What Our Members Say</h2>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <p>
//               "I never thought I'd find my soulmate online, but Parallel made it
//               happen. We've been happily together for over a year!"
//             </p>
//             <h3>- Sarah & John</h3>
//           </div>
//           <div className="testimonial-card">
//             <p>
//               "The personalized matches made dating so much easier. I've met
//               amazing people and made lifelong friends."
//             </p>
//             <h3>- Emily</h3>
//           </div>
//           <div className="testimonial-card">
//             <p>
//               "Parallel is a game-changer! The app is easy to use, and the
//               matches feel authentic. Highly recommended."
//             </p>
//             <h3>- Alex</h3>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="cta-section">
//         <h2>Ready to Find Your Match?</h2>
//         <p>Sign up now and start your journey toward meaningful connections.</p>
//         <Link to="/signup" className="cta-button">Get Started!</Link>
//       </section>

//       {/* Footer */}
//       <footer className="main-footer">
//         <p>&copy; {new Date().getFullYear()} Parallel Dating. All rights reserved.</p>
//         <div className="footer-links">
//           <Link to="/privacy">Privacy Policy</Link>
//           <Link to="/terms">Terms of Service</Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
