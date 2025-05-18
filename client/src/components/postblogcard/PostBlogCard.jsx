import React from 'react';
import './PostBlogCard.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function PostBlogCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
      </div>

      <p className="author">by {post.author}</p>

      <div className="content-preview">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ ...props }) => (
              <a
                {...props}
                style={{ color: '#0077ff' }}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code: ({ inline, className, children, ...props }) => {
              const codeString = typeof children === 'string' ? children : children.join('');
              return inline ? (
                <code
                  style={{
                    backgroundColor: '#f4f4f4',
                    padding: '0.2em 0.4em',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                  }}
                  {...props}
                >
                  {codeString}
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
                  <code className={className}>{codeString}</code>
                </pre>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default PostBlogCard;
