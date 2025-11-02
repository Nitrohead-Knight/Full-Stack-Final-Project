import React from "react";

export default function ProtectedDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      {user.role === 'admin' && <button>Manage Users</button>}
      {(user.role === 'admin' || user.role === 'editor') && <button>Create Post</button>}
      <button>View Content</button>
    </div>
  );
}
