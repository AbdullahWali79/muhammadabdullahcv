import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import { generatePDF } from '../utils/pdfGenerator';
import { getPortfolioData, getAboutData } from '../services/supabaseService';
import './Home.css';

const Home = ({ userData }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const handleDownloadCV = async () => {
    setIsGenerating(true);
    try {
      // Fetch portfolio and skills data
      const [portfolioResult, aboutResult] = await Promise.all([
        getPortfolioData(),
        getAboutData()
      ]);

      const portfolioData = portfolioResult.success ? portfolioResult.data : null;
      const aboutData = aboutResult.success ? aboutResult.data : null;

      // Generate PDF with all data
      await generatePDF(userData, portfolioData, aboutData);
    } catch (error) {
      console.error('Error fetching data for PDF:', error);
      alert('Error loading data. Generating PDF with available information...');
      await generatePDF(userData, null, null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContactMe = () => {
    // Redirect to WhatsApp
    const whatsappNumber = '923046983794';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  // Typing animation effect with loop
  useEffect(() => {
    const fullText = userData.summary?.replace(/ - /g, ' \u2013 ') || '';
    if (!fullText) return;

    let currentIndex = 0;
    let typingInterval = null;
    let pauseTimeout = null;

    const startTyping = () => {
      setDisplayedText('');
      setIsTyping(true);
      currentIndex = 0;

      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          
          // Wait 2 seconds before restarting
          pauseTimeout = setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }, 50); // Adjust speed here (lower = faster)
    };

    startTyping();

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [userData.summary]);


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
              <p className="hero-summary">
                {displayedText}
                {isTyping && <span className="typing-cursor">|</span>}
              </p>
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
          <button className="btn btn-secondary" onClick={handleDownloadCV} disabled={isGenerating}>
            <FaDownload className="btn-icon" />
            {isGenerating ? 'Generating PDF...' : 'Download Resume'}
          </button>
          <button className="btn btn-primary" onClick={handleContactMe}>
            <FaEnvelope className="btn-icon" />
            Contact Me
          </button>
        </div>
      </div>
      
      <footer className="footer">
        <p>© 2026 {userData.firstName} {userData.lastName}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

