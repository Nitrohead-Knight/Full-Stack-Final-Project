import React from "react";
import Posts from "./Posts";
export default function ViewContent({ user }) {
  return (
    <div>
      <h2 style={{textAlign:"center",margin:"2rem"}}>All Content</h2>
      <Posts user={user} />
    </div>
  );
}
