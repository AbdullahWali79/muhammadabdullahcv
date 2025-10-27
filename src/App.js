import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { getUserData } from './services/supabaseService';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Portfolio from './components/Portfolio';
import PortfolioDetail from './components/PortfolioDetail';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import Contact from './components/Contact';
import CVForm from './components/CVForm';
import MakeHome from './components/MakeHome';
import MakeAbout from './components/MakeAbout';
import MakeService from './components/MakeService';
import MakePortfolio from './components/MakePortfolio';
import MakeNews from './components/MakeNews';
import MakeContact from './components/MakeContact';
import SecurityManager from './components/SecurityManager';
import './components/Mobile.css';
import './components/MobileTable.css';
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

  // Load user data from database on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const result = await getUserData();
        if (result.success && result.data) {
          // Convert database format to component format
          const dbData = result.data;
          setUserData({
            firstName: dbData.first_name || 'Author',
            lastName: dbData.last_name || 'Name',
            title: dbData.title || 'UI/UX Designer',
            dateOfBirth: dbData.date_of_birth || 'October 26, 1995',
            nationality: dbData.nationality || 'CreativeLand',
            phone: dbData.phone || '+123 456 7890',
            email: dbData.email || 'author.name@example.com',
            address: dbData.address || '123 Design St, Anytown, USA',
            languages: dbData.languages || 'English, Designish',
            profileImage: dbData.profile_image || 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Professional.jpeg',
            summary: dbData.summary || 'I am a passionate and creative UI/UX Designer with a knack for building elegant and functional user experiences. I specialize in user-centered design and have a strong command of modern design tools.'
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Keep default data if database fails
      }
    };

    loadUserData();
  }, []);

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
      case '/portfolio/:id':
        return 'portfolio';
      case '/news':
        return 'news';
      case '/news/:id':
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
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact userData={userData} />} />
          <Route path="/makecv" element={
            <PasswordProtection pageName="CV Creation">
              <CVForm userData={userData} setUserData={setUserData} />
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

