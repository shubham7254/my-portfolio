import React from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import { projectsData } from '../../../data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <FadeInSection>
      <section id="projects" className="section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-body">
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.githubUrl} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i> Code
                  </a>
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a 
                      href={project.liveUrl} 
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Projects;
