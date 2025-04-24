import React from 'react';
import './ProjectCard.css';

function ProjectCard({ title, summary, tech, link, image }) {
  return (
    <div className="project-card">
      {image && <img src={image} alt={title} className="project-image" />}
      <div className="project-content">
        <h3>{title}</h3>
        <p className="project-summary">{summary}</p>
        <div className="project-tags">
          {tech.map((t, i) => (
            <span key={i} className="project-tag">{t}</span>
          ))}
        </div>
        {link && (
          <a href={link} className="project-link" target="_blank" rel="noreferrer">
            View Project
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
