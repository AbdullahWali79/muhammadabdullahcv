import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaEnvelope, FaDatabase } from 'react-icons/fa';
import { generatePDF } from '../utils/pdfGenerator';
import { initializeDataDirectly, testDatabaseConnection } from '../utils/directDataInit';
import './Home.css';

const Home = ({ userData }) => {
  const navigate = useNavigate();
  const [initMessage, setInitMessage] = useState('');

  const handleDownloadCV = () => {
    generatePDF(userData);
  };

  const handleContactMe = () => {
    navigate('/contact');
  };

  const handleTestConnection = async () => {
    setInitMessage('Testing database connection...');
    try {
      const result = await testDatabaseConnection();
      if (result.success) {
        setInitMessage('✅ Database connection successful!');
      } else {
        setInitMessage('❌ Connection failed: ' + result.error);
      }
    } catch (error) {
      setInitMessage('❌ Connection error: ' + error.message);
    }
  };

  const handleInitializeData = async () => {
    setInitMessage('Initializing database...');
    try {
      const result = await initializeDataDirectly();
      if (result.success) {
        setInitMessage('✅ Database initialized successfully! Check your Supabase dashboard.');
      } else {
        setInitMessage('❌ Error: ' + result.error);
      }
    } catch (error) {
      setInitMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="hero-section">
          <div className="hello-badge">{userData.helloText || 'AsslamuAlikum'}</div>
          <div className="hero-content">
            <div className="hero-image">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" />
              ) : (
                <div className="default-hero-avatar">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
              )}
            </div>
            <div className="hero-text">
              <h1 className="hero-title">{userData.firstName} {userData.lastName}</h1>
              <p className="hero-summary">{userData.summary}</p>
            </div>
          </div>
        </div>

        <div className="personal-info">
          <div className="info-tables-container">
            <table className="info-table">
              <tbody>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">👤</div>
                    <span className="info-label">Full Name:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.firstName} {userData.lastName}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">📅</div>
                    <span className="info-label">Date of Birth:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.dateOfBirth}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">📞</div>
                    <span className="info-label">Phone:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.phone}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">📍</div>
                    <span className="info-label">Address:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.address}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="info-table">
              <tbody>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">✉️</div>
                    <span className="info-label">Email Address:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.email}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">💼</div>
                    <span className="info-label">Professional Title:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.title}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">🌐</div>
                    <span className="info-label">Languages:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.languages}</span>
                  </td>
                </tr>
                <tr className="info-row">
                  <td className="info-cell">
                    <div className="info-icon">🏳️</div>
                    <span className="info-label">Nationality:</span>
                  </td>
                  <td className="info-cell">
                    <span className="info-value">{userData.nationality}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={handleDownloadCV}>
            <FaDownload className="btn-icon" />
            Download Resume
          </button>
          <button className="btn btn-primary" onClick={handleContactMe}>
            <FaEnvelope className="btn-icon" />
            Contact Me
          </button>
          <button className="btn btn-secondary" onClick={handleTestConnection} style={{backgroundColor: '#17a2b8', borderColor: '#17a2b8'}}>
            <FaDatabase className="btn-icon" />
            Test Connection
          </button>
          <button className="btn btn-secondary" onClick={handleInitializeData} style={{backgroundColor: '#28a745', borderColor: '#28a745'}}>
            <FaDatabase className="btn-icon" />
            Initialize Database
          </button>
        </div>
        
        {initMessage && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: initMessage.includes('✅') ? '#d4edda' : '#f8d7da',
            color: initMessage.includes('✅') ? '#155724' : '#721c24',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            {initMessage}
          </div>
        )}
      </div>
      
      <footer className="footer">
        <p>© 2024 {userData.firstName} {userData.lastName}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

