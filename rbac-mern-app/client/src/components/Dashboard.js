import React from "react";
import { useNavigate } from "react-router-dom";

const btnStyle = {
  padding: "0.6rem 1.2rem",
  margin: "0.5rem",
  borderRadius: "10px",
  background: "#3778C2",
  color: "#fff",
  border: "none",
  fontWeight: "bold"
};

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  if (!user) return <p style={{ textAlign: "center" }}>Please login.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2 style={{ color: "#252525" }}>Dashboard</h2>
      <p>Welcome, <strong>{user.username}</strong>!</p>
      <div>
        {user.role === 'admin' && (
          <button style={btnStyle} onClick={() => navigate("/manage-users")}>
            Manage Users
          </button>
        )}
        {(user.role === 'admin' || user.role === 'editor') && (
          <button style={btnStyle} onClick={() => navigate("/create-post")}>
            Create Post
          </button>
        )}
        <button style={btnStyle} onClick={() => navigate("/view-content")}>
          View Content
        </button>
      </div>
    </div>
  );
}
