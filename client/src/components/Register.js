import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

// Initialize default admin account if not exists
const initializeAdmin = () => {
  const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
  const adminExists = allUsers.some(u => u.role === 'admin');
  
  if (!adminExists) {
    const defaultAdmin = {
      username: "admin",
      email: "admin@knightblogs.com",
      password: "admin123",
      role: "admin",
      memberSince: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString()
    };
    allUsers.push(defaultAdmin);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    console.log("✅ Default admin account created!");
    console.log("📧 Email: admin@knightblogs.com");
    console.log("🔑 Password: admin123");
  }
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize admin account when component mounts
    initializeAdmin();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    
    // Get all existing users
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    
    // Check if email already exists
    const emailExists = allUsers.some(u => u.email === email);
    if (emailExists) {
      setError("Email already registered");
      return;
    }
    
    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    // Create new user
    const newUser = {
      username: username,
      email: email,
      password: password,
      role: role,
      memberSince: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString()
    };
    
    // Add to all users
    allUsers.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    
    // Set as current user
    localStorage.setItem("token", `token-${newUser.email}`);
    localStorage.setItem("userData", JSON.stringify({
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      memberSince: newUser.memberSince
    }));
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      {/* Logo at Top */}
      <div className="auth-logo">
        <Link to="/">
          <img src={knightLogo} alt="Knight Blog" className="auth-logo-img" />
        </Link>
      </div>

      {/* Register Form Container */}
      <div className="auth-container">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Knight Blogs today</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
              required
              minLength="6"
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label className="form-label">Account Role</label>
            <select
              className="form-input form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="viewer">Viewer - View content only</option>
              <option value="editor">Editor - Create and edit content</option>
              <option value="admin">Admin - Full system access</option>
            </select>
          </div>
          
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>

        {/* Admin Info Notice */}
        <div className="admin-info-notice">
          <p>🛡️ <strong>Admin Account Available</strong></p>
          <p className="admin-info-text">
            Email: admin@knightblogs.com<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
