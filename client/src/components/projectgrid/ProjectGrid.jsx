import React from 'react';
import ProjectCard from '../projectcard/ProjectCard';
import './ProjectGrid.css';

function ProjectGrid({ projects }) {
  // Sort featured projects to the top
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return b.featured ? 1 : -1;
  });

  return (
    <div className="project-grid">
      {sortedProjects.map((project, i) => (
        <ProjectCard key={i} {...project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
