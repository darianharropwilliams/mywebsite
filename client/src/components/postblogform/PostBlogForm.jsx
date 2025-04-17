import { useState } from 'react';
import './PostBlogForm.css';

function PostBlogForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '', author: '', content: '', tags: '', links: '', attachments: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.content) return;
    onSubmit({
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      links: form.links.split(',').map(link => link.trim()),
      attachments: form.attachments.split(',').map(file => file.trim()),
    });
    setForm({ title: '', author: '', content: '', tags: '', links: '', attachments: '' });
  };


  

  return (
    <form className="post-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Your Name"
        value={form.author}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Write your post here..."
        rows={6}
        value={form.content}
        onChange={handleChange}
        required
      />
      <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} />
      <textarea name="links" placeholder="Relevant links (comma-separated URLs)" value={form.links} onChange={handleChange} />
      <input name="attachments" placeholder="File URLs (optional, comma-separated)" value={form.attachments} onChange={handleChange} />

      <button type="submit">Publish</button>
    </form>
  );
}

export default PostBlogForm;
