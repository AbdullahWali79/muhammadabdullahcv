import React, { useState, useEffect } from 'react';
import PasswordProtection from './PasswordProtection';
import { saveHomeData, getHomeData } from '../services/supabaseService';
import { FaSave, FaEye, FaEdit } from 'react-icons/fa';
import './MakeHome.css';

const MakeHome = () => {
  const [homeData, setHomeData] = useState({
    title: 'Welcome to My Portfolio',
    subtitle: 'AI Developer',
    description: 'Consistency Makes a Man Perfect in Their Skill Set. - M. Abdullah',
    buttonText: 'Get Started',
    buttonLink: '#contact',
    helloText: 'AsslamuAlikum',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/muhammadabdullah',
      twitter: 'https://twitter.com/muhammadabdullah',
      github: 'https://github.com/AbdullahWali79',
      dribbble: 'https://dribbble.com/muhammadabdullah'
    }
  });
  const [loading, setLoading] = useState(false);

  // Load data from database on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getHomeData();
        if (result.success && result.data) {
          setHomeData({
            title: result.data.title || 'Welcome to My Portfolio',
            subtitle: result.data.subtitle || 'AI Developer',
            description: result.data.description || 'Consistency Makes a Man Perfect in Their Skill Set. - M. Abdullah',
            buttonText: result.data.buttonText || 'Get Started',
            buttonLink: result.data.buttonLink || '#contact',
            helloText: result.data.helloText || 'AsslamuAlikum',
            socialLinks: result.data.socialLinks || {
              linkedin: 'https://linkedin.com/in/muhammadabdullah',
              twitter: 'https://twitter.com/muhammadabdullah',
              github: 'https://github.com/AbdullahWali79',
              dribbble: 'https://dribbble.com/muhammadabdullah'
            }
          });
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setHomeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setHomeData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
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

        <div className="form-section">
          <h2>Social Media Links</h2>
          <p className="section-description">Add your social media profile links that will appear on the home page</p>
          
          <div className="form-group">
            <label>
              <i className="fab fa-linkedin" style={{ color: '#0077B5', marginRight: '8px' }}></i>
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={homeData.socialLinks.linkedin}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              className="form-input"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fab fa-twitter" style={{ color: '#1DA1F2', marginRight: '8px' }}></i>
              Twitter Profile URL
            </label>
            <input
              type="url"
              value={homeData.socialLinks.twitter}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              className="form-input"
              placeholder="https://twitter.com/your-username"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fab fa-github" style={{ color: '#ffffff', marginRight: '8px' }}></i>
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={homeData.socialLinks.github}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              className="form-input"
              placeholder="https://github.com/your-username"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fab fa-dribbble" style={{ color: '#EA4C89', marginRight: '8px' }}></i>
              Dribbble Profile URL
            </label>
            <input
              type="url"
              value={homeData.socialLinks.dribbble}
              onChange={(e) => handleSocialLinkChange('dribbble', e.target.value)}
              className="form-input"
              placeholder="https://dribbble.com/your-username"
            />
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
