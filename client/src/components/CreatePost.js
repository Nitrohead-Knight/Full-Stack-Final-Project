import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current user
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    // Create new post
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      category: category,
      author: userData.username,
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString()
    };
    
    // Get existing posts or create empty array
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // Add new post
    existingPosts.push(newPost);
    
    // Save to localStorage
    localStorage.setItem("posts", JSON.stringify(existingPosts));
    
    // Show success message
    alert("Post created successfully!");
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

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

      {/* Create Post Form */}
      <div className="dashboard-container">
        <div className="create-post-container">
          <div className="create-post-header">
            <Link to="/dashboard" className="back-button">
              ← Back to Dashboard
            </Link>
            <h1>Create New Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label className="form-label">Post Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows="12"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-create-post">
                Publish Post
              </button>
              <button 
                type="button" 
                className="btn-cancel-post"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
