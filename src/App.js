import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getUserData, saveUserData } from './services/supabaseService';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Portfolio from './components/Portfolio';
import News from './components/News';
import Contact from './components/Contact';
import CVForm from './components/CVForm';
import MakeHome from './components/MakeHome';
import MakeAbout from './components/MakeAbout';
import MakeService from './components/MakeService';
import MakePortfolio from './components/MakePortfolio';
import MakeNews from './components/MakeNews';
import MakeContact from './components/MakeContact';
import SecurityManager from './components/SecurityManager';
import PasswordProtection from './components/PasswordProtection';
import './App.css';

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Author',
    lastName: 'Name',
    title: 'UI/UX Designer',
    dateOfBirth: 'October 26, 1995',
    nationality: 'CreativeLand',
    phone: '+123 456 7890',
    email: 'author.name@example.com',
    address: '123 Design St, Anytown, USA',
    languages: 'English, Designish',
    profileImage: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Professional.jpeg',
    summary: 'I am a passionate and creative UI/UX Designer with a knack for building elegant and functional user experiences. I specialize in user-centered design and have a strong command of modern design tools.'
  });
  const [loading, setLoading] = useState(true);

  // Load user data from database on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database timeout')), 5000)
      );
      
      const dataPromise = getUserData();
      
      const result = await Promise.race([dataPromise, timeoutPromise]);
      
      if (result.success && result.data) {
        setUserData(result.data);
      } else {
        // If no data in database, keep default data
        console.log('No data found in database, using default data');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Keep default data if database fails
      console.log('Database error, using default data');
    } finally {
      setLoading(false);
    }
  };

  const handleUserDataUpdate = async (updatedData) => {
    try {
      const result = await saveUserData(updatedData);
      if (result.success) {
        setUserData(updatedData);
        console.log('User data saved successfully');
      } else {
        console.error('Error saving user data:', result.error);
        // Still update local state even if save fails
        setUserData(updatedData);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      // Still update local state even if save fails
      setUserData(updatedData);
    }
  };

  const location = useLocation();
  const getActiveSection = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'home';
      case '/about':
        return 'about';
      case '/service':
        return 'service';
      case '/portfolio':
        return 'portfolio';
      case '/news':
        return 'news';
      case '/contact':
        return 'contact';
      case '/makecv':
        return 'make-cv';
      case '/makehome':
        return 'make-home';
      case '/makeabout':
        return 'make-about';
      case '/makeservice':
        return 'make-service';
      case '/makeportfolio':
        return 'make-portfolio';
      case '/makenews':
        return 'make-news';
      case '/makecontact':
        return 'make-contact';
      case '/security':
        return 'security';
      default:
        return 'home';
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#1A2B2E',
          color: '#ffffff'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid #00CED1', 
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p>Loading your portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar 
        activeSection={getActiveSection()} 
        userData={userData}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/about" element={<About userData={userData} />} />
          <Route path="/service" element={<Service />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact userData={userData} />} />
          <Route path="/makecv" element={
            <PasswordProtection pageName="CV Creation">
              <CVForm userData={userData} setUserData={handleUserDataUpdate} />
            </PasswordProtection>
          } />
          <Route path="/makehome" element={
            <PasswordProtection pageName="Home Editor">
              <MakeHome />
            </PasswordProtection>
          } />
          <Route path="/makeabout" element={
            <PasswordProtection pageName="About Editor">
              <MakeAbout />
            </PasswordProtection>
          } />
          <Route path="/makeservice" element={
            <PasswordProtection pageName="Service Editor">
              <MakeService />
            </PasswordProtection>
          } />
          <Route path="/makeportfolio" element={
            <PasswordProtection pageName="Portfolio Editor">
              <MakePortfolio />
            </PasswordProtection>
          } />
          <Route path="/makenews" element={
            <PasswordProtection pageName="News Editor">
              <MakeNews />
            </PasswordProtection>
          } />
          <Route path="/makecontact" element={
            <PasswordProtection pageName="Contact Editor">
              <MakeContact />
            </PasswordProtection>
          } />
          <Route path="/security" element={
            <PasswordProtection pageName="Security Manager">
              <SecurityManager />
            </PasswordProtection>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

