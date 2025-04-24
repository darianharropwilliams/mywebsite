// components/markdowninput/MarkdownInput.jsx
import React from 'react';
import './MarkdownInput.css'; // optional if you want to style it

function MarkdownInput({ value = '', onChange }) {
  return (
    <textarea
      className="markdown-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your post content here using Markdown..."
      rows={10}
    />
  );
}

export default MarkdownInput;
