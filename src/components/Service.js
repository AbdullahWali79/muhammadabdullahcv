import React from 'react';
import { FaPalette, FaCode, FaMobile, FaSearch, FaRocket, FaUsers } from 'react-icons/fa';
import './Service.css';

const Service = () => {
  const services = [
    {
      icon: FaPalette,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces that provide exceptional user experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Building responsive and modern websites using the latest technologies and best practices.',
      features: ['Frontend Development', 'Backend Integration', 'Responsive Design', 'Performance Optimization']
    },
    {
      icon: FaMobile,
      title: 'Mobile App Design',
      description: 'Designing mobile applications that are both functional and visually appealing across all devices.',
      features: ['iOS Design', 'Android Design', 'Cross-platform', 'App Store Optimization']
    },
    {
      icon: FaSearch,
      title: 'User Research',
      description: 'Conducting thorough research to understand user needs and improve product usability.',
      features: ['User Interviews', 'Usability Testing', 'Analytics', 'Persona Development']
    },
    {
      icon: FaRocket,
      title: 'Product Strategy',
      description: 'Developing comprehensive strategies to bring your product vision to life successfully.',
      features: ['Product Planning', 'Roadmap Development', 'Feature Prioritization', 'Market Analysis']
    },
    {
      icon: FaUsers,
      title: 'Consulting',
      description: 'Providing expert advice and guidance to help your business grow and succeed.',
      features: ['Strategic Planning', 'Process Improvement', 'Team Training', 'Best Practices']
    }
  ];

  return (
    <div className="service">
      <div className="service-container">
        <div className="service-header">
          <h1>My Services</h1>
          <p>Comprehensive solutions for your digital needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <IconComponent />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        <div className="service-cta">
          <h2>Ready to work together?</h2>
          <p>Let's discuss your project and create something amazing together.</p>
          <button className="btn btn-primary">Get In Touch</button>
        </div>
      </div>
    </div>
  );
};

export default Service;

