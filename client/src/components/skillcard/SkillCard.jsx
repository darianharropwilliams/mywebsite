import React from 'react';
import './SkillCard.css';

function SkillCard({ title, details, isExpanded, onToggle }) {
  return (
    <div
      className={`skill-card ${isExpanded ? 'flipped expanded' : ''}`}
      onClick={onToggle}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <h3 className="card-title">{title}</h3>
          <div className="card-content scrollable">
            <p>{details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
