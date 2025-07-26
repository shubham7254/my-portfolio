import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} Shubham Jagtap. Built with passion for AI and innovation.
        </p>
        <p className="footer-subtext">
          Open to opportunities • Ready to make an impact
        </p>
      </div>
    </footer>
  );
};

export default Footer;
