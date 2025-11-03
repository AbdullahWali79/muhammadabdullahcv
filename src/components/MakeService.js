import React, { useState, useEffect } from 'react';
import PasswordProtection from './PasswordProtection';
import { FaSave, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { saveServiceData, getServiceData } from '../services/supabaseService';
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load data from database on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getServiceData();
        if (result.success && result.data) {
          const defaultServices = [
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
          ];
          setServiceData({
            title: result.data.title || 'My Services',
            subtitle: result.data.subtitle || 'What I can do for you',
            services: result.data.services || defaultServices
          });
        }
      } catch (error) {
        console.error('Error loading service data:', error);
        setMessage('Error loading data. Using defaults.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
    
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
      if (e.target && document.activeElement !== e.target) {
        e.target.focus();
      }
    });
  };

  const handleServiceChange = (id, field, value, event) => {
    // Save current scroll position and input element
    const scrollPosition = window.scrollY || window.pageYOffset;
    const inputElement = event?.target;
    let cursorPosition = null;
    
    if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
      // Get cursor position - this is after the change since onChange fires after input
      cursorPosition = inputElement.selectionStart || value.length;
    }
    
    setServiceData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
    
    // Restore scroll position, focus, and cursor position
    requestAnimationFrame(() => {
      // Restore scroll position
      if (scrollPosition !== undefined) {
        window.scrollTo(0, scrollPosition);
      }
      
      // Restore focus and cursor position
      if (inputElement) {
        // Focus the input if it lost focus
        if (document.activeElement !== inputElement) {
          inputElement.focus();
        }
        // Restore cursor position - use the saved position or end of text
        if (cursorPosition !== null && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
          // Ensure cursor position doesn't exceed value length
          const safeCursorPos = Math.min(cursorPosition, value.length);
          inputElement.setSelectionRange(safeCursorPos, safeCursorPos);
        }
      }
    });
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

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const result = await saveServiceData(serviceData);
      if (result.success) {
        setMessage('Service page data saved successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving service data:', error);
      setMessage(`Error saving data: ${error.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const ServiceEditor = () => (
    <div className="make-service">
      <div className="editor-header">
        <h1>Edit Service Page</h1>
        <div className="editor-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleSave}
            disabled={saving || loading}
          >
            <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="btn btn-primary">
            <FaEye /> Preview
          </button>
        </div>
      </div>
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      {loading && <div className="loading">Loading data...</div>}

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
                    onChange={(e) => handleServiceChange(service.id, 'title', e.target.value, e)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={service.icon}
                    onChange={(e) => handleServiceChange(service.id, 'icon', e.target.value, e)}
                    className="form-input"
                    maxLength="2"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => handleServiceChange(service.id, 'price', e.target.value, e)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value, e)}
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
