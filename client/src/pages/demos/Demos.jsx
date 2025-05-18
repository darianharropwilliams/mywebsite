import React from 'react';
import { Link } from 'react-router-dom';
import content from '../../data/demos/demos.json';

function Demos() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>

      <div className="mobile-warning">
        ⚠️ Note: Demos are not currently mobile-friendly.
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Link to="/demos/chip8">
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Launch CHIP-8 Emulator
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Demos;
