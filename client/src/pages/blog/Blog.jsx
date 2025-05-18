import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import blogContent from '../../data/blog.json';
import './Blog.css';
import PostBlogCard from '../../components/postblogcard/PostBlogCard.jsx';

function Blog() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/blog`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      <h1>{blogContent.title}</h1>
      <p className="subtitle">{blogContent.subtitle}</p>

      <div className="post-list">
        {posts.map(post => (
          <PostBlogCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
