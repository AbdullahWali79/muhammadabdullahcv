import React, { useState } from 'react';
import { FaGithub, FaSearch, FaCopy, FaCheck, FaImage } from 'react-icons/fa';
import './GitHubImagePicker.css';

const GitHubImagePicker = ({ onImageSelect, currentImage, label = "Select Image" }) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Convert GitHub raw URL to proper format
  const convertToRawUrl = (url) => {
    if (url.includes('github.com') && !url.includes('raw.githubusercontent.com')) {
      return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    return url;
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const rawUrl = convertToRawUrl(githubUrl);
      
      // Test if image exists
      const response = await fetch(rawUrl, { method: 'HEAD' });
      
      if (response.ok) {
        onImageSelect(rawUrl);
        setGithubUrl('');
        setError('');
      } else {
        setError('Image not found or URL is invalid');
      }
    } catch (err) {
      setError('Failed to load image. Please check the URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleUrls = [
    'https://github.com/username/repo/blob/main/images/image.jpg',
    'https://raw.githubusercontent.com/username/repo/main/images/image.png',
    'https://github.com/username/repo/raw/main/assets/photo.jpg'
  ];

  return (
    <div className="github-image-picker">
      <div className="picker-header">
        <FaGithub className="github-icon" />
        <h3>{label}</h3>
      </div>

      {currentImage && (
        <div className="current-image">
          <img src={currentImage} alt="Current" />
          <div className="image-actions">
            <button 
              onClick={() => copyToClipboard(currentImage)}
              className="copy-btn"
            >
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleUrlSubmit} className="url-form">
        <div className="input-group">
          <FaGithub className="input-icon" />
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Paste GitHub image URL here..."
            className="url-input"
            required
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : <FaSearch />}
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="examples">
        <h4>Example URLs:</h4>
        <div className="example-list">
          {exampleUrls.map((url, index) => (
            <div key={index} className="example-item">
              <code>{url}</code>
              <button 
                onClick={() => copyToClipboard(url)}
                className="copy-example-btn"
              >
                <FaCopy />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="instructions">
        <h4>How to use:</h4>
        <ol>
          <li>Upload your image to a GitHub repository</li>
          <li>Copy the image URL from GitHub</li>
          <li>Paste it in the input field above</li>
          <li>Click the search button to load the image</li>
        </ol>
      </div>
    </div>
  );
};

export default GitHubImagePicker;
