import React from 'react';
import './FlagshipBanner.css';
import { useNavigate } from 'react-router-dom';

function FlagshipBanner({ projectTitle, projectSlug, projectDemo }) {
  const navigate = useNavigate();

  return (
    <div className="flagship-banner">
      <h2 className="flagship-subtitle">Check out my latest creation</h2>
      <h1 className="flagship-title">{projectTitle}</h1>
      <div className="flagship-links">
        <button onClick={() => navigate(`/projects/${projectSlug}`)}>View Project</button>
        <button onClick={() => navigate(`/blog`)}>Read Blog</button>
        {window.innerWidth > 768 && (
        <button onClick={() => navigate(`/demos/${projectDemo}`)}>Try Demo</button>
        )}
      </div>
    </div>
  );
}

export default FlagshipBanner;
