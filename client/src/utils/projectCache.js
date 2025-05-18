// src/utils/projectCache.js
const projectCache = new Map();

export async function preloadProject(slug) {
  if (projectCache.has(slug)) {
    return;
  }

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/${slug}`);
    if (!res.ok) throw new Error('Failed to preload project');
    const data = await res.json();
    projectCache.set(slug, data);
  } catch (err) {
    console.error('[projectCache] Error preloading project:', err);
  }
}


export function getPreloadedProject(slug) {
  return projectCache.get(slug);
}
