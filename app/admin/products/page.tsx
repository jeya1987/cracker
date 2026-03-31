'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../ProtectedRoute';
import '../admin.css';
import './styles.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  description: string;
  emoji: string;
  badge?: string;
  image_url?: string;
  stock: number;
}

interface FilterOptions {
  search: string;
  category: string;
  priceRange: [number, number];
  stockStatus: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
  sortBy: 'name' | 'price' | 'stock' | 'date';
  sortOrder: 'asc' | 'desc';
}

interface ColumnVisibility {
  id: boolean;
  product: boolean;
  category: boolean;
  price: boolean;
  stock: boolean;
  badge: boolean;
  actions: boolean;
}

function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    priceRange: [0, 10000],
    stockStatus: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Column visibility
  const [columns, setColumns] = useState<ColumnVisibility>({
    id: true,
    product: true,
    category: true,
    price: true,
    stock: true,
    badge: true,
    actions: true
  });

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=1000`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching products');
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Stock status filter
    if (filters.stockStatus !== 'all') {
      result = result.filter(p => {
        if (filters.stockStatus === 'in-stock') return p.stock > 10;
        if (filters.stockStatus === 'low-stock') return p.stock > 0 && p.stock <= 10;
        if (filters.stockStatus === 'out-of-stock') return p.stock === 0;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      let aVal: any = a[filters.sortBy as keyof Product];
      let bVal: any = b[filters.sortBy as keyof Product];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      const comparison = aVal > bVal ? 1 : -1;
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(result);
  }, [products, filters]);

  // Delete product
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${selectedProduct.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting product');
    }
  };

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading"><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>hourglass_empty</span> Loading products...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1>Product Inventory</h1>
            <p>{filteredProducts.length} of {products.length} products</p>
          </div>
          <Link href="/admin/add-product">
            <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
              + Add Product
            </button>
          </Link>
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
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />

          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '6px' }}>tune</span> Filters ({Object.values(filters).some(v => 
              (typeof v === 'string' && v !== 'all' && v !== '') || 
              (Array.isArray(v) && v.some((x: any) => x !== 0 && x !== 10000))
            ) ? '1' : '0'})
          </button>

          <button 
            className={`filter-toggle ${showColumns ? 'active' : ''}`}
            onClick={() => setShowColumns(!showColumns)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '6px' }}>view_column</span> Columns
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</label>
              <div className="range-inputs">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    priceRange: [Number(e.target.value), filters.priceRange[1]]
                  })}
                />
                <span>—</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    priceRange: [filters.priceRange[0], Number(e.target.value)]
                  })}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Stock Status</label>
              <select 
                value={filters.stockStatus}
                onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value as any })}
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock (10+)</option>
                <option value="low-stock">Low Stock (1-10)</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="filter-group-row">
              <div className="filter-group">
                <label>Sort By</label>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                >
                  <option value="name">Product Name</option>
                  <option value="price">Price</option>
                  <option value="stock">Stock Level</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Order</label>
                <select 
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <button 
              className="btn-reset"
              onClick={() => setFilters({
                search: '',
                category: 'all',
                priceRange: [0, 10000],
                stockStatus: 'all',
                sortBy: 'name',
                sortOrder: 'asc'
              })}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Column Visibility */}
        {showColumns && (
          <div className="columns-panel">
            <div className="columns-grid">
              {Object.entries(columns).map(([key, value]) => (
                <label key={key} className="column-checkbox">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setColumns({ ...columns, [key]: e.target.checked })}
                  />
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p>No products found. <Link href="/admin/add-product"><u>Add your first product</u></Link></p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p>No products match your filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                {columns.id && <th>ID</th>}
                {columns.product && <th>Product</th>}
                {columns.category && <th>Category</th>}
                {columns.price && <th>Price</th>}
                {columns.stock && <th>Stock</th>}
                {columns.badge && <th>Badge</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  {columns.id && <td>#{product.id}</td>}
                  
                  {columns.product && (
                    <td>
                      <div className="product-cell">
                        <span className="emoji">{product.emoji}</span>
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-desc">{product.description.substring(0, 40)}...</div>
                        </div>
                      </div>
                    </td>
                  )}

                  {columns.category && (
                    <td>
                      <span className="badge-cat">{product.category}</span>
                    </td>
                  )}

                  {columns.price && (
                    <td>
                      <div className="price-cell">
                        <div className="current-price">₹{product.price.toLocaleString()}</div>
                        {product.original_price && (
                          <div className="original">₹{product.original_price.toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                  )}

                  {columns.stock && (
                    <td>
                      <span className={`stock ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                        {product.stock > 10 ? <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>check_circle</span> In Stock</> : product.stock > 0 ? <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>warning</span> Low Stock</> : <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>cancel</span> Out</>} ({product.stock})
                      </span>
                    </td>
                  )}

                  {columns.badge && (
                    <td>
                      {product.badge ? (
                        <span className={`badge-type ${product.badge}`}>
                          {product.badge === 'sale' ? <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>local_fire_department</span> Sale</> : product.badge === 'new' ? <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>star</span> New</> : <><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>stars</span> {product.badge}</>}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                  )}

                  {columns.actions && (
                    <td>
                      <div className="action-buttons">
                        <Link href={`/admin/edit-product/${product.id}`}>
                          <button className="btn-edit" title="Edit product"><span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>edit</span> Edit</button>
                        </Link>
                        <button 
                          className="btn-delete" 
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                          title="Delete product"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1.1em', verticalAlign: 'middle', marginRight: '4px' }}>delete</span> Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span className="material-symbols-outlined" style={{ color: 'var(--danger)', fontSize: '1.2em' }}>warning</span> Delete Product?</h2>
            <p>Are you sure you want to delete <strong>{selectedProduct.name}</strong>?</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDeleteProduct}>
                Yes, Delete
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

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsPageContent />
    </ProtectedRoute>
  );
}
