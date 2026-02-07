import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { skillsData } from '../../../data/skills';
import './Skills.css';

const SkillBar = ({ name, level, isVisible, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{width}%</span>
      </div>
      <div className="skill-bar-track">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <FadeInSection>
      <section id="skills" className="section" ref={sectionRef}>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Tools and technologies I work with</p>
        
        <div className="skills-tabs">
          {skillsData.map((category, index) => (
            <button
              key={category.id}
              className={`skills-tab ${activeCategory === index ? 'skills-tab-active' : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              <i className={category.icon}></i>
              <span>{category.category}</span>
            </button>
          ))}
        </div>

        <div className="skills-content">
          <div className="skills-bars">
            {skillsData[activeCategory].skills.map((skill, index) => (
              <SkillBar
                key={`${activeCategory}-${index}`}
                name={typeof skill === 'object' ? skill.name : skill}
                level={typeof skill === 'object' ? skill.level : 75 + Math.floor(Math.random() * 20)}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default Skills;
