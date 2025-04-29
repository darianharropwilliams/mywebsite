import React from 'react';
import './TechCard.css';

function TechCard({ name, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="tech-card"
      title={`Learn more about ${name}`}
    >
      <span className="tech-card-name">{name}</span>
    </a>
  );
}

export default TechCard;
