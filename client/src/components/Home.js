import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
  };

  return (
    <div className="nimbus-home">
      {/* Navbar */}
      <header className="home-navbar">
        <Link to="/" className="navbar-brand">
          <img src={knightLogo} alt="Knight Blog" className="navbar-logo" />
        </Link>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="nimbus-hero">
        <div className="nimbus-hero-overlay">
          <span className="nimbus-badge">Express Freely, Write Boldly</span>
          <h1 className="nimbus-hero-title">
            <span className="accent">Knight Blogs</span>
          </h1>
          <p className="nimbus-hero-subtitle">
            A space where thoughts flow without boundaries. Share your stories, opinions, 
            and creativity with a global audience. Your voice deserves to be heard.
          </p>
          <div className="nimbus-cta-buttons">
            {isLoggedIn ? (
              <Link to="/dashboard" className="nimbus-btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="nimbus-btn-primary">
                  Begin Your Journey
                </Link>
                <Link to="/login" className="nimbus-btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="nimbus-features">
        <h2>Why Choose Knight Blogs?</h2>
        <div className="nimbus-feature-row">
          <div className="nimbus-feature-card">
            <div className="nimbus-feature-icon">✍️</div>
            <strong>Express Yourself</strong>
            <p className="nimbus-feature-desc">
              Write freely and share your unique perspective with the world. No censorship, just authentic voices.
            </p>
          </div>
          <div className="nimbus-feature-card">
            <div className="nimbus-feature-icon">🔒</div>
            <strong>Secure & Private</strong>
            <p className="nimbus-feature-desc">
              Your content is protected with role-based access control. You decide who sees what.
            </p>
          </div>
          <div className="nimbus-feature-card">
            <div className="nimbus-feature-icon">🌍</div>
            <strong>Global Community</strong>
            <p className="nimbus-feature-desc">
              Connect with readers and writers from around the world. Build your audience organically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
