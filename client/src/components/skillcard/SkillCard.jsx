import React, { useState } from 'react';
import './SkillCard.css';

function SkillCard({ title, details, source }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`skill-card ${flipped ? 'flipped expanded' : ''}`}
      onClick={handleFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <h3 className="card-title">{title}</h3> {/* 🛠 Title stays visible on back */}
          <div className="card-content scrollable">
            <p>{details}</p>
            {source && (
              <div className="source">
                <strong>Used for:</strong> <em>{source}</em>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
