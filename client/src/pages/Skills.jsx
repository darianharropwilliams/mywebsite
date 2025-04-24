import React from 'react';
import content from '../data/skills/index';

import SkillGrid from '../components/skillgrid/SkillGrid';
console.log("Loaded skills:", content.skills);

function Skills() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <SkillGrid skills={content.skills} />
    </div>
  );
}

export default Skills;
