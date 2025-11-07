import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    // Load user data from localStorage
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEditedUser(userData);
    } else {
      // No user data - redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Update current user data
    localStorage.setItem("userData", JSON.stringify(editedUser));
    setUser(editedUser);
    
    // Also update in allUsers array
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedUsers = allUsers.map(u => 
      u.email === editedUser.email ? { ...u, username: editedUser.username, email: editedUser.email } : u
    );
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <header className="dashboard-navbar">
        <Link to="/" className="navbar-brand">
          <img src={knightLogo} alt="Knight Blog" className="navbar-logo" />
        </Link>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      {/* Profile Content */}
      <div className="dashboard-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h2 className="profile-name">{user.username}</h2>
        </div>

        {/* Account Information Card */}
        <div className="info-card">
          <div className="card-header">
            <svg className="card-icon" viewBox="0 0 24 24" fill="#3b82f6">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <h3>Account Information</h3>
          </div>
          <p className="card-subtitle">
            Your personal details and role information
          </p>

          <div className="info-grid">
            {/* Username Field */}
            <div className="info-item">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 24 24" fill="#3b82f6">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>Username</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="edit-input"
                />
              ) : (
                <p className="info-value">{user.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="info-item">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 24 24" fill="#3b82f6">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Email</span>
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="edit-input"
                />
              ) : (
                <p className="info-value">{user.email}</p>
              )}
            </div>

            {/* Role Field - READ ONLY */}
            <div className="info-item">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 24 24" fill="#3b82f6">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                <span>Account Role</span>
              </div>
              <p className="info-value">{user.role}</p>
            </div>

            {/* Member Since Field (Read-only) */}
            <div className="info-item">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 24 24" fill="#3b82f6">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                </svg>
                <span>Member Since</span>
              </div>
              <p className="info-value">{user.memberSince}</p>
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn-save">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="btn-edit">
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Capabilities Card */}
        <div className="capabilities-card">
          <h3>Your Capabilities</h3>
          <div className="capabilities-buttons">
            <button className="capability-btn" onClick={() => navigate('/dashboard')}>
              <svg viewBox="0 0 24 24" fill="#3b82f6">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              View Profile
            </button>
            <button className="capability-btn" onClick={() => navigate('/dashboard')}>
              <svg viewBox="0 0 24 24" fill="#3b82f6">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              View Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
