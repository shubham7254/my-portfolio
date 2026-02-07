import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = 'AI Engineer';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shubham_Jagtap_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-label">
          <span className="hero-label-dot"></span>
          Available for opportunities
        </div>
        
        <h1 className="hero-name">
          Shubham<br />Jagtap
        </h1>
        
        <div className="hero-role">
          <span className="hero-role-text">{displayText}</span>
          <span className={`cursor ${isTypingDone ? 'cursor-blink' : ''}`}>|</span>
        </div>
        
        <p className="hero-subtitle">
          Specializing in Healthcare AI, NLP, and Computer Vision.
          Building intelligent systems that make a meaningful difference.
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => scrollToSection('#projects')} 
            className="btn btn-primary"
          >
            View Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={handleDownloadResume} 
            className="btn btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resume
          </button>
        </div>

        <div className="hero-links">
          <a href="https://github.com/shubham7254" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/jshubham17/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:jshubham@umich.edu" className="hero-social-link" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => scrollToSection('#about')}>
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line">
          <div className="hero-scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
