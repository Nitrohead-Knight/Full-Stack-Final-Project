import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'posts'
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!token || !userData || userData.role !== 'admin') {
      alert("Access denied! Admin privileges required.");
      navigate("/dashboard");
      return;
    }
    
    setUser(userData);
    loadData();
  }, [navigate]);

  const loadData = () => {
    // Load all users
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    setAllUsers(users);
    
    // Load all posts
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    setAllPosts(posts);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleDeleteUser = (userEmail) => {
    if (userEmail === user.email) {
      alert("You cannot delete your own account!");
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete user: ${userEmail}?`)) {
      const updatedUsers = allUsers.filter(u => u.email !== userEmail);
      localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
      setAllUsers(updatedUsers);
      alert("User deleted successfully!");
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = allPosts.filter(p => p.id !== postId);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setAllPosts(updatedPosts);
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
          <Link to="/admin">Admin Panel</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      {/* Admin Panel Content */}
      <div className="dashboard-container">
        <div className="admin-header">
          <h1>🛡️ Admin Control Panel</h1>
          <p>Manage all users and content</p>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users ({allUsers.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            📝 Posts ({allPosts.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>All Users</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Member Since</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u, index) => (
                    <tr key={index}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className="password-field">{u.password}</span>
                      </td>
                      <td>
                        <span className={`role-badge role-${u.role}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.memberSince}</td>
                      <td>
                        <button 
                          className="admin-delete-btn"
                          onClick={() => handleDeleteUser(u.email)}
                          disabled={u.email === user.email}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="admin-section">
            <h2>All Posts</h2>
            <div className="admin-posts-grid">
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <div key={post.id} className="admin-post-card">
                    <div className="admin-post-header">
                      <h3>{post.title}</h3>
                      <span className="admin-post-category">{post.category}</span>
                    </div>
                    <p className="admin-post-author">By {post.author}</p>
                    <p className="admin-post-date">{post.date}</p>
                    <p className="admin-post-content">
                      {post.content.substring(0, 100)}...
                    </p>
                    <button 
                      className="admin-delete-btn"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      🗑️ Delete Post
                    </button>
                  </div>
                ))
              ) : (
                <p className="admin-empty">No posts available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
