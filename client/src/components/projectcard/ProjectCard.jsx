import React from 'react';
import { Link } from 'react-router-dom';
import { preloadProject } from '../../utils/projectCache'; // preload helper
import TechCard from '../techcard/TechCard'; // import TechCard
import './ProjectCard.css';

function ProjectCard({ title, summary, tech, slug, purpose }) {
  return (
    <div className="project-card">
      <div className="project-content">
        <h3>
          <Link to={`/projects/${slug}`} className="project-title-link">
            {title}
          </Link>
        </h3>
        {purpose && (
          <div className="project-purpose-tag">
            {purpose}
          </div>
        )}


        <p className="project-summary">{summary}</p>

        {/* Technologies */}
        {tech && tech.length > 0 && (
          <div className="project-tags">
            {tech.map((t, i) => (
              <TechCard
                key={i}
                name={typeof t === 'string' ? t : t.name}
                url={typeof t === 'object' ? t.url : `https://www.google.com/search?q=${encodeURIComponent(t)}`}
              />
            ))}
          </div>
        )}

        {/* Visit Button */}
        <div className="project-button-container">
          <Link
            to={`/projects/${slug}`}
            className="project-link-button"
            onMouseEnter={() => preloadProject(slug)} // 👈 preload API on hover
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
