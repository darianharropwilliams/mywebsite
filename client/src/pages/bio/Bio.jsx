import React from 'react';
import './Bio.css';
import bio from '../../data/bio/index.js';

function Bio() {
  return (
    <div className="bio-container">
      <h1 className="bio-title">{bio.title}</h1>
      <p className="bio-description">{bio.description}</p>

      <div className="bio-columns">
        <section className="bio-section">
          <h2>Quick Facts</h2>
          <ul className="bio-facts">
            {bio.quickFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className="bio-section">
          <h2>Why I Code</h2>
          <p className="bio-about">{bio.aboutCoding}</p>
        </section>
      </div>

      <section className="bio-section">
        <h2>Current Focus</h2>
        <div className="focus-columns">
          <div>
            <h4>Now</h4>
            <ul>{bio.currentFocus.now.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Learning</h4>
            <ul>{bio.currentFocus.learning.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Next Up</h4>
            <ul>{bio.currentFocus.nextUp.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bio;
