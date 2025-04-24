import React, { useState } from 'react';
import './SkillCard.css';

function SkillCard({ title, details, source }) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleFlip = () => {
    if (!expanded) setFlipped(!flipped);
  };

  return (
    <div
      className={`skill-card ${flipped ? 'flipped' : ''} ${expanded ? 'expanded' : ''}`}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <div className="card-content scrollable">
            <p>{details}</p>
            {source && (
              <div className="source">
                <strong>Source:</strong> <em>{source}</em>
              </div>
            )}
          </div>
          <button
            className="expand-toggle"
            onClick={(e) => {
              e.stopPropagation(); // prevent flip when clicking button
              setExpanded(!expanded);
            }}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
