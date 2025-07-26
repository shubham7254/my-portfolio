import React, { useState } from 'react';
import FadeInSection from '../../common/FadeInSection/FadeInSection';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      e.preventDefault(); // Only prevent submission if there are validation errors
      const firstErrorField = Object.keys(errors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    // If no errors, let the form submit naturally to Netlify
    // Don't call e.preventDefault() here
    
    setIsSubmitting(true);
    
    // Optional: Show success message after form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactItems = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "jshubham@umich.edu",
      href: "mailto:jshubham@umich.edu"
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      content: "Dearborn, Michigan, USA"
    },
    {
      icon: "fab fa-linkedin",
      title: "LinkedIn",
      content: "linkedin.com/in/shubhamjagtap",
      href: "https://www.linkedin.com/in/jshubham17/"
    }
  ];

  const socialLinks = [
    { href: "https://github.com/shubham7254", icon: "fab fa-github" },
    { href: "https://www.linkedin.com/in/jshubham17/", icon: "fab fa-linkedin" },
    { href: "mailto:jshubham@umich.edu", icon: "fas fa-envelope" },
  ];

  return (
    <FadeInSection>
      <section id="contact" className="section">
        <h2 className="section-title">Let's Connect</h2>
        
        <div className="availability-banner">
          <h3>
            <i className="fas fa-check-circle"></i>
            Available for Opportunities
          </h3>
          <p>I'm actively seeking internships, entry-level positions, and collaboration opportunities in AI/ML. 
          Let's discuss how I can contribute to your team!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            {contactItems.map((item, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="contact-details">
                  <h4>{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.content}
                    </a>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="contact-form-section">
            <div className="contact-form-container">
              <h3 className="contact-form-title">Quick Message</h3>
              <form 
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="contact-form" 
                onSubmit={handleSubmit}
              >
                {/* Hidden fields required for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required" aria-label="required">*</span>
                  </label>
                  <input 
                    id="name"
                    type="text" 
                    name="name"
                    placeholder="Enter your full name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.name ? 'form-input-error' : ''}`}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <span id="name-error" className="form-error" role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required" aria-label="required">*</span>
                  </label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="Enter your email address" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'form-input-error' : ''}`}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <span id="email-error" className="form-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required" aria-label="required">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    placeholder="Your message here..." 
                    rows="4" 
                    required 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`form-textarea ${formErrors.message ? 'form-input-error' : ''}`}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <span id="message-error" className="form-error" role="alert">
                      {formErrors.message}
                    </span>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary form-submit"
                  disabled={isSubmitting}
                >
                  <i className={isSubmitting ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Visit my ${link.icon.includes('github') ? 'GitHub' : link.icon.includes('linkedin') ? 'LinkedIn' : link.icon.includes('envelope') ? 'Email' : 'Twitter'}`}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Contact;
