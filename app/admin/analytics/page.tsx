'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../ProtectedRoute';
import './analytics.css';

interface Stats {
  total_revenue: number;
  total_orders: number;
  total_products: number;
  pending_orders: number;
  delivered_orders: number;
  avg_order_value: number;
}

interface TrendDay {
  date: string;
  revenue: number;
  orders: number;
}

interface TopProduct {
  id: number;
  name: string;
  emoji: string;
  category: string;
  price: number;
  total_sold: number;
  total_revenue: number;
}

interface CategoryBreakdown {
  category: string;
  order_count: number;
  revenue: number;
}

function AnalyticsPageContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [trend, setTrend] = useState<TrendDay[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, trendRes, topRes, catRes] = await Promise.all([
          fetch(`${API}/api/analytics/stats`),
          fetch(`${API}/api/analytics/sales-trend`),
          fetch(`${API}/api/analytics/top-products`),
          fetch(`${API}/api/analytics/category-breakdown`),
        ]);
        setStats(await statsRes.json());
        setTrend(await trendRes.json());
        setTopProducts(await topRes.json());
        setCategories(await catRes.json());
      } catch (err) {
        console.error('Analytics fetch error:', err);
      }
      setLoading(false);
    };
    fetchAll();
  }, [API]);

  const safeTrend = Array.isArray(trend) ? trend : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const maxRevenue = Math.max(...safeTrend.map(d => d.revenue), 1);
  const maxCategoryRevenue = Math.max(...safeCategories.map(c => c.revenue), 1);

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>hourglass_empty</span>
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Business performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>payments</span>
          </div>
          <div className="stat-value">₹{stats?.total_revenue?.toLocaleString() || '0'}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>shopping_bag</span>
          </div>
          <div className="stat-value">{stats?.total_orders || 0}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>inventory_2</span>
          </div>
          <div className="stat-value">{stats?.total_products || 0}</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>pending_actions</span>
          </div>
          <div className="stat-value">{stats?.pending_orders || 0}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>local_shipping</span>
          </div>
          <div className="stat-value">{stats?.delivered_orders || 0}</div>
          <div className="stat-label">Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>avg_pace</span>
          </div>
          <div className="stat-value">₹{stats?.avg_order_value?.toLocaleString() || '0'}</div>
          <div className="stat-label">Avg Order Value</div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="chart-section">
        <h2>
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>trending_up</span>
          Sales Trend (Last 14 Days)
        </h2>
        {safeTrend.length > 0 ? (
          <div className="chart-container">
            {safeTrend.map((day) => (
              <div key={day.date} className="chart-bar-group">
                <div
                  className="chart-bar"
                  style={{ height: `${Math.max((day.revenue / maxRevenue) * 100, 1)}%` }}
                >
                  <div className="chart-bar-tooltip">
                    ₹{day.revenue.toLocaleString()} · {day.orders} orders
                  </div>
                </div>
                <div className="chart-label">
                  {new Date(day.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined">bar_chart</span>
            <p>No sales data yet</p>
          </div>
        )}
      </div>

      {/* Two Column: Top Products + Category Breakdown */}
      <div className="analytics-columns">
        <div className="top-products-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>star</span>
            Top Products
          </h2>
          {topProducts.length > 0 ? (
            <table className="top-products-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={product.id}>
                    <td>
                      <span className={`rank-badge ${idx < 3 ? `rank-${idx + 1}` : 'rank-default'}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td>
                      <div className="product-name-cell">
                        <span>{product.emoji}</span>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.total_sold}</td>
                    <td className="revenue-cell">₹{product.total_revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <span className="material-symbols-outlined">inventory_2</span>
              <p>No sales recorded yet</p>
            </div>
          )}
        </div>

        <div className="category-section">
          <h2>
            <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>category</span>
            Category Breakdown
          </h2>
          {safeCategories.length > 0 ? (
            <div className="category-list">
              {safeCategories.map((cat) => (
                <div key={cat.category} className="category-item">
                  <span className="category-name">{cat.category}</span>
                  <div className="category-bar-wrap">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${Math.max((cat.revenue / maxCategoryRevenue) * 100, 5)}%` }}
                    >
                      <span>{cat.order_count} items</span>
                    </div>
                  </div>
                  <span className="category-revenue">₹{cat.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="material-symbols-outlined">pie_chart</span>
              <p>No category data yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="analytics-footer">
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

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsPageContent />
    </ProtectedRoute>
  );
}
