import React, { useState, useRef } from 'react';
import './StarSlider.css';

const sections = ['situation', 'task', 'action', 'result'];
const labels = {
  situation: 'Situation',
  task: 'Task',
  action: 'Action',
  result: 'Result'
};

function StarSlider({ description }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current || startX.current === null) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const deltaX = currentX - startX.current;
    setDragX(deltaX);
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;

    if (dragX > 100) {
      // swipe right
      if (index > 0) {
        setIndex((prev) => prev - 1);
      }
    } else if (dragX < -100) {
      // swipe left
      if (index < sections.length - 1) {
        setIndex((prev) => prev + 1);
      }
    }

    setDragX(0);
    isDragging.current = false;
    startX.current = null;
  };

  const handleNextOrReset = () => {
    if (index === sections.length - 1) {
      // on last slide, circular arrow jumps to beginning
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const getTranslateX = () => {
    return `calc(${-index * 100}% + ${dragX}px)`;
  };

  return (
    <div className="star-slider">
      <div
        className="slider-content"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(${getTranslateX()})`,
            transition: isDragging.current ? 'none' : 'transform 0.3s ease'
          }}
        >
          {sections.map((key, i) => (
            <div key={i} className="star-card">
              <div className="text-wrapper">
                <div className="text-scroll-area">
                  <h4>{labels[key]}</h4>
                  <p>{description[key]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isDragging.current && (
          <div className="arrow-controls">
            {index > 0 ? (
              <button onClick={() => setIndex((prev) => prev - 1)} className="arrow-btn">&lt;</button>
            ) : (
              <div style={{ width: '3rem' }} /> // Placeholder to keep spacing balanced
            )}

            {index < sections.length - 1 ? (
              <button onClick={handleNextOrReset} className="arrow-btn">&gt;</button>
            ) : (
              <button onClick={handleNextOrReset} className="arrow-btn">&#8635;</button> // Circular arrow
            )}
          </div>
        )}
      </div>

      <div className="slider-dots">
        {sections.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default StarSlider;
