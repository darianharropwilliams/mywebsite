// src/utils/projectCache.js

const projectCache = new Map();

function isCompleteProject(project) {
  return project && project.description && project.tech && project.links;
}

export async function preloadProject(slug) {
  const existing = projectCache.get(slug);

  if (existing && isCompleteProject(existing)) {
    return existing;
  }

  if (existing instanceof Promise) {
    return existing;
  }

  const fetchPromise = fetch(`${process.env.REACT_APP_API_URL}/projects/${slug}`)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch project');
      return res.json();
    })
    .then(data => {
      projectCache.set(slug, data);
      return data;
    })
    .catch(err => {
      console.error('[projectCache] Error preloading project:', err);
      projectCache.delete(slug); // Clean up if fetch failed
      throw err;
    });

  projectCache.set(slug, fetchPromise);
  return fetchPromise;
}

export function getPreloadedProject(slug) {
  const cached = projectCache.get(slug);
  if (cached && !(cached instanceof Promise)) return cached;
  return null;
}

let allProjectsPreloaded = false;

export async function preloadAllProjects() {
  if (allProjectsPreloaded) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    if (!res.ok) throw new Error('Failed to preload all projects');
    const projects = await res.json();

    projects.forEach(project => {
      const cached = projectCache.get(project.slug);
      if (!cached || !isCompleteProject(cached)) {
        projectCache.set(project.slug, project);
      }
    });

    allProjectsPreloaded = true;
  } catch (err) {
    console.error('[projectCache] Error preloading all projects:', err);
  }
}
