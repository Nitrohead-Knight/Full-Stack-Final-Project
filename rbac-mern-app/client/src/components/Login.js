import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import knightLogo from '../knight-logo.png';
import "../index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Get all registered users
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    
    // Find user with matching email and password
    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Login successful - set current user
      localStorage.setItem("token", `token-${user.email}`);
      localStorage.setItem("userData", JSON.stringify({
        username: user.username,
        email: user.email,
        role: user.role,
        memberSince: user.memberSince
      }));
      
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      {/* Logo at Top */}
      <div className="auth-logo">
        <Link to="/">
          <img src={knightLogo} alt="Knight Blog" className="auth-logo-img" />
        </Link>
      </div>

      {/* Login Form Container */}
      <div className="auth-container">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
        </p>
      </div>
    </div>
  );
}
