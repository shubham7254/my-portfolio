import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import './Navbar.css';

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" }
];

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    dispatch({ type: 'SET_MENU_OPEN', payload: false });
  };

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${scrollDirection === 'down' && isScrolled ? 'navbar-hidden' : ''}`}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      <div className="nav-container">
        <div className="logo">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="logo-link"
          >
            SJ
          </a>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${state.isMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={state.isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-links ${state.isMenuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className={`nav-link ${activeSection === item.href.replace('#', '') ? 'nav-link-active' : ''}`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <span className="nav-text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {state.isMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => dispatch({ type: 'SET_MENU_OPEN', payload: false })}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
