import React from 'react';
import './About.css';

const About = ({ userData }) => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1>About Me</h1>
          <p>Get to know me better</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Hello, I'm {userData.firstName} {userData.lastName}</h2>
            <p className="about-summary">{userData.summary}</p>
            
            <div className="about-details">
              <div className="detail-item">
                <h3>Professional Experience</h3>
                <p>With years of experience in the industry, I have developed a strong foundation in design principles and user experience. My journey has been marked by continuous learning and adaptation to new technologies and design trends.</p>
              </div>
              
              <div className="detail-item">
                <h3>Skills & Expertise</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-name">UI/UX Design</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Web Design</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Prototyping</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">User Research</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="detail-item">
                <h3>Personal Interests</h3>
                <p>When I'm not designing, I enjoy exploring new technologies, reading about design trends, and spending time with my family. I believe in maintaining a healthy work-life balance and continuously improving my skills.</p>
              </div>
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

