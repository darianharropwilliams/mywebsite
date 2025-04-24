import React from 'react';
import SkillCard from '../skillcard/SkillCard';
import './SkillGrid.css';

function SkillGrid({ skills }) {
  if (!Array.isArray(skills)) {
    return <p>Loading skills...</p>;
  }

  const groupedByType = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill);
    return acc;
  }, {});

  return (
    <div className="skill-grid">
      {Object.entries(groupedByType).map(([type, skillGroup]) => (
        <div key={type} className="skill-section">
          <h2 className="skill-type-header">{type}</h2>
          <div className="skill-card-row">
            {skillGroup.map((skill, i) => (
              <SkillCard
                key={i}
                title={skill.title}
                details={skill.details}
                source={skill.source}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillGrid;
