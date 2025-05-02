import React from 'react';
import './Timeline.css';

function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((entry, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-date">{entry.displayDate}</span>
            <h3 className="timeline-entry-title">{entry.title}</h3>
            <p className="timeline-description">{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
