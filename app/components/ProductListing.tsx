'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '../../lib/api';
import ProductCard from './ProductCard';
import './styles/products.css';

export default function ProductListing() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(category, search, sort);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    const timer = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(timer);
  }, [category, search, sort]);

  return (
    <section id="products" className="products-section">
      <div className="section-header">
        <span className="section-tag">Our Collection</span>
        <h2 className="section-title">Curated <em>Masterpieces</em></h2>
        <div className="divider"></div>
      </div>

      <div className="search-filter">
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            placeholder="Search crackers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="filter-row">
          <span className="filter-label">Filter:</span>
          {['all', 'aerial', 'ground', 'sparkler', 'gift'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : products.length === 0 ? (
        <div className="no-results">No crackers found</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
