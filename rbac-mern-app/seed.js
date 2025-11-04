require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');

const users = [
  { username: 'admin1', password: 'adminpass', role: 'admin' },
  { username: 'editor1', password: 'editorpass', role: 'editor' },
  { username: 'viewer1', password: 'viewerpass', role: 'viewer' },
];

const samplePosts = [
  { author: 'admin1', title: 'Welcome Admin Post', body: 'This is an admin post.' },
  { author: 'editor1', title: 'First Editor Update', body: 'Editors can write posts easily.' },
  { author: 'viewer1', title: 'Viewer Thoughts', body: 'Just viewing content, nothing to change.' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Mongo for seeding');

    // Seed users
    for (const userData of users) {
      const exists = await User.findOne({ username: userData.username });
      if (exists) {
        console.log(`User ${userData.username} already exists — skipping.`);
        continue;
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ username: userData.username, password: hashedPassword, role: userData.role });
      await user.save();
      console.log(`Created user: ${user.username} (${user.role})`);
    }

    // Seed posts
    for (const postData of samplePosts) {
      const exists = await Post.findOne({ author: postData.author, title: postData.title });
      if (exists) {
        console.log(`Post "${postData.title}" by ${postData.author} exists — skipping.`);
        continue;
      }
      const post = new Post(postData);
      await post.save();
      console.log(`Seeded post: "${post.title}" by ${post.author}`);
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from Mongo.');
  }
}

seed();
