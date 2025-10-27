import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import './PortfolioDetail.css';

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample portfolio data - in a real app, this would come from an API
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Design',
      description: 'A modern e-commerce platform with intuitive user interface and seamless shopping experience.',
      fullDescription: `This comprehensive e-commerce platform was built to provide a seamless shopping experience for both customers and merchants. The project involved creating a full-stack solution with modern web technologies and best practices.

The platform features a responsive design that works perfectly across all devices, from mobile phones to desktop computers. The user interface was carefully crafted to ensure intuitive navigation and an engaging shopping experience.

Key features include:
• Advanced product catalog with filtering and search
• Secure payment processing with Stripe integration
• Real-time inventory management
• Customer account management
• Order tracking and history
• Admin dashboard for merchants
• Mobile-responsive design
• SEO optimization

The backend is built with Node.js and Express, providing a robust and scalable API. MongoDB is used for data storage, ensuring fast and reliable data management. The frontend is developed with React, providing a smooth and interactive user experience.

The project also includes comprehensive testing, security measures, and performance optimization to ensure the platform can handle high traffic and provide a secure shopping environment.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/username/ecommerce-platform',
      startDate: 'January 2024',
      endDate: 'March 2024',
      status: 'Completed',
      client: 'Tech Solutions Inc.',
      role: 'Full Stack Developer'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile Design',
      description: 'Secure and user-friendly mobile banking application with advanced security features.',
      fullDescription: `This mobile banking application was designed to provide a secure and user-friendly banking experience for customers. The app focuses on security, usability, and modern design principles.

The application includes comprehensive banking features while maintaining the highest security standards. The design prioritizes user experience and accessibility, ensuring that users of all ages and technical abilities can easily navigate and use the app.

Key features include:
• Secure login with biometric authentication
• Account balance and transaction history
• Money transfer and bill payments
• Investment tracking and management
• Card management and controls
• Real-time notifications
• Dark mode support
• Accessibility features

The app was developed using Flutter, ensuring cross-platform compatibility for both iOS and Android devices. Firebase is used for backend services, providing real-time data synchronization and secure authentication.

Security was a top priority throughout the development process. The app implements multiple layers of security including encryption, secure API communication, and fraud detection systems.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['Figma', 'Adobe XD', 'Sketch'],
      liveUrl: 'https://banking-app-demo.com',
      githubUrl: 'https://github.com/username/banking-app',
      startDate: 'November 2023',
      endDate: 'February 2024',
      status: 'Completed',
      client: 'Financial Services Ltd.',
      role: 'UI/UX Designer'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'Web Design',
      description: 'Comprehensive dashboard for SaaS application with real-time analytics and reporting.',
      fullDescription: `This SaaS dashboard provides comprehensive analytics and reporting capabilities for business users. The dashboard was designed to handle large amounts of data while maintaining excellent performance and user experience.

The project involved creating a complex data visualization system that allows users to understand their business metrics at a glance. The dashboard is highly customizable, allowing users to create their own views and reports.

Key features include:
• Real-time data visualization with charts and graphs
• Customizable dashboard layouts
• Advanced filtering and search capabilities
• Export functionality for reports
• User role management
• API integration for data sources
• Responsive design for all devices
• Dark and light theme support

The frontend is built with Vue.js and D3.js for advanced data visualization. The backend uses Node.js with a PostgreSQL database for optimal performance with large datasets. Chart.js is used for creating interactive and responsive charts.

The dashboard includes advanced features like real-time updates, data export, and custom report generation. The design focuses on clarity and usability, making complex data easy to understand and act upon.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['Vue.js', 'D3.js', 'Chart.js'],
      liveUrl: 'https://saas-dashboard-demo.com',
      githubUrl: 'https://github.com/username/saas-dashboard',
      startDate: 'September 2023',
      endDate: 'December 2023',
      status: 'Completed',
      client: 'Data Analytics Corp.',
      role: 'Frontend Developer'
    },
    {
      id: 4,
      title: 'Healthcare App',
      category: 'Mobile Design',
      description: 'Patient management system with appointment scheduling and medical records.',
      fullDescription: `This healthcare application was designed to streamline patient management and improve the overall healthcare experience for both patients and medical professionals.

The app provides a comprehensive solution for healthcare management, including patient records, appointment scheduling, and communication between patients and healthcare providers.

Key features include:
• Patient registration and profile management
• Appointment scheduling and reminders
• Medical records and history tracking
• Prescription management
• Telemedicine capabilities
• Secure messaging system
• Health tracking and monitoring
• Integration with medical devices

The application was built using React Native for cross-platform compatibility, ensuring that both iOS and Android users can access the same features. Firebase is used for backend services, providing real-time data synchronization and secure data storage.

Security and privacy were critical considerations throughout the development process. The app complies with healthcare data protection regulations and implements industry-standard security measures to protect sensitive patient information.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: 'https://healthcare-app-demo.com',
      githubUrl: 'https://github.com/username/healthcare-app',
      startDate: 'June 2023',
      endDate: 'October 2023',
      status: 'Completed',
      client: 'MedTech Solutions',
      role: 'Mobile Developer'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'Web Design',
      description: 'Personal portfolio website with modern design and smooth animations.',
      fullDescription: `This personal portfolio website showcases my work and skills in a modern, interactive format. The website was designed to provide an engaging user experience while effectively presenting my projects and capabilities.

The portfolio features a clean, modern design with smooth animations and transitions. The website is fully responsive and optimized for performance across all devices and browsers.

Key features include:
• Interactive project showcase
• Smooth animations and transitions
• Responsive design for all devices
• Fast loading times
• SEO optimization
• Contact form integration
• Blog section for articles
• Dark and light theme support

The website is built with React and styled with modern CSS techniques. Framer Motion is used for smooth animations and transitions, creating an engaging user experience. The site is optimized for performance and SEO.

The design focuses on simplicity and clarity, allowing visitors to easily navigate through my work and learn about my skills and experience. The website serves as both a portfolio and a personal brand showcase.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['React', 'Framer Motion', 'Styled Components'],
      liveUrl: 'https://muhammadabdullahcv.vercel.app',
      githubUrl: 'https://github.com/AbdullahWali79/muhammadabdullahcv',
      startDate: 'March 2024',
      endDate: 'April 2024',
      status: 'Completed',
      client: 'Personal Project',
      role: 'Full Stack Developer'
    },
    {
      id: 6,
      title: 'Restaurant App',
      category: 'Mobile Design',
      description: 'Food delivery application with order tracking and payment integration.',
      fullDescription: `This restaurant application provides a complete solution for food delivery, including order management, payment processing, and real-time tracking.

The app was designed to provide a seamless experience for both customers and restaurant staff, streamlining the entire food delivery process from order placement to delivery.

Key features include:
• Restaurant menu browsing and ordering
• Real-time order tracking
• Secure payment processing
• Customer reviews and ratings
• Delivery driver management
• Restaurant analytics dashboard
• Push notifications
• Multi-language support

The application is built with Flutter for cross-platform compatibility, ensuring consistent performance on both iOS and Android devices. Firebase is used for backend services, providing real-time data synchronization and user authentication.

Google Maps integration provides accurate location tracking and delivery route optimization. The app includes comprehensive analytics to help restaurants understand customer preferences and optimize their operations.`,
      image: 'https://raw.githubusercontent.com/AbdullahWali79/AbdullahImages/main/Protfolio.jpeg',
      technologies: ['Flutter', 'Firebase', 'Google Maps'],
      liveUrl: 'https://restaurant-app-demo.com',
      githubUrl: 'https://github.com/username/restaurant-app',
      startDate: 'August 2023',
      endDate: 'November 2023',
      status: 'Completed',
      client: 'FoodTech Inc.',
      role: 'Mobile Developer'
    }
  ];

  // Find the project by ID
  const project = projects.find(item => item.id === parseInt(id));

  if (!project) {
    return (
      <div className="portfolio-detail">
        <div className="portfolio-detail-container">
          <div className="error-message">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <button className="back-btn" onClick={() => navigate('/portfolio')}>
              <FaArrowLeft className="btn-icon" />
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/portfolio');
  };

  const handleLiveClick = () => {
    window.open(project.liveUrl, '_blank');
  };

  const handleGithubClick = () => {
    window.open(project.githubUrl, '_blank');
  };

  return (
    <div className="portfolio-detail">
      <div className="portfolio-detail-container">
        <button className="back-btn" onClick={handleBackClick}>
          <FaArrowLeft className="btn-icon" />
          Back to Portfolio
        </button>

        <article className="project-article">
          <div className="project-header">
            <div className="project-category">{project.category}</div>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
            
            <div className="project-meta">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <div className="meta-item">
                <FaUser className="meta-icon" />
                <span>{project.role}</span>
              </div>
              <div className="meta-item">
                <FaTag className="meta-icon" />
                <span>{project.status}</span>
              </div>
            </div>

            <div className="project-actions">
              <button className="action-btn primary" onClick={handleLiveClick}>
                <FaExternalLinkAlt className="btn-icon" />
                View Live
              </button>
              <button className="action-btn secondary" onClick={handleGithubClick}>
                <FaGithub className="btn-icon" />
                View Code
              </button>
            </div>
          </div>

          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="project-content">
            <div className="content-section">
              <h2>Project Overview</h2>
              <div className="project-details">
                <div className="detail-item">
                  <strong>Client:</strong> {project.client}
                </div>
                <div className="detail-item">
                  <strong>Duration:</strong> {project.startDate} - {project.endDate}
                </div>
                <div className="detail-item">
                  <strong>Role:</strong> {project.role}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> {project.status}
                </div>
              </div>
            </div>

            <div className="content-section">
              <h2>Project Description</h2>
              <div className="project-full-description">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="description-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="content-section">
              <h2>Technologies Used</h2>
              <div className="technologies-grid">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PortfolioDetail;
