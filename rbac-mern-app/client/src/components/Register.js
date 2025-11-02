import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", { username, password, role });
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div style={formContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Register</h2>
        <input style={inputStyle} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <select style={inputStyle} value={role} onChange={e => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button style={buttonStyle} type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

const formContainerStyle = { display: "flex", justifyContent: "center", alignItems: "center" };
const formStyle = { width: "350px", padding: "2rem", borderRadius: "10px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,.09)" };
const headingStyle = { fontFamily: "'Poppins', sans-serif", fontWeight: "700", textAlign: "center", marginBottom: "1rem" };
const inputStyle = { width: "100%", padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ddd" };
const buttonStyle = { width: "100%", padding: "0.8rem", background: "#3778C2", color: "#fff", borderRadius: "6px", border: "none", fontWeight: "bold", fontSize: "1rem", marginTop: "1rem" };
