import React from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './FadeInSection.css';

const FadeInSection = ({ children, className = '' }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  return (
    <div 
      ref={ref}
      className={`fade-in-section ${isIntersecting ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
