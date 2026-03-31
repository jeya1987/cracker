'use client';


import { useCart } from '../../lib/store';
import { showToast } from './ToastProvider';
import './styles/products.css';

interface Product {
  id: number;
  name: string;
  category: string;
  emoji: string;
  image_url?: string;
  price: number;
  original_price?: number;
  description: string;
  badge?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, getCount } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      emoji: product.emoji,
      price: product.price,
      image_url: product.image_url,
    });

    // Show custom toast notification with cart count
    const cartCount = getCount();
    showToast(
      <div className="cart-notification">
        <span className="cart-notification-emoji">{product.emoji}</span>
        <div className="cart-notification-text">
          <div className="cart-notification-title">{product.name} Added!</div>
          <div className="cart-notification-count">
            {cartCount === 1 ? '1 item' : `${cartCount} items`} in cart
          </div>
        </div>
      </div>,
      'success'
    );
  };

  return (
    <div className="product-card">
      {product.badge && (
        <div className={`product-badge ${product.badge === 'new' ? 'new' : product.badge === 'sale' ? 'sale' : ''}`}>
          {product.badge}
        </div>
      )}
      
      <div className="product-img-wrap">
        {product.image_url ? (
          <img
            src={product.image_url.startsWith('http') ? product.image_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${product.image_url}`}
            alt={product.name}
            className="product-image"
            onError={(e: any) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="product-emoji">{product.emoji}</div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.description}</div>
        <div className="product-footer">
          <div className="product-price">
            {product.original_price && <del>₹{product.original_price}</del>}
            ₹{product.price.toLocaleString()}
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
