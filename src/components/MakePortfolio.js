import React, { useState, useEffect } from 'react';
import PasswordProtection from './PasswordProtection';
import GitHubImagePicker from './GitHubImagePicker';
import { FaSave, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { savePortfolioData, getPortfolioData } from '../services/supabaseService';
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load data from database on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getPortfolioData();
        if (result.success && result.data) {
          const defaultProjects = [
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
          ];
          setPortfolioData({
            title: result.data.title || 'My Portfolio',
            subtitle: result.data.subtitle || 'Recent work and projects',
            projects: result.data.projects || defaultProjects
          });
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setMessage('Error loading data. Using defaults.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
    
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
      if (e.target && document.activeElement !== e.target) {
        e.target.focus();
      }
    });
  };

  const handleProjectChange = (id, field, value, event) => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const inputElement = event?.target;
    let cursorPosition = null;
    
    if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
      cursorPosition = inputElement.selectionStart || value.length;
    }
    
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
    
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
      if (inputElement) {
        if (document.activeElement !== inputElement) {
          inputElement.focus();
        }
        if (cursorPosition !== null && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
          const safeCursorPos = Math.min(cursorPosition, value.length);
          inputElement.setSelectionRange(safeCursorPos, safeCursorPos);
        }
      }
    });
  };

  const handleImageSelect = (id, imageUrl) => {
    handleProjectChange(id, 'image', imageUrl);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      fullDescription: '', // Add fullDescription field
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

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const result = await savePortfolioData(portfolioData);
      if (result.success) {
        setMessage('Portfolio page data saved successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      setMessage(`Error saving data: ${error.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const PortfolioEditor = () => (
    <div className="make-portfolio">
      <div className="editor-header">
        <h1>Edit Portfolio Page</h1>
        <div className="editor-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleSave}
            disabled={saving || loading}
          >
            <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn btn-primary">
            <FaEye /> Preview
          </button>
        </div>
      </div>
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      {loading && <div className="loading">Loading data...</div>}

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
                    onChange={(e) => handleProjectChange(project.id, 'title', e.target.value, e)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => handleProjectChange(project.id, 'category', e.target.value, e)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => handleProjectChange(project.id, 'link', e.target.value, e)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Short Description (for card view)</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value, e)}
                  rows="2"
                  className="form-textarea"
                />
              </div>
              
              <div className="form-group">
                <label>Full Description / Blog (for detail page)</label>
                <textarea
                  value={project.fullDescription || ''}
                  onChange={(e) => handleProjectChange(project.id, 'fullDescription', e.target.value, e)}
                  rows="8"
                  className="form-textarea"
                  placeholder="Enter complete project description, blog content, or detailed information that will display on the project detail page..."
                />
                <small style={{ color: '#B0B0B0', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  This full description will be displayed on the project detail page when users click on a project.
                </small>
              </div>
              
              <div className="form-group">
                <label>Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value.split(', ').filter(t => t.trim()), e)}
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
