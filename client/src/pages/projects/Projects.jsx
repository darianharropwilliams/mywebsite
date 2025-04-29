// src/pages/Projects.jsx

import React from 'react';
import projectIndex from '../../data/projects.json';
import ProjectGrid from '../../components/projectgrid/ProjectGrid';

function Projects() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{projectIndex.title}</h1>
      <p>{projectIndex.description}</p>
      <ProjectGrid projects={projectIndex.content} />
    </div>
  );
}

export default Projects;
