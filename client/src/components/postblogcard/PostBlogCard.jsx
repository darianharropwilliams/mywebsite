import { useState, useEffect } from 'react';
import './PostBlogCard.css';
import ReactMarkdown from 'react-markdown';
import MarkdownInput from '../markdowninput/MarkdownInput.jsx';


function PostBlogCard({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: post.title,
    author: post.author,
    content: post.content,
  });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(post._id, editForm);
    setIsEditing(false);
  };
  console.log("Markdown content:", post.content);

  return (
    <div className="post-card">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            name="title"
            value={editForm.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="author"
            value={editForm.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <MarkdownInput
            value={editForm.content}
            onChange={(md) => setEditForm((prev) => ({ ...prev, content: md }))}
          />


          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="post-header">
            <h2>{post.title}</h2>
            <div className="post-actions">
              <button
                className="delete-btn"
                onClick={() => onDelete(post._id)}
                aria-label="Delete post"
                title="Delete post"
              >
                🗑️
              </button>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                aria-label="Edit post"
                title="Edit post"
              >
                ✏️
              </button>
            </div>
          </div>

          <p className="author">by {post.author}</p>

          <div className="content-preview">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  style={{ color: '#0077ff' }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              code: ({ node, inline, className, children, ...props }) =>
                inline ? (
                  <code
                    style={{
                      backgroundColor: '#f4f4f4',
                      padding: '0.2em 0.4em',
                      borderRadius: '4px',
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre
                    style={{
                      background: '#f4f4f4',
                      padding: '1em',
                      overflowX: 'auto',
                      borderRadius: '6px',
                    }}
                    {...props}
                  >
                    <code className={className}>{children}</code>
                  </pre>
                ),
            }}
          >
            {post.content}
          </ReactMarkdown>



          </div>
        </>
      )}
    </div>
  );
}

export default PostBlogCard;
