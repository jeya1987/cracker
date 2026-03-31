'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../ProtectedRoute';
import '../admin.css';

interface StoreSettings {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  gstRate: string;
  deliveryCharge: string;
  freeDeliveryAbove: string;
  maxOrderQty: string;
  maintenanceMode: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'PYROCRAFT',
  contactEmail: 'admin@pyrocraft.com',
  contactPhone: '+91 98765 43210',
  currency: 'INR',
  gstRate: '18',
  deliveryCharge: '99',
  freeDeliveryAbove: '999',
  maxOrderQty: '50',
  maintenanceMode: false,
};

function SettingsPageContent() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pyrocraft_settings');
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleChange = (key: keyof StoreSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('pyrocraft_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('pyrocraft_settings');
    setSaved(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Settings</h1>
        <p>Configure your store preferences</p>
      </div>

      {saved && (
        <div className="success-message">
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>check_circle</span>
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="product-form">
        {/* Store Info */}
        <div className="form-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>storefront</span>
            Store Information
          </h2>
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>payments</span>
            Pricing & Tax
          </h2>
          <div className="form-row">
            <div className="form-group">
              <label>Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="form-group">
              <label>GST Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.gstRate}
                onChange={(e) => handleChange('gstRate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="form-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>local_shipping</span>
            Delivery Settings
          </h2>
          <div className="form-row">
            <div className="form-group">
              <label>Delivery Charge (₹)</label>
              <input
                type="number"
                min="0"
                value={settings.deliveryCharge}
                onChange={(e) => handleChange('deliveryCharge', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Free Delivery Above (₹)</label>
              <input
                type="number"
                min="0"
                value={settings.freeDeliveryAbove}
                onChange={(e) => handleChange('freeDeliveryAbove', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Max Order Quantity</label>
              <input
                type="number"
                min="1"
                value={settings.maxOrderQty}
                onChange={(e) => handleChange('maxOrderQty', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Advanced */}
        <div className="form-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>tune</span>
            Advanced
          </h2>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }}
              />
              <span>Maintenance Mode</span>
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              When enabled, the storefront will show a maintenance page to customers.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleReset}>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>restart_alt</span>
            Reset to Defaults
          </button>
          <button type="submit" className="btn-primary">
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '6px' }}>save</span>
            Save Settings
          </button>
        </div>
      </form>

      <div className="admin-footer" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/admin">
          <button className="btn-secondary">
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>arrow_back</span>
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsPageContent />
    </ProtectedRoute>
  );
}
