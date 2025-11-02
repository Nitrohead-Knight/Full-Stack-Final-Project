import React from "react";
export default function Profile({ user }) {
  if (!user) return <p style={{textAlign:"center"}}>Login to see profile.</p>;
  return (
    <div style={{textAlign:"center"}}>
      <h2 style={{color: "#3778C2"}}>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
