import React, { useState, useEffect } from 'react';
import SkillCard from '../skillcard/SkillCard';
import './SkillGrid.css';

function SkillGrid({ skills }) {
  if (!Array.isArray(skills)) return <p>Loading skills...</p>;

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
  const subfields = [...new Set(skills.map(skill => skill.subfield))];

  const [activeSubfield, setActiveSubfield] = useState(() =>
    window.innerWidth < 768 ? null : subfields[0]
  );
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveSubfield(null); // Collapse subfield if resized to small screen
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredSkills = activeSubfield
    ? skills.filter(skill => skill.subfield === activeSubfield)
    : [];

  const handleCardClick = (index) => {
    setExpandedCardIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleTabClick = (sub) => {
    setExpandedCardIndex(null);
    setActiveSubfield(prev => (prev === sub ? null : sub));
  };

  return (
    <div className="skill-section">
      <h2 className="skill-type-header">{type}</h2>

      <div className="subfield-tabs">
        {subfields.map(sub => (
          <button
            key={sub}
            className={`subfield-tab ${sub === activeSubfield ? 'active' : ''}`}
            onClick={() => handleTabClick(sub)}
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
            isExpanded={expandedCardIndex === i}
            onToggle={() => handleCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillGrid;
