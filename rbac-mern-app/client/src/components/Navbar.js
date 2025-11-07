import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="app-navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <span>Nimbus RBAC</span>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}
