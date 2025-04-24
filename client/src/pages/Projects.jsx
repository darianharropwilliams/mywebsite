import React from 'react';
import projectData from '../data/projects.json';

import ProjectGrid from '../components/projectgrid/ProjectGrid';

function Projects() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{projectData.title}</h1>
      <p>{projectData.description}</p>
      <ProjectGrid projects={projectData.content} />
    </div>
  );
}

export default Projects;
