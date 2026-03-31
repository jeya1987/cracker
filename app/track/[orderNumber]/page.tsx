'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { trackOrder } from '@/lib/api';
import { ORDER_STATUS_ICONS, ORDER_STATUS_LABELS } from '@/lib/constants';
import Link from 'next/link';
import './tracking.css';

export default function TrackingPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await trackOrder(orderNumber);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
      setLoading(false);
    };

    if (orderNumber) {
      fetchOrder();
      const interval = setInterval(fetchOrder, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="tracking-container">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="tracking-container">
        <div className="error-message">
          <p>Order not found</p>
          <Link href="/">
            <button className="btn-primary">Back Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <div className="tracking-content">
        <h1>Order Tracking</h1>

        <div className="order-header">
          <div className="header-item">
            <span className="label">Order Number</span>
            <span className="value">{order.order_number}</span>
          </div>
          <div className="header-item">
            <span className="label">Customer Name</span>
            <span className="value">{order.customer_name}</span>
          </div>
          <div className="header-item">
            <span className="label">Total Amount</span>
            <span className="value gold">₹{order.total_price.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="tracking-timeline">
          <h2>Order Status</h2>
          <div className="timeline">
            {order.tracking_history && order.tracking_history.map((track: any, idx: number) => (
              <div key={idx} className={`timeline-item ${track.status}`}>
                <div className="timeline-icon">
                  {ORDER_STATUS_ICONS[track.status as keyof typeof ORDER_STATUS_ICONS] || '📌'}
                </div>
                <div className="timeline-content">
                  <h3>{ORDER_STATUS_LABELS[track.status as keyof typeof ORDER_STATUS_LABELS] || track.status}</h3>
                  <p>{track.message}</p>
                  <span className="timeline-date">
                    {new Date(track.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="order-items">
          <h2>Order Items</h2>
          <div className="items-list">
            {order.items && order.items.map((item: any) => (
              <div key={item.product_id} className="item">
                <span className="emoji">{item.product.emoji}</span>
                <div className="item-info">
                  <h4>{item.product.name}</h4>
                  <p className="category">{item.product.category}</p>
                </div>
                <div className="item-qty">×{item.quantity}</div>
                <span className="price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="delivery-info">
          <h2>Delivery Address</h2>
          <div className="address-box">
            <p><strong>{order.customer_name}</strong></p>
            <p>{order.address}</p>
            <p>{order.city}, {order.state} - {order.pincode}</p>
          </div>
        </div>

        {/* Need Help */}
        <div className="help-section">
          <h2>Need Help?</h2>
          <p>You'll receive WhatsApp updates on your registered phone number</p>
          <div className="help-buttons">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <button className="whatsapp-btn">💬 Chat on WhatsApp</button>
            </a>
            <a href="mailto:support@pyrocraft.in">
              <button className="email-btn">✉️ Email Support</button>
            </a>
          </div>
        </div>

        <div className="tracking-footer">
          <Link href="/">
            <button className="btn-secondary">Back to Shop</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
