import React from "react";

const blogPosts = [
  { title: "Welcome to Role-Based Access Website", body: "Explore secure access management and learn how different roles interact!" },
  { title: "Editor Tips", body: "Editors can create and manage posts—and learn best practices for content creation." },
  { title: "Viewer Guide", body: "Viewers get read-only access! Wondering what you can and can't do?" }
];

const randomComments = [
  "Great content on security roles!",
  "I love the simple layout.",
  "Can editors create comments too?",
  "Looking forward to new features.",
  "How do I become an admin?"
];

export default function Home() {
  // Select 3 random comments for fun
  const shuffled = randomComments.sort(() => 0.5 - Math.random());
  const pickedComments = shuffled.slice(0, 3);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem 1rem", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 20px rgba(60,90,150,0.04)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#3778C2" }}>Home</h2>
      <div>
        {blogPosts.map((post, i) => (
          <div key={i} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <strong style={{fontSize:"1.2rem"}}>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <hr style={{margin:"2rem 0"}}/>
      <h4 style={{ color: "#333", marginBottom: "0.5rem" }}>Recent Comments</h4>
      {pickedComments.map((comment, i) => (
        <div key={i} style={{ marginBottom: "0.8rem", fontStyle: "italic", color: "#555" }}>
          “{comment}”
        </div>
      ))}
    </div>
  );
}
