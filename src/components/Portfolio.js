import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const handleViewLive = (projectId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/portfolio/${projectId}`);
  };

  const handleViewCode = (githubUrl, e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(githubUrl, '_blank');
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Design',
      description: 'A modern e-commerce platform with intuitive user interface and seamless shopping experience.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile Design',
      description: 'Secure and user-friendly mobile banking application with advanced security features.',
      image: '/api/placeholder/400/300',
      technologies: ['Figma', 'Adobe XD', 'Sketch'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'Web Design',
      description: 'Comprehensive dashboard for SaaS application with real-time analytics and reporting.',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'D3.js', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Healthcare App',
      category: 'Mobile Design',
      description: 'Patient management system with appointment scheduling and medical records.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'Web Design',
      description: 'Personal portfolio website with modern design and smooth animations.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Framer Motion', 'Styled Components'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Restaurant App',
      category: 'Mobile Design',
      description: 'Food delivery application with order tracking and payment integration.',
      image: '/api/placeholder/400/300',
      technologies: ['Flutter', 'Firebase', 'Google Maps'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const categories = ['All', 'Web Design', 'Mobile Design', 'UI/UX'];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  return (
    <div className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h1>My Portfolio</h1>
          <p>Showcasing my latest work and projects</p>
        </div>
        
        <div className="portfolio-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <img 
                  src="https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg" 
                  alt={project.title}
                  className="portfolio-img"
                />
                <div className="portfolio-overlay">
                  <div className="portfolio-actions">
                    <button 
                      className="action-btn" 
                      title="View Live"
                      onClick={(e) => handleViewLive(project.id, e)}
                    >
                      <FaExternalLinkAlt />
                    </button>
                    <button 
                      className="action-btn" 
                      title="View Code"
                      onClick={(e) => handleViewCode(project.githubUrl, e)}
                    >
                      <FaGithub />
                    </button>
                  </div>
                </div>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-category">{project.category}</div>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="portfolio-cta">
          <h2>Interested in my work?</h2>
          <p>Let's discuss your next project and bring your ideas to life.</p>
          <button className="btn btn-primary">Start a Project</button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

