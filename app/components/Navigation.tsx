'use client';

import { useCart } from '../../lib/store';
import './styles/navigation.css';

export default function Navigation({ onCartClick }: { onCartClick: () => void }) {
  const { getCount } = useCart();
  const cartCount = getCount();

  return (
    <nav className="navbar">
      <a href="/" className="nav-logo">
        PYROCRAFT
        <span>Premium Crackers</span>
      </a>
      <ul className="nav-links">
        <li><a href="#products">Collection</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-right">
        <button className="cart-btn" onClick={onCartClick}>
          <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '4px' }}>shopping_cart</span> Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
