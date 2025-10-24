import React, { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaSave, FaShieldAlt } from 'react-icons/fa';
import { getSecuritySettings, changeAdminPassword, changePagePassword } from '../services/securityService';
import './SecurityManager.css';

const SecurityManager = () => {
  const [securitySettings, setSecuritySettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});
  const [formData, setFormData] = useState({
    adminPassword: '',
    newAdminPassword: '',
    confirmAdminPassword: '',
    pagePasswords: {}
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    try {
      const result = await getSecuritySettings();
      if (result.success && result.data) {
        setSecuritySettings(result.data);
        setFormData(prev => ({
          ...prev,
          pagePasswords: result.data.page_passwords || {}
        }));
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePagePasswordChange = (pageName, value) => {
    setFormData(prev => ({
      ...prev,
      pagePasswords: {
        ...prev.pagePasswords,
        [pageName]: value
      }
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChangeAdminPassword = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.newAdminPassword !== formData.confirmAdminPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const result = await changeAdminPassword(formData.adminPassword, formData.newAdminPassword);
      if (result.success) {
        setMessage('Admin password updated successfully');
        setFormData(prev => ({
          ...prev,
          adminPassword: '',
          newAdminPassword: '',
          confirmAdminPassword: ''
        }));
        loadSecuritySettings();
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (error) {
      setMessage('Error updating admin password');
    }
  };

  const handleChangePagePassword = async (pageName, newPassword) => {
    try {
      const result = await changePagePassword(pageName, newPassword);
      if (result.success) {
        setMessage(`Password for ${pageName} updated successfully`);
        loadSecuritySettings();
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (error) {
      setMessage('Error updating page password');
    }
  };

  if (loading) {
    return <div className="security-manager loading">Loading security settings...</div>;
  }

  return (
    <div className="security-manager">
      <div className="security-header">
        <FaShieldAlt className="security-icon" />
        <h1>Security Management</h1>
        <p>Manage passwords and access control for your portfolio</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="security-sections">
        {/* Admin Password Section */}
        <div className="security-section">
          <h2>Admin Password</h2>
          <form onSubmit={handleChangeAdminPassword} className="password-form">
            <div className="form-group">
              <label>Current Admin Password</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.adminPassword ? 'text' : 'password'}
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('adminPassword')}
                  className="password-toggle"
                >
                  {showPasswords.adminPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Admin Password</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.newAdminPassword ? 'text' : 'password'}
                  name="newAdminPassword"
                  value={formData.newAdminPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newAdminPassword')}
                  className="password-toggle"
                >
                  {showPasswords.newAdminPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.confirmAdminPassword ? 'text' : 'password'}
                  name="confirmAdminPassword"
                  value={formData.confirmAdminPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmAdminPassword')}
                  className="password-toggle"
                >
                  {showPasswords.confirmAdminPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              <FaSave /> Update Admin Password
            </button>
          </form>
        </div>

        {/* Page Passwords Section */}
        <div className="security-section">
          <h2>Page Passwords</h2>
          <div className="page-passwords">
            {Object.entries(formData.pagePasswords).map(([pageName, password]) => (
              <div key={pageName} className="page-password-item">
                <label>{pageName.replace('make', '').toUpperCase()} Page</label>
                <div className="password-input-group">
                  <input
                    type={showPasswords[`page_${pageName}`] ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePagePasswordChange(pageName, e.target.value)}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(`page_${pageName}`)}
                    className="password-toggle"
                  >
                    {showPasswords[`page_${pageName}`] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangePagePassword(pageName, password)}
                    className="btn btn-secondary"
                  >
                    <FaSave /> Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityManager;
