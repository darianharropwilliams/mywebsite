import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import blogContent from '../../data/blog.json';
import './Blog.css';
import PostBlogCard from '../../components/postblogcard/PostBlogCard.jsx';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('[Blog] Fetching blog posts...');
    axios.get(`${process.env.REACT_APP_API_URL}/blog`)
      .then(res => {
        console.log('[Blog] Fetched posts:', res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error('[Blog] Error fetching blog posts:', err);
      });
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
