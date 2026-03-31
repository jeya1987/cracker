'use client';

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductListing from './components/ProductListing';
import Cart from './components/Cart';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './home.css';

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <Navigation onCartClick={() => setShowCart(true)} />
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      <Hero />
      <div className="marquee-wrap">
        <div className="marquee">
          <span>Free Shipping Above ₹2000</span>
          <span>Premium Quality</span>
          <span>Festival Ready</span>
          <span>Handcrafted Excellence</span>
          <span>Safe & Certified</span>
          <span>Free Shipping Above ₹2000</span>
          <span>Premium Quality</span>
          <span>Festival Ready</span>
          <span>Handcrafted Excellence</span>
          <span>Safe & Certified</span>
        </div>
      </div>
      <div className="stats">
        <div><span className="stat-num">500+</span><div className="stat-label">Products</div></div>
        <div><span className="stat-num">50K+</span><div className="stat-label">Happy Customers</div></div>
        <div><span className="stat-num">25+</span><div className="stat-label">Years of Excellence</div></div>
        <div><span className="stat-num">100%</span><div className="stat-label">Certified Safe</div></div>
      </div>
      <ProductListing />
      <Testimonials />
      <Footer />
    </main>
  );
}
