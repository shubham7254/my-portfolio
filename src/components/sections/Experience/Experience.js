import React from "react";
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import experiences from "../../../data/experience";
import "./Experience.css";

const Experience = () => {
  return (
    <FadeInSection>
      <section id="experience" className="section" aria-label="Professional Experience">
        <h2 className="section-title">Experience</h2>

        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-year" aria-label={`Dates: ${exp.dates}`}>
                {exp.dates}
              </div>
              <h3 className="experience-title">
                {exp.title}{" "}
                <span className="experience-company" aria-label={`Company: ${exp.company}`}>
                  @ {exp.company}
                </span>
              </h3>
              <div className="experience-location" aria-label={`Location: ${exp.location}`}>
                {exp.location}
              </div>

              <div className="experience-details">
                {exp.description?.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>

              <div className="experience-tags">
                {exp.tags?.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Experience;
