import React from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import './About.css';

const About = () => {
  const stats = [
    { number: "7+", label: "AI/ML Projects" },
    { number: "3", label: "Years Learning" },
    { number: "5+", label: "Technologies" }
  ];

  return (
    <FadeInSection>
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image-container">
            <img 
              src="/images/profile-image.jpg"
              alt="Shubham Jagtap" 
              className="about-image"
            />
          </div>
          <div className="about-text">
            <h3>My Journey in AI</h3>
            <p>
              I'm a dedicated AI Engineering student with a passion for solving real-world problems through 
              intelligent systems. My journey began with curiosity about how machines can learn and has evolved 
              into expertise in healthcare AI, natural language processing, and computer vision.
            </p>
            <br />
            <p>
              Currently pursuing my degree while actively building projects that demonstrate practical 
              applications of AI in healthcare, legal tech, and autonomous systems. I believe in continuous 
              learning and staying current with the latest developments in AI/ML.
            </p>
            <br />
            <p>
              <strong>What drives me:</strong> Creating AI solutions that have meaningful impact on people's lives, 
              particularly in healthcare where technology can truly make a difference.
            </p>
          </div>
        </div>
        
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default About;
