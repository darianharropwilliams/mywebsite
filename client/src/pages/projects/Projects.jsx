// src/pages/Projects.jsx

import React, { useEffect, useState } from 'react';
import projectIndex from '../../data/projects.json'; // Static content
import ProjectGrid from '../../components/projectgrid/ProjectGrid';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        if (!res.ok) throw new Error('Failed to load projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('[Projects] Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{projectIndex.title}</h1>
      <p>{projectIndex.description}</p>

      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ProjectGrid projects={projects} />}
    </div>
  );
}

export default Projects;
