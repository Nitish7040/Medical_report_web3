import React from "react";
import "./Home.css"; // Updated styles
import healthReportImage from "../../assets/health-report.png"; // Your image path here
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <img src={healthReportImage} alt="Logo" className="logo-img" />
            <h2>Medical Record</h2>
          </div>
          <div className="nav-links">
            <Link to="/Data" className="nav-link">Data</Link>
            <Link to="/Form" className="nav-link">Form</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Manage Your Health Records with Ease</h1>
          <p>
            Secure, accessible, and user-friendly medical record management at your fingertips.
          </p>
          <Link to="/Form" className="cta-button">Get Started</Link>
        </div>
        <div className="hero-image">
          <img src={healthReportImage} alt="Health Report" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          <h3>Secure Storage</h3>
          <p>Your health records are stored securely and only accessible by you.</p>
        </div>
        <div className="feature-item">
          <h3>Easy Access</h3>
          <p>Access your medical history anytime and anywhere with a few clicks.</p>
        </div>
        <div className="feature-item">
          <h3>Data Privacy</h3>
          <p>We ensure your privacy is protected with industry-standard encryption.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Medical Record App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
