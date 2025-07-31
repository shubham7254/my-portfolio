import React from "react";
import experiences from "../../data/experiences";
import FadeInSection from '../../common/FadeInSection/FadeInSection';

export default function Experience() {
  return (
    <FadeInSection>
    <section id="experience" className="section experience-section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-list">
        {experiences.map((exp, idx) => (
          <div className="experience-item" key={idx}>
            <h3>
              {exp.title}
              <span> @ {exp.company}</span>
            </h3>
            <span className="experience-meta">
              {exp.dates} | {exp.location}
            </span>
            <ul>
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <div className="experience-tags">
              {exp.tags.map((tag, i) => (
                <span className="tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    </FadeInSection>
  );
}
