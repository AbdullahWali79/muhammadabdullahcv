import React, { useState, useEffect } from 'react';
import { getAboutData } from '../services/supabaseService';
import './About.css';

const About = ({ userData }) => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const result = await getAboutData();
        if (result.success && result.data) {
          setAboutData(result.data);
        }
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  if (loading) {
    return (
      <div className="about">
        <div className="about-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  const displayTitle = aboutData?.title || 'About Me';
  const displaySubtitle = aboutData?.subtitle || 'Get to know me better';
  const displayDescription = aboutData?.description || '';
  const displaySkills = aboutData?.skills || [];
  const displayExperience = aboutData?.experience || '';
  const displayProjects = aboutData?.projects || '';

  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1>{displayTitle}</h1>
          <p>{displaySubtitle}</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Hello, I'm {userData.firstName} {userData.lastName}</h2>
            <p className="about-summary">{userData.summary}</p>
            
            {displayDescription && (
              <div className="detail-item">
                <p>{displayDescription}</p>
              </div>
            )}
            
            <div className="about-details">
              {(displayExperience || displayProjects) && (
                <div className="detail-item">
                  <h3>Statistics</h3>
                  <div className="stats-row">
                    {displayExperience && (
                      <div className="stat-item">
                        <span className="stat-value">{displayExperience}</span>
                        <span className="stat-label">Experience</span>
                      </div>
                    )}
                    {displayProjects && (
                      <div className="stat-item">
                        <span className="stat-value">{displayProjects}</span>
                        <span className="stat-label">Projects</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {displaySkills && displaySkills.length > 0 && (
                <div className="detail-item">
                  <h3>Skills & Expertise</h3>
                  <div className="skills-grid">
                    {displaySkills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{width: `${Math.min(90, 70 + index * 5)}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="about-image">
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="About" />
            ) : (
              <div className="default-about-avatar">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

