import React, { useState } from 'react';
import PasswordProtection from './PasswordProtection';
import GitHubImagePicker from './GitHubImagePicker';
import { FaSave, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import './MakePortfolio.css';

const MakePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    title: 'My Portfolio',
    subtitle: 'Recent work and projects',
    projects: [
      {
        id: 1,
        title: 'E-commerce Website',
        description: 'A modern e-commerce platform with advanced features',
        image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
        category: 'Web Development',
        link: '#',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        id: 2,
        title: 'Mobile App Design',
        description: 'UI/UX design for a fitness tracking mobile app',
        image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
        category: 'UI/UX Design',
        link: '#',
        technologies: ['Figma', 'Adobe XD', 'Sketch']
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectChange = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleImageSelect = (id, imageUrl) => {
    handleProjectChange(id, 'image', imageUrl);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      category: 'Category',
      link: '#',
      technologies: ['Technology']
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const removeProject = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const handleSave = () => {
    alert('Portfolio page data saved successfully!');
  };

  const PortfolioEditor = () => (
    <div className="make-portfolio">
      <div className="editor-header">
        <h1>Edit Portfolio Page</h1>
        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
          <button className="btn btn-primary">
            <FaEye /> Preview
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="form-section">
          <h2>Page Information</h2>
          <div className="form-group">
            <label>Page Title</label>
            <input
              type="text"
              name="title"
              value={portfolioData.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={portfolioData.subtitle}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Projects</h2>
          {portfolioData.projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <h3>Project #{project.id}</h3>
                <button 
                  onClick={() => removeProject(project.id)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => handleProjectChange(project.id, 'category', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                  rows="2"
                  className="form-textarea"
                />
              </div>
              
              <div className="form-group">
                <label>Technologies (comma separated)</label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value.split(', '))}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <GitHubImagePicker
                  label={`Project Image - ${project.title}`}
                  currentImage={project.image}
                  onImageSelect={(imageUrl) => handleImageSelect(project.id, imageUrl)}
                />
              </div>
            </div>
          ))}
          
          <button onClick={addProject} className="add-project-btn">
            <FaPlus /> Add New Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PasswordProtection pageName="Portfolio">
      <PortfolioEditor />
    </PasswordProtection>
  );
};

export default MakePortfolio;
