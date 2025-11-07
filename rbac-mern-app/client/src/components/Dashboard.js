import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

// Sample posts (moved outside component to avoid recreation on every render)
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "John Doe",
    date: "2025-11-05",
    category: "technology",
    content: "React is a powerful JavaScript library for building user interfaces. It makes creating interactive UIs painless by efficiently updating and rendering components. React allows you to design simple views for each state in your application, and it will efficiently update and render just the right components when your data changes."
  },
  {
    id: 2,
    title: "Understanding RBAC Systems",
    author: "Jane Smith",
    date: "2025-11-04",
    category: "business",
    content: "Role-Based Access Control (RBAC) is essential for secure applications. It ensures users only access resources appropriate to their role in the organization. RBAC helps organizations manage user permissions systematically and reduce the administrative burden of managing individual user rights."
  },
  {
    id: 3,
    title: "Building Modern Web Apps",
    author: "Mike Johnson",
    date: "2025-11-03",
    category: "technology",
    content: "Modern web applications require clean architecture and best practices. Learn how to structure your project for scalability and maintainability. Using proper design patterns, implementing testing strategies, and following coding standards will help you build robust applications."
  }
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showPosts, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);
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
    } else {
      // No user data - redirect to login
      navigate("/login");
      return;
    }

    // Load posts from localStorage
    loadPosts();
  }, [navigate]);

  const loadPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    // Combine user-created posts with sample posts (user posts first, reversed for newest first)
    setPosts([...savedPosts.reverse(), ...samplePosts]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleViewPosts = () => {
    loadPosts(); // Refresh posts when viewing
    setShowPosts(true);
  };

  const handleBackToDashboard = () => {
    setShowPosts(false);
  };

  const handleCreatePost = () => {
    if (user.role !== 'viewer') {
      navigate('/create-post');
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Get current posts
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      
      // Filter out the deleted post
      const updatedPosts = savedPosts.filter(p => p.id !== postId);
      
      // Save back to localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      
      // Update state
      const allPosts = [...updatedPosts.reverse(), ...samplePosts];
      setPosts(allPosts);
      
      // Show success message
      alert("Post deleted successfully!");
    }
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
          {user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      <div className="dashboard-container">
        {!showPosts ? (
          <>
            {/* Welcome Header */}
            <div className="welcome-header">
              <div className="welcome-content">
                <svg className="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <h1 className="welcome-title">Welcome, {user.username}!</h1>
              </div>
              <span className={`welcome-badge role-${user.role}`}>
                {user.role === 'admin' ? '🛡️ ' : ''}{user.role} Account
              </span>
            </div>

            {/* Capability Cards */}
            <div className="capability-cards">
              {/* View Content Card */}
              <div className="capability-card-item">
                <div className="capability-icon-wrapper view-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="capability-card-title">View Content</h3>
                <p className="capability-card-desc">Browse all published posts and content</p>
                <button onClick={handleViewPosts} className="capability-card-btn">
                  View All Posts
                </button>
              </div>

              {/* Create Post Card - Disabled for Viewer */}
              <div className={`capability-card-item ${user.role === 'viewer' ? 'disabled' : ''}`}>
                <div className="capability-icon-wrapper create-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="capability-card-title">Create Post</h3>
                <p className="capability-card-desc">
                  {user.role === 'viewer' 
                    ? 'Requires Editor or Admin role' 
                    : 'Create and publish new content'}
                </p>
                <button 
                  className="capability-card-btn" 
                  disabled={user.role === 'viewer'}
                  onClick={handleCreatePost}
                >
                  {user.role === 'viewer' ? 'Restricted Access' : 'Create New Post'}
                </button>
              </div>

              {/* Admin Panel Card - Only for Admin */}
              {user.role === 'admin' && (
                <div className="capability-card-item admin-card">
                  <div className="capability-icon-wrapper admin-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 className="capability-card-title">Admin Panel</h3>
                  <p className="capability-card-desc">Manage users and content</p>
                  <button 
                    className="capability-card-btn"
                    onClick={() => navigate('/admin')}
                  >
                    Open Admin Panel
                  </button>
                </div>
              )}
            </div>

            {/* Permissions Section */}
            <div className="permissions-section">
              <h2 className="permissions-title">
                <svg className="permissions-icon" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Your Permissions
              </h2>
              <div className="permissions-list">
                <div className="permission-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>View all content</span>
                </div>
                {(user.role === 'editor' || user.role === 'admin') && (
                  <>
                    <div className="permission-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Create and edit posts</span>
                    </div>
                    <div className="permission-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>{user.role === 'admin' ? 'Delete any posts' : 'Delete own posts'}</span>
                    </div>
                  </>
                )}
                {user.role === 'admin' && (
                  <div className="permission-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>Manage all users</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Posts View */
          <div className="posts-view">
            <div className="posts-header">
              <button onClick={handleBackToDashboard} className="back-button">
                ← Back to Dashboard
              </button>
              <h2>All Published Posts</h2>
            </div>
            
            <div className="posts-grid">
              {posts.length > 0 ? (
                posts.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div>
                        <h3 className="post-title">{post.title}</h3>
                        {post.category && (
                          <span className="post-category">{post.category}</span>
                        )}
                      </div>
                      <span className="post-date">{post.date}</span>
                    </div>
                    <p className="post-author">By {post.author}</p>
                    <p className="post-content">
                      {post.content.substring(0, 150)}
                      {post.content.length > 150 ? '...' : ''}
                    </p>
                    <div className="post-actions-inline">
                      <button 
                        className="post-read-btn"
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        Read More →
                      </button>
                      {((user.role === 'editor' && user.username === post.author) || user.role === 'admin') && (
                        <button 
                          className="post-delete-btn-small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post.id);
                          }}
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-posts">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p>No posts available yet.</p>
                  {(user.role === 'editor' || user.role === 'admin') && (
                    <button onClick={handleCreatePost} className="btn-create-first">
                      Create Your First Post
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
