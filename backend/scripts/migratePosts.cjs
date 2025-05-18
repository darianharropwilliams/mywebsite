require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const localUri = 'mongodb://localhost:27017/blogDB'; // Update if needed
const atlasUri = process.env.MONGO_URI;

console.log('🔧 Local URI:', localUri);
console.log('🔧 Atlas URI:', atlasUri);

const postSchema = new mongoose.Schema({}, { strict: false }); // No strict schema

console.log('🔌 Connecting to local MongoDB...');
const localConnection = mongoose.createConnection(localUri);
const LocalPost = localConnection.model('Post', postSchema, 'posts');

console.log('🔌 Connecting to Atlas MongoDB...');
const remoteConnection = mongoose.createConnection(atlasUri);
const RemotePost = remoteConnection.model('Post', postSchema, 'posts');

(async () => {
  try {
    await Promise.all([
      localConnection.asPromise(),
      remoteConnection.asPromise(),
    ]);
    console.log('✅ Both DBs connected');

    const posts = await LocalPost.find({});
    console.log(`📦 Retrieved ${posts.length} post(s) from local DB`);

    if (posts.length > 0) {
      console.log('🚚 Migrating to Atlas...');
      await RemotePost.insertMany(posts);
      console.log(`✅ Migration complete: ${posts.length} post(s) inserted`);
    } else {
      console.warn('⚠️ No posts found to migrate.');
    }
  } catch (err) {
    console.error('❌ Error during migration:', err);
  } finally {
    await Promise.all([
      localConnection.close(),
      remoteConnection.close()
    ]);
    console.log('🔒 Connections closed');
  }
})();
