import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function ViewPost() {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);

    // Load post
    loadPost();
    
    // Load comments for this post
    loadComments();
  }, [id]);

  const loadPost = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
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

    const allPosts = [...savedPosts, ...samplePosts];
    const foundPost = allPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  };

  const loadComments = () => {
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    const postComments = allComments[id] || [];
    setComments(postComments);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = savedPosts.filter(p => p.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      alert("Post deleted successfully!");
      navigate("/dashboard");
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to comment!");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const comment = {
      id: Date.now(),
      postId: parseInt(id),
      author: user.username,
      authorEmail: user.email,
      content: newComment,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Get all comments
    const allComments = JSON.parse(localStorage.getItem("comments")) || {};
    
    // Add comment to this post
    if (!allComments[id]) {
      allComments[id] = [];
    }
    allComments[id].unshift(comment); // Add to beginning (newest first)
    
    // Save to localStorage
    localStorage.setItem("comments", JSON.stringify(allComments));
    
    // Update state
    setComments(allComments[id]);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const allComments = JSON.parse(localStorage.getItem("comments")) || {};
      allComments[id] = allComments[id].filter(c => c.id !== commentId);
      localStorage.setItem("comments", JSON.stringify(allComments));
      setComments(allComments[id]);
      alert("Comment deleted!");
    }
  };

  const canDelete = user && post && user.username === post.author && user.role === 'editor';
  const canDeleteComment = (comment) => {
    if (!user) return false;
    return user.username === comment.author || user.role === 'admin';
  };

  if (!post) {
    return (
      <div className="dashboard-page">
        <div className="loading">Post not found</div>
      </div>
    );
  }

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
          {user && user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          {user && <Link to="/profile">Profile</Link>}
          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      {/* Post Content */}
      <div className="dashboard-container">
        <div className="view-post-container">
          <div className="view-post-header">
            <Link to="/dashboard" className="back-button">
              ← Back to Posts
            </Link>
            {canDelete && (
              <button onClick={handleDelete} className="delete-post-btn">
                🗑️ Delete Post
              </button>
            )}
          </div>

          <article className="view-post-content">
            <div className="view-post-meta">
              {post.category && (
                <span className="post-category">{post.category}</span>
              )}
              <span className="view-post-date">{post.date}</span>
            </div>
            
            <h1 className="view-post-title">{post.title}</h1>
            
            <div className="view-post-author-info">
              <div className="author-avatar">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="view-post-author">By {post.author}</p>
                <p className="view-post-reading-time">5 min read</p>
              </div>
            </div>

            <div className="view-post-body">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          {/* Comments Section */}
          <div className="comments-section">
            <h2 className="comments-title">
              💬 Comments ({comments.length})
            </h2>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleAddComment} className="comment-form">
                <div className="comment-form-header">
                  <div className="comment-user-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="comment-user-name">{user.username}</span>
                </div>
                <textarea
                  className="comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="4"
                  required
                />
                <button type="submit" className="comment-submit-btn">
                  Post Comment
                </button>
              </form>
            ) : (
              <div className="comment-login-prompt">
                <p>Please <Link to="/login" className="auth-link">login</Link> to comment</p>
              </div>
            )}

            {/* Comments List */}
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-author-info">
                        <div className="comment-avatar">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="comment-author">{comment.author}</p>
                          <p className="comment-date">
                            {comment.date} at {comment.time}
                          </p>
                        </div>
                      </div>
                      {canDeleteComment(comment) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="comment-delete-btn"
                          title="Delete comment"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="no-comments">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
