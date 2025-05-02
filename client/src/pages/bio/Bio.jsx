import React from 'react';
import './Bio.css';
import bio from '../../data/bio/index.js';
import Timeline from '../../components/timeline/Timeline';

function Bio() {
  return (
    <div className="bio-container">
      <h1 className="bio-title">{bio.title}</h1>
      <p className="bio-description">{bio.description}</p>
      <Timeline events={bio.events} />
    </div>
  );
}

export default Bio;
