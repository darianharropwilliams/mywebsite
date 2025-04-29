import { useEffect, useState } from 'react';
import axios from 'axios';
import blogContent from '../../data/blog.json';
import './Blog.css';
import PostBlogCard from '../../components/postblogcard/PostBlogCard.jsx';
import PostBlogForm from '../../components/postblogform/PostBlogForm.jsx';

function Blog() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('/api/blog')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  const handleUpdate = (id, updatedPost) => {
    axios.put(`/api/blog/${id}`, updatedPost)
      .then(fetchPosts)
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/blog/${id}`)
      .then(fetchPosts)
      .catch(err => console.error(err));
  };

  const handleSubmit = (newPost) => {
    axios.post('/api/blog', newPost)
      .then(fetchPosts)
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      <h1>{blogContent.title}</h1>
      <p className="subtitle">{blogContent.subtitle}</p>

      <PostBlogForm onSubmit={handleSubmit} />
      <div className="post-list">
        {posts.map(post => (
          <PostBlogCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
