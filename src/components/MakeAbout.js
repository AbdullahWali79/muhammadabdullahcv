import React, { useState, useEffect } from 'react';
import PasswordProtection from './PasswordProtection';
import { FaSave, FaEye, FaEdit } from 'react-icons/fa';
import { saveAboutData, getAboutData } from '../services/supabaseService';
import './MakeAbout.css';

const MakeAbout = () => {
  const [aboutData, setAboutData] = useState({
    title: 'About Me',
    subtitle: 'Get to know me better',
    description: 'I am a passionate and creative UI/UX Designer with a knack for building elegant and functional user experiences. I specialize in user-centered design and have a strong command of modern design tools.',
    skills: ['UI/UX Design', 'Web Development', 'Mobile Design', 'Branding'],
    experience: '5+ Years',
    projects: '50+ Completed'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load data from database on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getAboutData();
        if (result.success && result.data) {
          setAboutData({
            title: result.data.title || 'About Me',
            subtitle: result.data.subtitle || 'Get to know me better',
            description: result.data.description || '',
            skills: result.data.skills || ['UI/UX Design', 'Web Development', 'Mobile Design', 'Branding'],
            experience: result.data.experience || '5+ Years',
            projects: result.data.projects || '50+ Completed'
          });
        }
      } catch (error) {
        console.error('Error loading about data:', error);
        setMessage('Error loading data. Using defaults.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error messages when user starts typing
    if (message && message.includes('Error')) {
      setMessage('');
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...aboutData.skills];
    newSkills[index] = value;
    setAboutData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setAboutData(prev => ({
      ...prev,
      skills: [...prev.skills, 'New Skill']
    }));
  };

  const removeSkill = (index) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      // Validate description length (warn if very long but allow it)
      if (aboutData.description && aboutData.description.length > 50000) {
        setMessage('Warning: Description is very long. This may cause issues.');
      }
      
      const result = await saveAboutData(aboutData);
      if (result.success) {
        setMessage('About page data saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.error}`);
        // Keep error message longer so user can read it
        setTimeout(() => setMessage(''), 8000);
      }
    } catch (error) {
      console.error('Error saving about data:', error);
      setMessage(`Error saving data: ${error.message}`);
      setTimeout(() => setMessage(''), 8000);
    } finally {
      setSaving(false);
    }
  };

  const AboutEditor = () => (
    <div className="make-about">
      <div className="editor-header">
        <h1>Edit About Page</h1>
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
        <div className={`message ${message.includes('Error') || message.includes('error') ? 'error' : 'success'}`} style={{ whiteSpace: 'pre-line' }}>
          {message}
        </div>
      )}
      {loading && <div className="loading">Loading data...</div>}

      <div className="editor-content">
        <div className="form-section">
          <h2>About Information</h2>
          <div className="form-group">
            <label>Page Title</label>
            <input
              type="text"
              name="title"
              value={aboutData.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={aboutData.subtitle}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={aboutData.description}
              onChange={handleInputChange}
              rows="4"
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Skills</h2>
          {aboutData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="form-input"
              />
              <button 
                onClick={() => removeSkill(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={addSkill} className="add-skill-btn">
            Add Skill
          </button>
        </div>

        <div className="form-section">
          <h2>Statistics</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={aboutData.experience}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Projects</label>
              <input
                type="text"
                name="projects"
                value={aboutData.projects}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PasswordProtection pageName="About">
      <AboutEditor />
    </PasswordProtection>
  );
};

export default MakeAbout;
