'use client';

import { useState } from 'react';
import Link from 'next/link';
import { uploadProductImage } from '@/lib/api';
import ProtectedRoute from '../ProtectedRoute';
import '../admin.css';

function AddProductPageContent() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'aerial',
    price: '',
    original_price: '',
    description: '',
    emoji: '🎆',
    badge: '',
    stock: '100'
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let imageUrl = '';

      // Upload image if selected
      if (imageFile) {
        const uploadResponse = await uploadProductImage(imageFile);
        imageUrl = uploadResponse.data.url;
      }

      // Create product
      const productPayload = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        description: formData.description,
        emoji: formData.emoji,
        badge: formData.badge || null,
        image_url: imageUrl,
        stock: parseInt(formData.stock)
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        category: 'aerial',
        price: '',
        original_price: '',
        description: '',
        emoji: '🎆',
        badge: '',
        stock: '100'
      });
      setImageFile(null);
      setImagePreview(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding product');
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Add New Product</h1>
        <p>Add a new product to your catalog</p>
      </div>

      {success && (
        <div className="success-message">
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>check_circle</span> Product added successfully!
        </div>
      )}

      {error && (
        <div className="error-message">
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>error</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Golden Cascade"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="aerial">Aerial</option>
                <option value="ground">Ground</option>
                <option value="sparkler">Sparklers</option>
                <option value="gift">Gift Sets</option>
              </select>
            </div>

            <div className="form-group">
              <label>Emoji *</label>
              <input
                type="text"
                maxLength={2}
                required
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                placeholder="🎆"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the product..."
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Pricing</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Original Price (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                placeholder="For sale items (optional)"
              />
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Badge & Image</h2>

          <div className="form-group">
            <label>Badge (Optional)</label>
            <select
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            >
              <option value="">None</option>
              <option value="new">New</option>
              <option value="sale">Sale</option>
              <option value="bestseller">Bestseller</option>
            </select>
          </div>

          <div className="form-group">
            <label>📸 Product Image</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                id="imageInput"
              />
              <label htmlFor="imageInput" className="upload-label">
                <span style={{ verticalAlign: 'middle', marginRight: '6px' }}>📸</span> Choose Image
              </label>
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="remove-img"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.2em', verticalAlign: 'middle' }}>close</span> Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="reset" className="btn-secondary">
            Clear Form
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>

      <div className="admin-footer" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/admin">
          <button className="btn-secondary">← Back to Dashboard</button>
        </Link>
        <Link href="/">
          <button className="btn-secondary"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>home</span> Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <ProtectedRoute>
      <AddProductPageContent />
    </ProtectedRoute>
  );
}
