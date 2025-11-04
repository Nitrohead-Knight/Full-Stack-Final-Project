require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const users = [
  { username: 'admin1', password: 'adminpass', role: 'admin' },
  { username: 'editor1', password: 'editorpass', role: 'editor' },
  { username: 'viewer1', password: 'viewerpass', role: 'viewer' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  for (let userData of users) {
    // Check if user exists, skip if present
    const exists = await User.findOne({ username: userData.username });
    if (exists) continue;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    console.log(`User "${user.username}" with role "${user.role}" created.`);
  }
const Post = require('./models/Post');
const samplePosts = [
  { author: "admin1", title: "Welcome Admin Post", body: "This is an admin post." },
  { author: "editor1", title: "First Editor Update", body: "Editors can write posts easily." },
  { author: "viewer1", title: "Viewer Thoughts", body: "Just viewing content, nothing to change." }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // ...(existing user seeding code)
  for (let postData of samplePosts) {
    const exists = await Post.findOne({ author: postData.author, title: postData.title });
    if (exists) continue;
    const post = new Post(postData);
    await post.save();
    console.log(`Seeded post: "${post.title}" by ${post.author}`);
  }

  mongoose.disconnect();
}
}

seed();
