import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
          <Route path="/makecv" element={<CVForm userData={userData} setUserData={setUserData} />} />
          <Route path="/makehome" element={<MakeHome />} />
          <Route path="/makeabout" element={<MakeAbout />} />
          <Route path="/makeservice" element={<MakeService />} />
          <Route path="/makeportfolio" element={<MakePortfolio />} />
          <Route path="/makenews" element={<MakeNews />} />
          <Route path="/makecontact" element={<MakeContact />} />
          <Route path="/security" element={<SecurityManager />} />
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

