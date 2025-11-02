import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Posts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/posts/view", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data.posts);
      } catch {
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "2rem 0" }}>All Posts</h3>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No posts found.</p>
      ) : (
        posts.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fff",
              marginBottom: "1rem",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            <strong>{p.title}</strong>
            <p>{p.body}</p>
            <small>By: {p.author}</small>
          </div>
        ))
      )}
    </div>
  );
}
