import React, { useState, useEffect, useCallback, useRef } from 'react';
import PasswordProtection from './PasswordProtection';
import GitHubImagePicker from './GitHubImagePicker';
import { FaSave, FaEye, FaPlus, FaTrash, FaTimes, FaSyncAlt } from 'react-icons/fa';
import { savePortfolioData, getPortfolioData } from '../services/supabaseService';
import './MakePortfolio.css';

// Pre-defined categories for portfolio projects
const PORTFOLIO_CATEGORIES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'React Development',
  'Flutter Development',
  'Node.js Development',
  'Python Development',
  'E-commerce Development',
  'WordPress Development',
  'API Development',
  'Database Design',
  'Cloud Solutions',
  'DevOps',
  'Machine Learning',
  'Data Science',
  'Game Development',
  'Blockchain Development',
  'Other'
];

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
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
    category: '',
    link: '#',
    technologies: []
  });
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [autoSaving, setAutoSaving] = useState(false);
  const [fetchingMetaFor, setFetchingMetaFor] = useState(null);
  const inputRefs = useRef({});

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

    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectChange = (id, field, value, event) => {
    // Prevent default behavior that might cause scroll
    if (event) {
      event.preventDefault();
    }

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

  const openModal = useCallback(() => {
    setNewProject({
      title: '',
      description: '',
      fullDescription: '',
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      category: '',
      link: '#',
      technologies: []
    });
    setShowCustomCategory(false);
    setCustomCategory('');
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setNewProject({
      title: '',
      description: '',
      fullDescription: '',
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      category: '',
      link: '#',
      technologies: []
    });
    setShowCustomCategory(false);
    setCustomCategory('');
  }, []);

  const handleNewProjectChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const normalizeProjectUrl = (url) => {
    const trimmedUrl = (url || '').trim();
    if (!trimmedUrl || trimmedUrl === '#') return '';
    return /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
  };

  const applyFetchedProjectMeta = (currentProject, meta) => ({
    ...currentProject,
    link: meta.url || currentProject.link,
    title: currentProject.title?.trim() ? currentProject.title : (meta.title || currentProject.title),
    description: currentProject.description?.trim() ? currentProject.description : (meta.description || currentProject.description),
    fullDescription: currentProject.fullDescription?.trim() ? currentProject.fullDescription : (meta.description || currentProject.fullDescription),
    image: meta.image || currentProject.image
  });

  const fetchProjectMeta = async (projectId = 'new') => {
    const targetProject = projectId === 'new'
      ? newProject
      : portfolioData.projects.find(project => project.id === projectId);
    const normalizedUrl = normalizeProjectUrl(targetProject?.link);

    if (!normalizedUrl) {
      setMessage('Please enter a valid live project URL first.');
      setTimeout(() => setMessage(''), 2500);
      return;
    }

    setFetchingMetaFor(projectId);
    setMessage('Fetching project details from live URL...');

    try {
      const response = await fetch(`/api/fetch-url-meta?url=${encodeURIComponent(normalizedUrl)}`);
      const meta = await response.json();

      if (!response.ok || !meta.success) {
        throw new Error(meta.message || 'Unable to fetch project details.');
      }

      if (projectId === 'new') {
        setNewProject(prev => applyFetchedProjectMeta({ ...prev, link: normalizedUrl }, meta));
      } else {
        setPortfolioData(prev => ({
          ...prev,
          projects: prev.projects.map(project =>
            project.id === projectId
              ? applyFetchedProjectMeta({ ...project, link: normalizedUrl }, meta)
              : project
          )
        }));
      }

      setMessage(meta.image
        ? 'Project details and featured image fetched successfully.'
        : 'Project details fetched, but no featured image was found.');
    } catch (error) {
      console.error('Error fetching project metadata:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setFetchingMetaFor(null);
      setTimeout(() => setMessage(''), 3500);
    }
  };

  const handleSaveNewProject = async () => {
    if (!newProject.title.trim()) {
      setMessage('Please enter a project title');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setAutoSaving(true);
    setMessage('Saving to Supabase...');
    try {
      const projectToAdd = {
        id: Date.now(),
        ...newProject,
        technologies: Array.isArray(newProject.technologies)
          ? newProject.technologies
          : (typeof newProject.technologies === 'string' && newProject.technologies.trim()
            ? newProject.technologies.split(',').map(t => t.trim()).filter(t => t)
            : [])
      };

      const updatedPortfolioData = {
        ...portfolioData,
        projects: [...portfolioData.projects, projectToAdd]
      };

      const result = await savePortfolioData(updatedPortfolioData);
      if (result.success) {
        setPortfolioData(updatedPortfolioData);
        setMessage('Project saved successfully to Supabase!');
        closeModal();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage(`Error saving: ${error.message}`);
    } finally {
      setAutoSaving(false);
    }
  };

  const addProject = useCallback(() => {
    openModal();
  }, [openModal]);

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

  return (
    <PasswordProtection pageName="Portfolio">
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={addProject}
            >
              <FaPlus /> Add New Portfolio
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
                      onChange={(e) => {
                        e.stopPropagation();
                        handleProjectChange(project.id, 'title', e.target.value, e);
                      }}
                      onFocus={(e) => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={project.category || ''}
                      onChange={(e) => {
                        e.stopPropagation();
                        const value = e.target.value;
                        if (value === 'custom') {
                          // Handle custom category
                          handleProjectChange(project.id, 'category', '', e);
                        } else {
                          handleProjectChange(project.id, 'category', value, e);
                        }
                      }}
                      onFocus={(e) => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }}
                      className="form-input form-select"
                    >
                      <option value="">Select Category</option>
                      {PORTFOLIO_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="custom">+ Add Custom Category</option>
                    </select>
                    {project.category && !PORTFOLIO_CATEGORIES.includes(project.category) && (
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleProjectChange(project.id, 'category', e.target.value, e);
                        }}
                        className="form-input"
                        style={{ marginTop: '8px' }}
                        placeholder="Enter custom category"
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <div className="metadata-fetch-row">
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleProjectChange(project.id, 'link', e.target.value, e)}
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="metadata-fetch-btn"
                        onClick={() => fetchProjectMeta(project.id)}
                        disabled={fetchingMetaFor === project.id}
                        title="Fetch title, description and featured image from link"
                      >
                        <FaSyncAlt />
                        {fetchingMetaFor === project.id ? 'Fetching...' : 'Fetch'}
                      </button>
                    </div>
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
                  <small style={{ color: 'var(--site-sidebar-muted-text-color)', fontSize: '12px', marginTop: '5px', display: 'block' }}>
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

        {/* Modal for Adding New Project */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Project</h2>
                <button className="modal-close-btn" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => handleNewProjectChange('title', e.target.value)}
                    className="form-input"
                    placeholder="Enter project title"
                    autoFocus
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProject.category || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'custom') {
                          setShowCustomCategory(true);
                          setCustomCategory('');
                          handleNewProjectChange('category', '');
                        } else {
                          setShowCustomCategory(false);
                          handleNewProjectChange('category', value);
                        }
                      }}
                      className="form-input form-select"
                    >
                      <option value="">Select Category</option>
                      {PORTFOLIO_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="custom">+ Add Custom Category</option>
                    </select>
                    {showCustomCategory && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomCategory(value);
                          handleNewProjectChange('category', value);
                        }}
                        className="form-input"
                        style={{ marginTop: '8px' }}
                        placeholder="Enter custom category"
                        autoFocus
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <div className="metadata-fetch-row">
                      <input
                        type="text"
                        value={newProject.link}
                        onChange={(e) => handleNewProjectChange('link', e.target.value)}
                        className="form-input"
                        placeholder="https://..."
                      />
                      <button
                        type="button"
                        className="metadata-fetch-btn"
                        onClick={() => fetchProjectMeta('new')}
                        disabled={fetchingMetaFor === 'new'}
                        title="Fetch title, description and featured image from link"
                      >
                        <FaSyncAlt />
                        {fetchingMetaFor === 'new' ? 'Fetching...' : 'Fetch'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Short Description (for card view)</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => handleNewProjectChange('description', e.target.value)}
                    rows="3"
                    className="form-textarea"
                    placeholder="Brief description that appears on portfolio cards..."
                  />
                </div>

                <div className="form-group">
                  <label>Full Description / Blog (for detail page)</label>
                  <textarea
                    value={newProject.fullDescription}
                    onChange={(e) => handleNewProjectChange('fullDescription', e.target.value)}
                    rows="6"
                    className="form-textarea"
                    placeholder="Complete project description, blog content, or detailed information..."
                  />
                </div>

                <div className="form-group">
                  <label>Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(newProject.technologies) ? newProject.technologies.join(', ') : newProject.technologies}
                    onChange={(e) => handleNewProjectChange('technologies', e.target.value)}
                    className="form-input"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="form-group">
                  <GitHubImagePicker
                    label="Project Image"
                    currentImage={newProject.image}
                    onImageSelect={(imageUrl) => handleNewProjectChange('image', imageUrl)}
                  />
                </div>

                {autoSaving && (
                  <div className="auto-save-indicator">
                    <small>Saving to Supabase...</small>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveNewProject}
                  disabled={autoSaving || !newProject.title.trim()}
                >
                  {autoSaving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PasswordProtection>
  );
};

export default MakePortfolio;

