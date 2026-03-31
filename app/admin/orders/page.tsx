'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../ProtectedRoute';
import '../admin.css';
import './orders.css';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

interface OrderTracking {
  id: number;
  status: string;
  message: string;
  created_at: string;
}

interface Order {
  id: number;
  order_number: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  tracking: OrderTracking[];
  created_at: string;
  updated_at: string;
}

interface FilterOptions {
  search: string;
  status: 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  sortBy: 'date' | 'total' | 'name';
  sortOrder: 'asc' | 'desc';
}

function OrdersPageContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?limit=100`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        // Ensure items and tracking are arrays
        const processedOrders = (data || []).map(order => ({
          ...order,
          items: order.items || [],
          tracking: order.tracking || []
        }));
        setOrders(processedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching orders');
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...orders];

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(o =>
        o.order_number.toLowerCase().includes(search) ||
        o.name.toLowerCase().includes(search) ||
        o.email.toLowerCase().includes(search) ||
        o.phone.includes(search)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(o => o.status === filters.status);
    }

    // Sorting
    result.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (filters.sortBy === 'date') {
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
      } else if (filters.sortBy === 'total') {
        aVal = a.total_price;
        bVal = b.total_price;
      } else {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      }

      const comparison = aVal > bVal ? 1 : -1;
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredOrders(result);
  }, [orders, filters]);

  // Update order status
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status?new_status=${newStatus}`,
        { method: 'PUT' }
      );

      if (!response.ok) throw new Error('Failed to update status');

      setOrders(orders.map(o =>
        o.order_number === orderId ? { ...o, status: newStatus as any } : o
      ));

      if (selectedOrder && selectedOrder.order_number === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as any });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error updating status');
    }
    setUpdatingStatus(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'processing':
        return '#2196f3';
      case 'shipped':
        return '#ff9800';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>hourglass_empty</span> Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1>Order Management</h1>
            <p>{filteredOrders.length} of {orders.length} orders</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>error</span> {error}
        </div>
      )}

      {/* Filter Bar */}
      <div className="filter-section">
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search by order #, name, email, or phone..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />

          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '6px' }}>tune</span> Filters
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group-row">
              <div className="filter-group">
                <label>Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                >
                  <option value="date">Date</option>
                  <option value="total">Total Price</option>
                  <option value="name">Customer Name</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Order</label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                >
                  <option value="desc">Latest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>

            <button
              className="btn-reset"
              onClick={() => setFilters({
                search: '',
                status: 'all',
                sortBy: 'date',
                sortOrder: 'desc'
              })}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p>No orders yet. Orders will appear here when customers place them.</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p>No orders match your filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3 className="order-number">{order.order_number}</h3>
                  <p className="order-customer">{order.name}</p>
                </div>
                <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="label"><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>mail</span></span>
                  <span className="value">{order.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label"><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>call</span></span>
                  <span className="value">{order.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="label"><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>location_on</span></span>
                  <span className="value">{order.city}, {order.state}</span>
                </div>
                <div className="detail-row">
                  <span className="label"><span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>shopping_bag</span></span>
                  <span className="value">{(order.items?.length || 0)} item{(order.items?.length || 0) !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="order-footer">
                <div className="order-price">
                  <span className="label">Total</span>
                  <span className="price">₹{order.total_price.toLocaleString()}</span>
                </div>
                <span className="order-date">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="order-actions">
                <button
                  className="btn-view-detail"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowDetail(true);
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '6px' }}>visibility</span> Details
                </button>
                <select
                  className="status-select"
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.order_number, e.target.value)}
                  disabled={updatingStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-content modal-detail" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedOrder.order_number}</h2>
              <button
                className="modal-close"
                onClick={() => setShowDetail(false)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>close</span>
              </button>
            </div>

            <div className="modal-body-grid">
              <div className="modal-column">
                <div className="detail-section">
                  <h3>Customer Information</h3>
                  <div className="info-grid">
                    <div>
                      <span className="label">Name</span>
                      <p>{selectedOrder.name}</p>
                    </div>
                    <div>
                      <span className="label">Email</span>
                      <p>{selectedOrder.email}</p>
                    </div>
                    <div>
                      <span className="label">Phone</span>
                      <p>{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <span className="label">Address</span>
                      <p>{selectedOrder.address}</p>
                    </div>
                    <div>
                      <span className="label">City</span>
                      <p>{selectedOrder.city}</p>
                    </div>
                    <div>
                      <span className="label">State - Pincode</span>
                      <p>{selectedOrder.state} - {selectedOrder.pincode}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Status History</h3>
                  <div className="tracking-timeline">
                    {selectedOrder.tracking && selectedOrder.tracking.length > 0 ? (
                      selectedOrder.tracking.map((track) => (
                        <div key={track.id} className="timeline-item">
                          <div className="timeline-dot"></div>
                          <div className="timeline-content">
                            <span className={`status-badge ${getStatusBadgeClass(track.status)}`}>
                              {track.status.toUpperCase()}
                            </span>
                            <p>{track.message}</p>
                            <span className="timestamp">
                              {new Date(track.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--muted)' }}>No tracking history</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-column">
                <div className="detail-section">
                  <h3>Order Items ({selectedOrder.items?.length || 0})</h3>
                  <div className="items-list">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item) => (
                        <div key={item.id} className="item-row">
                          <div className="item-info">
                            <span className="qty">Qty: {item.quantity}</span>
                            <span className="price">₹{item.price.toLocaleString()}</span>
                          </div>
                          <span className="item-total">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', background: 'rgba(201, 168, 76, 0.05)', borderRadius: '4px' }}>
                        No items in this order
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Order Total</h3>
                  <div className="total-display">
                    <span className="label">Total Amount</span>
                    <span className="total-amount">₹{selectedOrder.total_price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowDetail(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/admin">
          <button className="btn-secondary"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>arrow_back</span> Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersPageContent />
    </ProtectedRoute>
  );
}
