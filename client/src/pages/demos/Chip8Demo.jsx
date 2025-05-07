import React, { useEffect } from 'react';
import content from '../../data/demos/chip8demo.json';
import './Chip8Demo.css';

function Chip8Demo() {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    let chip8Script, indexScript;

    loadScript("/wasm/chip8/chip8.js")
      .then(() => {
        chip8Script = document.querySelector('script[src="/wasm/chip8/chip8.js"]');
        return loadScript("/wasm/chip8/index.js");
      })
      .then(() => {
        indexScript = document.querySelector('script[src="/wasm/chip8/index.js"]');
      })
      .catch(err => console.error("Failed to load CHIP-8 scripts:", err));

    return () => {
      if (window.stopChip8) window.stopChip8();
      if (chip8Script) document.body.removeChild(chip8Script);
      if (indexScript) document.body.removeChild(indexScript);
    };
  }, []);

  return (
    <div className="chip8-container">
      <aside className="rom-panel" id="rom-links">
        {/* Buttons injected here */}
      </aside>

      <main className="emulator-panel">
        <h1>{content.title}</h1>
        <p>{content.description}</p>

        <input type="file" id="rom-picker" />
        <canvas id="screen" width="640" height="320" />

        <h2>{content.keyboardMappingHeading}</h2>
        <div className="keyboard-dual-grid">
          <div>
            <div className="grid-label">CHIP-8</div>
            <div className="grid-column">
              {content.keyboardLeft.flat().map((key, i) => (
                <div className="key" key={`left-${i}`}>{key}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="grid-label">QWERTY</div>
            <div className="grid-column">
              {content.keyboardRight.flat().map((key, i) => (
                <div className="key" key={`right-${i}`}>{key}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chip8Demo;
