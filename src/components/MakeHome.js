import React, { useState } from 'react';
import PasswordProtection from './PasswordProtection';
import { saveHomeData } from '../services/supabaseService';
import { FaSave, FaEye, FaEdit } from 'react-icons/fa';
import { preserveScrollAndFocus } from '../utils/scrollPreservation';
import './MakeHome.css';

const MakeHome = () => {
  const [homeData, setHomeData] = useState({
    title: 'Welcome to My Portfolio',
    subtitle: 'AI Developer',
    description: 'Consistency Makes a Man Perfect in Their Skill Set. - M. Abdullah',
    buttonText: 'Get Started',
    buttonLink: '#contact',
    helloText: 'AsslamuAlikum'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const restoreScroll = preserveScrollAndFocus(e.target);
    
    setHomeData(prev => ({
      ...prev,
      [name]: value
    }));
    
    restoreScroll();
  };

  const handleSave = async () => {
    try {
      const result = await saveHomeData(homeData);
      
      if (result.success) {
        alert('Home page data saved to Supabase successfully!');
      } else {
        alert('Error saving data: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving home data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const HomeEditor = () => (
    <div className="make-home">
      <div className="editor-header">
        <h1>Edit Home Page</h1>
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
          <h2>Hero Section</h2>
          <div className="form-group hello-text-group">
            <label>Hello Text (Orange Button)</label>
            <input
              type="text"
              name="helloText"
              value={homeData.helloText}
              onChange={handleInputChange}
              className="form-input hello-text-input"
              placeholder="Enter your custom hello text (e.g., HI, WELCOME, GREETINGS)"
            />
            <small className="form-help">This text appears in the orange button at the top of your home page</small>
          </div>
          
          <div className="form-group">
            <label>Main Title</label>
            <input
              type="text"
              name="title"
              value={homeData.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={homeData.subtitle}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={homeData.description}
              onChange={handleInputChange}
              rows="4"
              className="form-textarea"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={homeData.buttonText}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Button Link</label>
              <input
                type="text"
                name="buttonLink"
                value={homeData.buttonLink}
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
    <PasswordProtection pageName="Home">
      <HomeEditor />
    </PasswordProtection>
  );
};

export default MakeHome;
