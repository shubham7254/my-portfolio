import React, { useState, useMemo } from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { projectsData } from '../../../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const allTechs = new Set();
    projectsData.forEach(p => p.technologies.forEach(t => allTechs.add(t)));
    // Group into broader categories
    return ['All', 'Featured', 'NLP', 'Computer Vision', 'PyTorch'];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    if (activeFilter === 'Featured') return projectsData.filter(p => p.featured);
    return projectsData.filter(p => 
      p.technologies.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }, [activeFilter]);

  return (
    <FadeInSection>
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected work in AI/ML and beyond</p>

        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`project-filter-btn ${activeFilter === cat ? 'project-filter-active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article key={project.id} className={`project-card ${project.featured ? 'project-card-featured' : ''}`}>
              <div className="project-card-inner">
                <div className="project-card-top">
                  <div className="project-card-header">
                    <div className="project-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="project-card-actions">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-action-link"
                        aria-label="View code on GitHub"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-action-link"
                          aria-label="View live demo"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                
                <div className="project-card-bottom">
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Projects;
