import { useState } from 'react';
import './PostBlogCard.css';

function PostBlogCard({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: post.title, author: post.author, content: post.content });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(post._id, editForm);
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      {isEditing ? (
        <form className="post-form" onSubmit={handleEditSubmit}>
          <input name="title" value={editForm.title} onChange={handleChange} required />
          <input name="author" value={editForm.author} onChange={handleChange} required />
          <textarea name="content" value={editForm.content} onChange={handleChange} rows={6} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
  <div className="post-header">
    <h2>{post.title}</h2>
    <div>
      <button className="delete-btn" onClick={() => onDelete(post._id)} title="Delete post">🗑️</button>
      <button className="delete-btn" onClick={() => setIsEditing(true)} title="Edit post">✏️</button>
    </div>
  </div>
      <p className="author">by {post.author}</p>

      {post.tags?.length > 0 && (
        <p className="tags"><strong>Tags:</strong> {post.tags.join(', ')}</p>
      )}

      {post.links?.length > 0 && (
        <div className="links">
          <strong>Links:</strong>
          <ul>
            {post.links.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {post.attachments?.length > 0 && (
        <div className="attachments">
          <strong>Attachments:</strong>
          <ul>
            {post.attachments.map((file, i) => (
              <li key={i}>
                <a href={file} download>{file}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="snippet">{post.content.slice(0, 150)}...</p>
      <a className="read-more" href={`/blog/${post._id}`}>Read more →</a>
    </>

      )}
    </div>
  );
}

export default PostBlogCard;
