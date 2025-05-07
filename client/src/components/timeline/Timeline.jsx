import React, { useState } from 'react';
import './Timeline.css';

function Timeline({ events }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line" />
      {events.map((entry, index) => (
        <div className="timeline-entry" key={index}>
          <button className="timeline-title" onClick={() => toggle(index)}>
            {entry.title}
          </button>
          <div className={`timeline-details ${activeIndex === index ? 'active' : ''}`}>
            <span className="timeline-date">{entry.displayDate}</span>
            <p className="timeline-description">{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
