import React, { useState } from 'react';
import SkillCard from '../skillcard/SkillCard';
import './SkillGrid.css';

function SkillGrid({ skills }) {
  if (!Array.isArray(skills)) return <p>Loading skills...</p>;

  // Group by type first (e.g. Tool, Language)
  const groupedByType = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) acc[skill.type] = [];
    acc[skill.type].push(skill);
    return acc;
  }, {});

  return (
    <div className="skill-grid">
      {Object.entries(groupedByType).map(([type, skillGroup]) => (
        <SkillTypeSection key={type} type={type} skills={skillGroup} />
      ))}
    </div>
  );
}

function SkillTypeSection({ type, skills }) {
  // Extract unique subfields
  const subfields = [...new Set(skills.map(skill => skill.subfield))];
  const [activeSubfield, setActiveSubfield] = useState(subfields[0]);

  const filteredSkills = skills.filter(skill => skill.subfield === activeSubfield);

  return (
    <div className="skill-section">
      <h2 className="skill-type-header">{type}</h2>

      <div className="subfield-tabs">
        {subfields.map(sub => (
          <button
            key={sub}
            className={`subfield-tab ${sub === activeSubfield ? 'active' : ''}`}
            onClick={() => setActiveSubfield(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="skill-card-row">
        {filteredSkills.map((skill, i) => (
          <SkillCard
            key={i}
            title={skill.title}
            details={skill.details}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillGrid;
