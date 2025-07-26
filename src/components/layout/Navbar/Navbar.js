import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import './Navbar.css';

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  const navItems = [
    { href: "#home", label: "Home", icon: "fas fa-home" },
    { href: "#about", label: "About", icon: "fas fa-user" },
    { href: "#skills", label: "Skills", icon: "fas fa-code" },
    { href: "#projects", label: "Projects", icon: "fas fa-project-diagram" },
    { href: "#education", label: "Education", icon: "fas fa-graduation-cap" },
    { href: "#contact", label: "Contact", icon: "fas fa-envelope" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${scrollDirection === 'down' ? 'navbar-hidden' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="logo-link"
          >
            Shubham Jagtap
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
                className="nav-link"
                aria-label={`Navigate to ${item.label} section`}
              >
                <i className={`${item.icon} nav-icon`}></i>
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
