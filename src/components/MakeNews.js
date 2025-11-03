import React, { useState } from 'react';
import PasswordProtection from './PasswordProtection';
import GitHubImagePicker from './GitHubImagePicker';
import { FaSave, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import './MakeNews.css';

const MakeNews = () => {
  const [newsData, setNewsData] = useState({
    title: 'Latest News',
    subtitle: 'Stay updated with my latest work',
    articles: [
      {
        id: 1,
        title: 'New Project Launch',
        content: 'I am excited to announce the launch of my latest project...',
        date: '2024-01-15',
        category: 'Project',
        image: '',
        featured: true
      },
      {
        id: 2,
        title: 'Design Tips Article',
        content: 'Here are some useful design tips for beginners...',
        date: '2024-01-10',
        category: 'Article',
        image: '',
        featured: false
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    setNewsData(prev => ({
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

  const handleArticleChange = (id, field, value) => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    setNewsData(prev => ({
      ...prev,
      articles: prev.articles.map(article => 
        article.id === id ? { ...article, [field]: value } : article
      )
    }));
    
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  const handleImageSelect = (id, imageUrl) => {
    handleArticleChange(id, 'image', imageUrl);
  };

  const addArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: 'New Article',
      content: 'Article content...',
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      image: '',
      featured: false
    };
    setNewsData(prev => ({
      ...prev,
      articles: [...prev.articles, newArticle]
    }));
  };

  const removeArticle = (id) => {
    setNewsData(prev => ({
      ...prev,
      articles: prev.articles.filter(article => article.id !== id)
    }));
  };

  const handleSave = () => {
    alert('News page data saved successfully!');
  };

  const NewsEditor = () => (
    <div className="make-news">
      <div className="editor-header">
        <h1>Edit News Page</h1>
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
              value={newsData.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={newsData.subtitle}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Articles</h2>
          {newsData.articles.map((article) => (
            <div key={article.id} className="article-item">
              <div className="article-header">
                <h3>Article #{article.id}</h3>
                <div className="article-controls">
                  <label className="featured-checkbox">
                    <input
                      type="checkbox"
                      checked={article.featured}
                      onChange={(e) => handleArticleChange(article.id, 'featured', e.target.checked)}
                    />
                    Featured
                  </label>
                  <button 
                    onClick={() => removeArticle(article.id)}
                    className="remove-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Article Title</label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => handleArticleChange(article.id, 'title', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={article.category}
                    onChange={(e) => handleArticleChange(article.id, 'category', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={article.date}
                    onChange={(e) => handleArticleChange(article.id, 'date', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={article.content}
                  onChange={(e) => handleArticleChange(article.id, 'content', e.target.value)}
                  rows="4"
                  className="form-textarea"
                />
              </div>
              
              <div className="form-group">
                <GitHubImagePicker
                  label={`Article Image - ${article.title}`}
                  currentImage={article.image}
                  onImageSelect={(imageUrl) => handleImageSelect(article.id, imageUrl)}
                />
              </div>
            </div>
          ))}
          
          <button onClick={addArticle} className="add-article-btn">
            <FaPlus /> Add New Article
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PasswordProtection pageName="News">
      <NewsEditor />
    </PasswordProtection>
  );
};

export default MakeNews;
