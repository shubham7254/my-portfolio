import React from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { educationData } from '../../../data/education';
import './Education.css';

const Education = () => {
  return (
    <FadeInSection>
      <section id="education" className="section">
        <h2 className="section-title">Education & Learning</h2>
        
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
      </section>
    </FadeInSection>
  );
};

export default Education;
