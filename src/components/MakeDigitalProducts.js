import React, { useState, useEffect } from 'react';
import { getDigitalProductsData, saveDigitalProductsData } from '../services/supabaseService';
import './MakePrompts.css'; // We can reuse the styling from MakePrompts for simplicity

const MakeDigitalProducts = () => {
  const [data, setData] = useState({
    title: 'Digital Products',
    subtitle: 'My Premium Collection of Digital Tools',
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await getDigitalProductsData();

      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error loading digital products data:', error);
      setMessage({ type: 'error', text: 'Failed to load digital products data.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePageInfoChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!newProduct.title.trim() || !newProduct.description.trim()) {
      setMessage({ type: 'error', text: 'Title and description are required for a product!' });
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: Date.now().toString()
    };

    setData(prev => ({
      ...prev,
      products: [productToAdd, ...(prev.products || [])]
    }));

    setNewProduct({
      title: '',
      category: '',
      description: '',
      price: '',
      imageUrl: ''
    });
    setIsAddingProduct(false);
    setMessage({ type: 'success', text: 'Product added locally. Don\'t forget to save!' });
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    
    if (!newProduct.title.trim() || !newProduct.description.trim()) {
      setMessage({ type: 'error', text: 'Title and description are required!' });
      return;
    }

    const updatedProducts = [...(data.products || [])];
    updatedProducts[editingIndex] = {
      ...updatedProducts[editingIndex],
      ...newProduct
    };

    setData(prev => ({
      ...prev,
      products: updatedProducts
    }));

    setNewProduct({
      title: '',
      category: '',
      description: '',
      price: '',
      imageUrl: ''
    });
    setEditingIndex(null);
    setIsAddingProduct(false);
    setMessage({ type: 'success', text: 'Product updated locally. Don\'t forget to save!' });
  };

  const startEditProduct = (index) => {
    const p = data.products[index];
    setNewProduct({
      title: p.title || '',
      category: p.category || '',
      description: p.description || '',
      price: p.price || '',
      imageUrl: p.imageUrl || ''
    });
    setEditingIndex(index);
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = data.products.filter((_, i) => i !== index);
      setData(prev => ({ ...prev, products: updatedProducts }));
      setMessage({ type: 'success', text: 'Product removed locally. Don\'t forget to save!' });
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingIndex(null);
    setNewProduct({
      title: '',
      category: '',
      description: '',
      price: '',
      imageUrl: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await saveDigitalProductsData(data);

      if (result.success) {
        setMessage({ type: 'success', text: 'Digital Products data saved successfully!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save data. Please try again.' });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return <div className="loading" style={{ color: '#00CED1' }}>Loading Digital Products Form...</div>;
  }

  return (
    <div className="make-page">
      <div className="form-container">
        <div className="form-header">
          <h2>Edit Digital Products</h2>
          <p>Manage your digital products, their prices, and descriptions.</p>
        </div>

        {message.text && (
          <div className={`message-banner ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-section">
            <h3>Page Header</h3>
            <div className="form-group">
              <label htmlFor="title">Page Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title || ''}
                onChange={handlePageInfoChange}
                placeholder="Digital Products"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">Page Subtitle</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={data.subtitle || ''}
                onChange={handlePageInfoChange}
                placeholder="A collection of my premium digital products"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header-flex">
              <h3>Products List</h3>
              {!isAddingProduct && (
                <button 
                  type="button" 
                  className="add-btn"
                  onClick={() => setIsAddingProduct(true)}
                >
                  <i className="fas fa-plus"></i> Add New Product
                </button>
              )}
            </div>

            {isAddingProduct && (
              <div className="nested-form">
                <h4>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h4>
                
                <div className="form-group">
                  <label htmlFor="productTitle">Product Title</label>
                  <input
                    type="text"
                    id="productTitle"
                    name="title"
                    value={newProduct.title}
                    onChange={handleProductChange}
                    placeholder="e.g. Meta Ads Setup Guide"
                    className="form-control"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="productCategory">Category</label>
                    <input
                      type="text"
                      id="productCategory"
                      name="category"
                      value={newProduct.category}
                      onChange={handleProductChange}
                      placeholder="e.g. Marketing, Code, etc."
                      className="form-control"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="productPrice">Price</label>
                    <input
                      type="text"
                      id="productPrice"
                      name="price"
                      value={newProduct.price}
                      onChange={handleProductChange}
                      placeholder="e.g. $49.00 or PKR 2000"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="productImageUrl">Image URL (Optional)</label>
                  <input
                    type="text"
                    id="productImageUrl"
                    name="imageUrl"
                    value={newProduct.imageUrl}
                    onChange={handleProductChange}
                    placeholder="URL for the product cover image"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    id="productDescription"
                    name="description"
                    value={newProduct.description}
                    onChange={handleProductChange}
                    placeholder="Detailed description of the digital product..."
                    className="form-control"
                    rows="4"
                  />
                </div>

                <div className="nested-form-actions">
                  <button 
                    type="button" 
                    className="save-item-btn"
                    onClick={editingIndex !== null ? handleSaveEdit : handleAddProduct}
                  >
                    {editingIndex !== null ? 'Update Product' : 'Add Product'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="items-list">
              {(!data.products || data.products.length === 0) ? (
                <p className="no-items">No products added yet.</p>
              ) : (
                data.products.map((product, index) => (
                  <div key={product.id || index} className="list-item-card">
                    <div className="item-header">
                      <h4>{product.title} <span className="item-category-badge">{product.category}</span></h4>
                      <div className="item-actions">
                        <button type="button" onClick={() => startEditProduct(index)} title="Edit" className="edit-icon-btn">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button type="button" onClick={() => handleDeleteProduct(index)} title="Delete" className="delete-icon-btn">
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                    <div className="item-details">
                      <p><strong>Price:</strong> {product.price}</p>
                      <p className="item-desc">{product.description && product.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeDigitalProducts;
