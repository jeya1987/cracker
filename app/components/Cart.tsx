'use client';

import Link from 'next/link';
import { useCart } from '../../lib/store';
import './styles/cart.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQty, getTotal, getCount } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <span className="cart-title">Your Selection ({getCount()})</span>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items scrollable">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🧨</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="qty-display">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-amount">₹{getTotal().toLocaleString()}</span>
            </div>
            <Link href="/checkout">
              <button className="checkout-btn">Proceed to Checkout →</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
