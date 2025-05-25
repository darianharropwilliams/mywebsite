import React from 'react';
import content from '../../data/home.json';
import FlagshipBanner from '../../components/flagship/FlagshipBanner';
import './Home.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showTenets, setShowTenets] = useState(false);

  const quotes = content.quotes || [];

  useEffect(() => {
    if (!quotes.length) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="home-container">
      <div className="home-text">
        <h1>{content.title}</h1>
        <h2 className="home-name">{content.name}</h2>

        <div className="home-tags-wrapper">
          <div className="home-tags">
            {content.tags?.map((tag, index) => (
              <div key={index} className={`home-tag ${tag.type}`}>
                {tag.label}
              </div>
            ))}
          </div>

          <div className="home-interests">
            {content.interests?.map((interest, index) => (
              <div key={index} className={`home-tag ${interest.type}`}>
                {interest.label}
              </div>
            ))}
          </div>
        </div>

        {/* <p className="home-pride">{content.pride}</p> */}
        <p className="home-pitch">{content.pitch}</p>
        <p className="home-bio">{content.bio}</p>
        <FlagshipBanner 
          projectTitle="Custom-Built CHIP-8 Virtual Computer and Game Center"
          projectSlug="chip8-emulator" 
          projectDemo="chip8" 
        />

        <div className="home-cta">
          <p className="home-cta-info">Want to see more work like this?</p>
          <button onClick={() => window.location.href = '/projects'}>Explore All Projects</button>
          <button onClick={() => window.location.href = '/projects/personal-website'}>About This Website</button>
        </div>


        {window.innerWidth > 768 && (
          <section className="home-tenets">
            <h3>Engineer Mindset I Live By:</h3>
            <button
              className="tenets-toggle-button"
              onClick={() => setShowTenets(prev => !prev)}
            >
              {showTenets ? "Hide Cards" : "Show Cards"}
            </button>

            {showTenets && (
              <div className="tenets-pillars">
                {content.tenets?.map((tenet, index) => (
                  <div key={index} className="pillar-card">
                    <h4>{tenet.title}</h4>
                    <p>{tenet.description}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="tenets-credit">
              <em>Inspired by <u>Thinking in Systems</u> by Donella Meadows</em>
            </p>
          </section>
        )}
        {quotes.length > 0 && (
          <div className="quote-wrapper">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuoteIndex}
                className="home-quote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {quotes[currentQuoteIndex]}
              </motion.blockquote>
            </AnimatePresence>
          </div>
        )}
      </div>

      {window.innerWidth > 768 && (
        <div className="home-image">
          <img src="/Cover_image.jpeg" alt="Cover of Darian" />
        </div>
      )}

    </div>
  );
}

export default Home;
