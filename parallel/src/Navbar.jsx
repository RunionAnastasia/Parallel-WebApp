import React from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.css'; // Import the CSS file for the navbar

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/path-to-logo.png" alt="Parallel Logo" className="logo-image" />
        <div className="logo">
        <Link to="/">Parallel</Link>
        </div>

      </div>
      <nav className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Navbar;
