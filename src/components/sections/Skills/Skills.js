import React from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { skillsData } from '../../../data/skills';
import './Skills.css';

const Skills = () => {
  return (
    <FadeInSection>
      <section id="skills" className="section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillsData.map((skillCategory) => (
            <div key={skillCategory.id} className="skill-category">
              <h3>
                <i className={skillCategory.icon}></i>
                {skillCategory.category}
              </h3>
              <div className="skill-tags">
                {skillCategory.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Skills;
