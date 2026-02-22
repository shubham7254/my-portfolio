import React from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { educationData, publicationsData } from '../../../data/education';
import './Education.css';

const Education = () => {
  return (
    <FadeInSection>
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic background and coursework</p>
        
        <div className="education-timeline">
          {educationData.map((item) => (
            <div key={item.id} className="education-item">
              <div className="education-year">{item.year}</div>
              <h3 className="education-degree">{item.degree}</h3>
              <div className="education-school">{item.school}</div>
              <div className="education-details">
                {item.details.map((detail, detailIndex) => (
                  <p key={detailIndex}>
                    {detail.includes("Relevant Coursework:") ? (
                      <>
                        <strong>{detail.split(":")[0]}:</strong>
                        {detail.split(":")[1]}
                      </>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h3 className="publications-heading">Publications</h3>
        <div className="publications-list">
          {publicationsData.map((pub) => (
            <div key={pub.id} className="publication-item">
              <div className="publication-date">{pub.date}</div>
              <h4 className="publication-title">{pub.title}</h4>
              <div className="publication-venue">{pub.venue}</div>
              <div className="publication-details">
                {pub.description.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>
              <div className="publication-tags">
                {pub.tags.map((tag, idx) => (
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

export default Education;
