# Implementation Reference - Key Code Changes

## Layout Structure

### Review Order Layout (New)
```jsx
<div className="checkout-review-layout">
  <div className="review-main">
    <div className="review-header">
      <h1>Order Review</h1>
      <span className="item-count">{cart.length} Items</span>
    </div>
    <div className="cart-review">
      {/* Cart items */}
    </div>
  </div>
  
  <div className="review-sidebar">
    <div className="order-summary">
      {/* Summary */}
    </div>
  </div>
</div>
```

### Delivery Details Layout (New)
```jsx
<div className="checkout-details-layout">
  <form className="details-form">
    <div className="form-header">
      <h1>Delivery Information</h1>
      <button className="back-link">← Back</button>
    </div>
    {/* Form fields */}
  </form>
  
  <div className="details-sidebar">
    <div className="order-preview">
      {/* Order summary */}
    </div>
  </div>
</div>
```

---

## CSS Grid System

### Review Page Grid
```css
.checkout-review-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;  /* 54% / 46% split */
  gap: 0;
  flex: 1;
  overflow: hidden;
}

/* Responsive: tablet and below */
@media (max-width: 1200px) {
  .checkout-review-layout {
    grid-template-columns: 1fr;  /* Single column */
  }
}
```

### Details Page Grid
```css
.checkout-details-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;  /* 60% / 40% split */
  gap: 0;
  flex: 1;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .checkout-details-layout {
    grid-template-columns: 1fr;
  }
}
```

---

## Component Styling

### Item Container
```css
.review-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.2rem;
  align-items: center;
  background: rgba(201, 168, 76, 0.04);
  padding: 1.2rem;
  border-radius: 4px;
  border: 1px solid rgba(201, 168, 76, 0.1);
  transition: all 0.3s;
}

.review-item:hover {
  background: rgba(201, 168, 76, 0.08);
  border-color: var(--gold);
}
```

### Item Quantity Badge
```css
.item-qty-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--gold);
  color: var(--black);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid var(--black);
}
```

### Form Section
```css
.form-section {
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.5rem;
}

.form-section h3 {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  margin: 0 0 1.2rem 0;
  color: var(--gold);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### Form Grid
```css
/* 2-column grid */
.form-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* 3-column grid */
.form-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* Mobile: single column */
@media (max-width: 768px) {
  .form-grid-2,
  .form-grid-3 {
    grid-template-columns: 1fr;
  }
}
```

---

## Form Input Styling

### Focus State
```css
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 10px rgba(201, 168, 76, 0.15);
  background: rgba(201, 168, 76, 0.02);
}
```

### Placeholder Text
```css
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--muted);
}
```

---

## Button Styles

### Primary Button
```css
.btn-primary {
  background: var(--gold);
  color: var(--black);
  border: none;
  padding: 0.9rem 1.5rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.9rem 1.5rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: rgba(201, 168, 76, 0.05);
}
```

### Text Link
```css
.btn-text {
  background: transparent;
  border: none;
  color: var(--gold);
  padding: 0.6rem 0;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  text-align: center;
}

.btn-text:hover {
  color: var(--gold-light);
  text-decoration: underline;
}
```

---

## Order Summary Box

### Desktop Layout
```css
.order-summary {
  background: var(--dark);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 6px;
}

.order-summary h3 {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  color: var(--text);
  text-align: center;
  letter-spacing: 0.05em;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border);
}
```

### Summary Rows
```css
.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: var(--text);
}

.summary-row.total {
  font-size: 1.1rem;
  color: var(--gold);
  font-weight: 700;
  margin-top: 0.5rem;
}
```

---

## Success Page

### Container
```css
.success-container {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.success-message {
  background: var(--dark);
  border: 2px solid var(--gold);
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(201, 168, 76, 0.2);
}
```

### Animation
```css
.success-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: successBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes successBounce {
  0% { 
    transform: scale(0) rotate(-45deg); 
    opacity: 0; 
  }
  100% { 
    transform: scale(1) rotate(0); 
    opacity: 1; 
  }
}
```

---

## Responsive Container

### Main Container
```css
.checkout-container {
  min-height: 100vh;
  background: var(--black);
  display: flex;
  flex-direction: column;
  padding: 0;
}
```

### Content Panels
```css
.review-main,
.details-form {
  background: var(--dark);
  border-right: 1px solid var(--border);
  padding: 2.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 130px);
}

/* Responsive: remove right border, add bottom border */
@media (max-width: 1200px) {
  .review-main,
  .details-form {
    border-right: none;
    border-bottom: 1px solid var(--border);
    max-height: none;
  }
}
```

---

## Banner Styling

### Staging Banner
```css
.staging-banner {
  background: linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%);
  color: #fff;
  padding: 0.85rem 2rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  box-shadow: 0 2px 12px rgba(255, 107, 107, 0.3);
  animation: bannerPulse 3s infinite;
  flex-shrink: 0;
}

@keyframes bannerPulse {
  0%, 100% { 
    box-shadow: 0 2px 12px rgba(255, 107, 107, 0.3); 
  }
  50% { 
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.5); 
  }
}
```

### Production Mode
```css
.staging-banner.production-mode {
  background: linear-gradient(90deg, #2d5a2d 0%, #3a7a3a 100%);
  box-shadow: 0 2px 12px rgba(45, 170, 45, 0.3);
  animation: productionPulse 3s infinite;
}

@keyframes productionPulse {
  0%, 100% { 
    box-shadow: 0 2px 12px rgba(45, 170, 45, 0.3); 
  }
  50% { 
    box-shadow: 0 4px 16px rgba(45, 170, 45, 0.5); 
  }
}
```

---

## Empty Cart

### Container
```css
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 130px);
  text-align: center;
  padding: 2rem;
}

.empty-cart h1 {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: var(--gold);
}

.empty-cart p {
  color: var(--muted);
  font-size: 1rem;
  margin: 0 0 2rem 0;
  max-width: 400px;
}
```

---

## Usage Example

### Import in Component
```jsx
import './checkout.css';  // Already imported in page.tsx
```

### Apply Classes
```jsx
// Review Layout
<div className="checkout-review-layout">
  <div className="review-main">
    {/* Content */}
  </div>
  <div className="review-sidebar">
    {/* Summary */}
  </div>
</div>

// Details Layout
<div className="checkout-details-layout">
  <form className="details-form">
    {/* Form */}
  </form>
  <div className="details-sidebar">
    {/* Preview */}
  </div>
</div>
```

---

## CSS Variables Used

```css
--black: #000000
--gold: #c9a84c
--gold-light: #d4b884
--gold-dark: #8a7a3a
--dark: #0d0d0d
--card: #1a1a1a
--text: #ffffff
--muted: #999999
--border: #333333
--red: #cc2a2a
```

---

## Performance Notes

- Uses CSS Grid and Flexbox (no floats)
- Hardware-accelerated animations
- No JavaScript for layout (uses CSS)
- Minimal repaints and reflows
- Responsive mobile-first approach
- Optimized media queries

---

**File**: `frontend/app/checkout/checkout.css`  
**Lines**: ~900  
**Components**: 30+  
**Animations**: 5+  
**Media Queries**: 15+
