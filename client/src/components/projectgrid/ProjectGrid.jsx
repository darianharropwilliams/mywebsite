import React from 'react';
import ProjectCard from '../projectcard/ProjectCard';
import './ProjectGrid.css';

function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <ProjectCard key={i} {...project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
