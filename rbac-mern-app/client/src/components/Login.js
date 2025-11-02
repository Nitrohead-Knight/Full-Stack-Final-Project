import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 // In Login.js
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", { username, password });
    localStorage.setItem("token", res.data.token);
    const base64Url = res.data.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    setUser({ username: payload.username, role: payload.role });
    navigate("/dashboard");
  } catch (error) {
    setError("Incorrect password or username");
  }
};


  return (
    <div style={formContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Login</h2>
        <input style={inputStyle} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={buttonStyle} type="submit">Login</button>
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
