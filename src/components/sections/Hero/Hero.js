import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Building AI Solutions for Tomorrow';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadResume = () => {
    // Create a temporary link element
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
        <div className="hero-badge">
          <i className="fas fa-graduation-cap"></i>
          AI Engineering Student • Seeking Opportunities
        </div>
        
        <h1 className="hero-title">
          {displayText}
          <span className="cursor">|</span>
        </h1>
        
        <p className="hero-subtitle">
          Passionate AI Engineering student specializing in Healthcare AI, NLP, and Computer Vision. 
          Ready to contribute innovative solutions and grow with forward-thinking teams.
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => scrollToSection('#projects')} 
            className="btn btn-primary"
          >
            <i className="fas fa-code"></i>
            View My Projects
          </button>
          <button 
            onClick={handleDownloadResume} 
            className="btn btn-secondary"
          >
            <i className="fas fa-download"></i>
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
