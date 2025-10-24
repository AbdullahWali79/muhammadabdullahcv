import React, { useState } from 'react';
import PasswordProtection from './PasswordProtection';
import { FaSave, FaEye, FaEdit } from 'react-icons/fa';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSave = () => {
    alert('About page data saved successfully!');
  };

  const AboutEditor = () => (
    <div className="make-about">
      <div className="editor-header">
        <h1>Edit About Page</h1>
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
