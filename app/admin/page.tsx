'use client';

import { useAuth } from '@/lib/auth';
import ProtectedRoute from './ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './dashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <ProtectedRoute>
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.username}! Manage your PYROCRAFT store</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>

      <div className="dashboard-grid">
        {/* Products Section */}
        <div className="dashboard-card">
          <div className="card-icon"><span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>inventory_2</span></div>
          <h2>Products</h2>
          <p>Manage your product catalog</p>
          <div className="card-actions">
            <Link href="/admin/products">
              <button className="btn-card">View All</button>
            </Link>
            <Link href="/admin/add-product">
              <button className="btn-card primary">+ Add Product</button>
            </Link>
          </div>
        </div>

        {/* Orders Section */}
        <div className="dashboard-card">
          <div className="card-icon"><span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>shopping_cart</span></div>
          <h2>Orders</h2>
          <p>View and manage customer orders</p>
          <div className="card-actions">
            <Link href="/admin/orders">
              <button className="btn-card">View Orders</button>
            </Link>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="dashboard-card">
          <div className="card-icon"><span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>analytics</span></div>
          <h2>Analytics</h2>
          <p>View sales and performance metrics</p>
          <div className="card-actions">
            <Link href="/admin/analytics">
              <button className="btn-card primary">View Analytics</button>
            </Link>
          </div>
        </div>

        {/* Settings Section */}
        <div className="dashboard-card">
          <div className="card-icon"><span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>settings</span></div>
          <h2>Settings</h2>
          <p>Configure store settings</p>
          <div className="card-actions">
            <Link href="/admin/settings">
              <button className="btn-card">Manage Settings</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <Link href="/">
          <button className="btn-secondary"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>arrow_back</span> Back to Store</button>
        </Link>
      </div>
    </div>
    </ProtectedRoute>
  );
}
