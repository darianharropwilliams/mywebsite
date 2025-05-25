// blogCache.js
let cachedBlogs = null;

export const preloadBlogs = async () => {
  if (cachedBlogs) return cachedBlogs;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/blog`);
    if (!res.ok) throw new Error('Failed to preload blog posts');
    const data = await res.json();
    cachedBlogs = data;
    return data;
  } catch (err) {
    console.error('[blogCache] Failed to preload blog posts:', err);
    return null;
  }
};

export const getCachedBlogs = () => cachedBlogs;
