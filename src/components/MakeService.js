import React, { useState } from 'react';
import PasswordProtection from './PasswordProtection';
import { FaSave, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import './MakeService.css';

const MakeService = () => {
  const [serviceData, setServiceData] = useState({
    title: 'My Services',
    subtitle: 'What I can do for you',
    services: [
      {
        id: 1,
        title: 'UI/UX Design',
        description: 'Creating beautiful and functional user interfaces',
        icon: '🎨',
        price: '$50/hour'
      },
      {
        id: 2,
        title: 'Web Development',
        description: 'Building responsive and modern websites',
        icon: '💻',
        price: '$60/hour'
      },
      {
        id: 3,
        title: 'Mobile App Design',
        description: 'Designing mobile applications for iOS and Android',
        icon: '📱',
        price: '$55/hour'
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (id, field, value) => {
    setServiceData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      title: 'New Service',
      description: 'Service description',
      icon: '⭐',
      price: '$0/hour'
    };
    setServiceData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (id) => {
    setServiceData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };

  const handleSave = () => {
    alert('Service page data saved successfully!');
  };

  const ServiceEditor = () => (
    <div className="make-service">
      <div className="editor-header">
        <h1>Edit Service Page</h1>
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
          <h2>Page Information</h2>
          <div className="form-group">
            <label>Page Title</label>
            <input
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={serviceData.subtitle}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Services</h2>
          {serviceData.services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-header">
                <h3>Service #{service.id}</h3>
                <button 
                  onClick={() => removeService(service.id)}
                  className="remove-btn"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Service Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={service.icon}
                    onChange={(e) => handleServiceChange(service.id, 'icon', e.target.value)}
                    className="form-input"
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                  rows="2"
                  className="form-textarea"
                />
              </div>
            </div>
          ))}
          
          <button onClick={addService} className="add-service-btn">
            <FaPlus /> Add New Service
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PasswordProtection pageName="Service">
      <ServiceEditor />
    </PasswordProtection>
  );
};

export default MakeService;
