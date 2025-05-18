import React from 'react';
import { useState, useEffect } from 'react';
import './PostBlogForm.css';
import MarkdownInput from '../markdowninput/MarkdownInput.jsx'; // adjust path if needed


function PostBlogForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', author: '', content: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    if (!form.title || !form.author || !form.content) return;
    onSubmit({ ...form });
    setForm({ title: '', author: '', content: '' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fullscreenBtn = document.querySelector('.button.button-type-fullscreen');
      if (fullscreenBtn) {
        fullscreenBtn.remove();
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <form className="post-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Your Name"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        required
      />
      <MarkdownInput
        value={form.content}
        onChange={(md) => setForm((prev) => ({ ...prev, content: md }))}
      />




      <button type="submit">Publish</button>
    </form>
  );
}

export default PostBlogForm;
