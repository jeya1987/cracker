'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { createOrder } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './checkout.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotal, clearCart, removeFromCart } = useCart();
  const [step, setStep] = useState<'review' | 'details' | 'success'>('review');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  


  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    special_instructions: ''
  });

  if (cart.length === 0 && step === 'review') {
    return (
      <div className="checkout-container">

        <div className="empty-cart">
          <h1 style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>stars</span> Cart is Empty
          </h1>
          <p>You removed all items. Add items to proceed with checkout</p>
          <Link href="/">
            <button className="btn-primary">Back to Shop</button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price
        })),
        customer: details
      };

      const response = await createOrder(orderData);
      const order = response.data;
      
      setOrderNumber(order.order_number);
      clearCart();
      setStep('success');
    } catch (error) {
      alert('Error creating order. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  if (step === 'success') {
    return (
      <div className="checkout-container">

        <div className="success-container">
          <div className="success-message">
            <div className="success-icon"><span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>check_circle</span></div>
            <h1>Order Confirmed!</h1>
            <p className="order-number">Order #{orderNumber}</p>
            
            <div className="success-details">
              <div className="detail-row">
                <span>Recipient:</span>
                <span>{details.name}</span>
              </div>
              <div className="detail-row">
                <span>Phone:</span>
                <span>{details.phone}</span>
              </div>
              <div className="detail-row">
                <span>Delivery City:</span>
                <span>{details.city}, {details.state}</span>
              </div>
              <div className="detail-row">
                <span>Order Amount:</span>
                <span className="amount">₹{getTotal().toLocaleString()}</span>
              </div>
            </div>

            <p className="notify-text"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '6px' }}>mail</span> Confirmation sent to {details.email}</p>
            <p className="whatsapp-text"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '6px' }}>chat</span> WhatsApp notification sent to {details.phone}</p>
            
            <div className="success-actions">
              <Link href={`/track/${orderNumber}`}>
                <button className="btn-primary">Track Order</button>
              </Link>
              <Link href="/">
                <button className="btn-secondary">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">

      
      {step === 'review' && (
        <div className="checkout-review-layout">
          <div className="review-main">
            <div className="review-header">
              <h1>Order Review</h1>
              <span className="item-count">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
            </div>
            <div className="cart-review">
              {cart.map(item => (
                <div key={item.id} className="review-item">
                  <div className="item-visual">
                    <span className="item-emoji">{item.emoji}</span>
                    <div className="item-qty-badge">{item.qty}</div>
                  </div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="item-end">
                    <span className="item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                    <button
                      type="button"
                      className="item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '1em' }}>close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="review-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-badge">FREE</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>
              </div>
              <button 
                className="btn-primary btn-full"
                onClick={() => setStep('details')}
              >
                Proceed to Delivery
              </button>
              <Link href="/">
                <button className="btn-text">← Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="checkout-details-layout">
          <form className="details-form" onSubmit={handleSubmitDetails}>
            <div className="form-header">
              <h1>Delivery Information</h1>
              <button
                type="button"
                className="back-link"
                onClick={() => setStep('review')}
              >
                ← Back to Review
              </button>
            </div>

            <div className="form-sections">
              <div className="form-section">
                <h3>Contact Details</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={details.name}
                      onChange={(e) => setDetails({...details, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={details.email}
                      onChange={(e) => setDetails({...details, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={details.phone}
                    onChange={(e) => setDetails({...details, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Delivery Address</h3>
                <div className="form-group">
                  <label>Full Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House No., Street, Area..."
                    value={details.address}
                    onChange={(e) => setDetails({...details, address: e.target.value})}
                  />
                </div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai"
                      value={details.city}
                      onChange={(e) => setDetails({...details, city: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      required
                      placeholder="Maharashtra"
                      value={details.state}
                      onChange={(e) => setDetails({...details, state: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      placeholder="400001"
                      value={details.pincode}
                      onChange={(e) => setDetails({...details, pincode: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Special Instructions</h3>
                <div className="form-group">
                  <textarea
                    rows={2}
                    placeholder="Any special delivery instructions... (Optional)"
                    value={details.special_instructions}
                    onChange={(e) => setDetails({...details, special_instructions: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep('review')}
              >
                Back to Review
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? '⏳ Processing...' : '✓ Place Order'}
              </button>
            </div>
          </form>

          <div className="details-sidebar">
            <div className="order-preview">
              <h3>Order Summary</h3>
              <div className="preview-items">
                {cart.map(item => (
                  <div key={item.id} className="preview-item">
                    <div className="preview-emoji">{item.emoji}</div>
                    <div className="preview-details">
                      <p className="preview-name">{item.name}</p>
                      <p className="preview-qty">Qty: {item.qty}</p>
                    </div>
                    <span className="preview-price">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="preview-footer">
                <div className="preview-total">
                  <span>Total</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="success-container">
          <div className="success-message">
            <div className="success-icon"><span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>check_circle</span></div>
            <h1>Order Confirmed!</h1>
            <p className="order-number">Order #{orderNumber}</p>
            
            <div className="success-details">
              <div className="detail-row">
                <span>Recipient:</span>
                <span>{details.name}</span>
              </div>
              <div className="detail-row">
                <span>Phone:</span>
                <span>{details.phone}</span>
              </div>
              <div className="detail-row">
                <span>Delivery City:</span>
                <span>{details.city}, {details.state}</span>
              </div>
              <div className="detail-row">
                <span>Order Amount:</span>
                <span className="amount">₹{getTotal().toLocaleString()}</span>
              </div>
            </div>

            <p className="notify-text"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '6px' }}>mail</span> Confirmation sent to {details.email}</p>
            <p className="whatsapp-text"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '6px' }}>chat</span> WhatsApp notification sent to {details.phone}</p>
            
            <div className="success-actions">
              <Link href={`/track/${orderNumber}`}>
                <button className="btn-primary">Track Order</button>
              </Link>
              <Link href="/">
                <button className="btn-secondary">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
