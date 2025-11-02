import React, { useState } from "react";
import axios from "axios";

export default function CreatePost({ user }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/posts/create",
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Post created!");
      setTitle(""); setBody("");
    } catch {
      setMessage("Only editors and admins can create posts.");
    }
  };

  return (
    <div style={{maxWidth:"500px", margin:"2rem auto", textAlign:"center"}}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" style={{width:"100%",margin:"0.5rem 0"}}/>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" style={{width:"100%",margin:"0.5rem 0"}}/>
        <button type="submit" style={{padding:"0.6rem 1.2rem",background:"#3778C2",color:"#fff",border:"none",borderRadius:"10px"}}>Submit</button>
      </form>
      {message && <div style={{marginTop:"1rem", color:"#333"}}>{message}</div>}
    </div>
  );
}
