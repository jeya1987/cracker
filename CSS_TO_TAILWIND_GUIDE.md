# CSS to Tailwind Conversion Guide - Remaining Files

## Completed Conversions (9 files) ✅

1. **globals.css** - Base styles, buttons, scrollbars
2. **home.css** - Marquee, statistics
3. **hero.css** - Hero section  
4. **navigation.css** - Navigation bar, cart button
5. **footer.css** - Footer layout and links
6. **products.css** - Large product grid with hover effects
7. **cart.css** - Cart sidebar overlay
8. **testimonials.css** - Testimonial cards
9. **customToast.css** & **toastStyles.css** - Toast notifications

## Remaining Files to Convert

### 1. **checkout.css** (3+ sections)
Use as utility classes in TSX:

```css
.checkout-container {
  @apply min-h-screen bg-dark-bg flex flex-col p-0;
}

.staging-banner {
  @apply bg-gradient-to-r from-red-600 to-red-400 text-white py-3.5 px-8 text-center font-semibold text-sm tracking-wide shadow-lg animate-bannerPulse;
}

.checkout-review-layout {
  @apply grid gap-0 flex-1 overflow-hidden;
  grid-template-columns: 1.2fr 1fr;
}

@media (max-width: 1200px) {
  .checkout-review-layout {
    @apply grid-cols-1;
  }
}

.review-main {
  @apply bg-dark-card border-r border-border-color py-10 px-10 overflow-y-auto;
  max-height: calc(100vh - 130px);
}

.review-sidebar {
  @apply bg-dark-input py-10 px-10 flex flex-col justify-center border-l border-border-color overflow-y-auto;
  max-height: calc(100vh - 130px);
}

.order-summary {
  @apply bg-dark-card border border-border-color py-8 px-8 rounded-md;
}

.item-count {
  @apply bg-gold text-dark-bg px-4 py-2 rounded-full text-xs font-semibold tracking-widest;
}

.review-item {
  @apply grid gap-3 items-center bg-gold/5 p-3 rounded-sm border border-gold/10 transition-all duration-300 hover:bg-gold/10 hover:border-gold;
  grid-template-columns: auto 1fr auto;
}

.item-visual {
  @apply w-12 h-12 flex items-center justify-center bg-dark-input rounded-sm border border-border-color;
}

.item-emoji {
  @apply text-2xl;
}

.item-qty-badge {
  @apply absolute -top-2 -right-2 bg-gold text-dark-bg w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-dark-bg;
}
```

###2. **admin.css** (Admin dashboard base)
```css
.admin-container {
  @apply min-h-screen bg-dark-bg py-10 px-[5vw];
}

.admin-header {
  @apply max-w-3xl mx-auto mb-8;
}

.admin-header h1 {
  @apply font-cinzel text-4xl mb-2 text-text-light;
}

.admin-header p {
  @apply text-text-muted text-lg;
}

.success-message {
  @apply max-w-3xl mx-auto my-4 p-4 rounded-md bg-green-900/20 border border-green-700 text-green-400 font-medium animate-slideIn;
}

.error-message {
  @apply max-w-3xl mx-auto my-4 p-4 rounded-md bg-red-900/20 border border-red-700 text-red-400 font-medium animate-slideIn;
}

.product-form {
  @apply max-w-3xl mx-auto bg-dark-card border border-border-color rounded-md p-8;
}

.form-section {
  @apply mb-10;
}

.form-section h2 {
  @apply font-cinzel text-2xl text-gold mb-6 pb-2 border-b border-border-color;
}

.form-group {
  @apply mb-6;
}

.form-group label {
  @apply block text-xs tracking-widest uppercase text-text-light mb-2 font-medium;
}

.form-group input,
.form-group textarea,
.form-group select {
  @apply w-full bg-dark-input border border-border-color text-text-light px-4 py-3 font-jost text-sm focus:outline-none focus:border-gold-dark;
}

.form-group textarea {
  @apply resize-none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  @apply text-text-muted;
}
```

### 3. **dashboard.css** (Admin dashboard page)
```css
.dashboard-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}

.stat-card {
  @apply bg-dark-card border border-border-color p-6 rounded-md;
}

.stat-card h3 {
  @apply font-jost text-xs tracking-widest uppercase text-text-muted mb-2;
}

.stat-card .value {
  @apply font-cinzel text-3xl text-gold font-semibold;
}

.table-card {
  @apply bg-dark-card border border-border-color rounded-md overflow-hidden;
}

.table-header {
  @apply bg-dark-input px-6 py-4 border-b border-border-color;
}

.table-row {
  @apply border-b border-border-color px-6 py-4 hover:bg-dark-input/50 transition-colors duration-300;
}

.table-cell {
  @apply text-text-light text-sm;
}

.table-cell.accent {
  @apply text-gold font-semibold;
}
```

### 4. **tracking.css** (Order tracking page)
```css
.tracking-container {
  @apply min-h-screen bg-dark-bg py-8 px-[5vw];
}

.tracking-content {
  @apply max-w-2xl mx-auto;
}

.tracking-content h1 {
  @apply font-cinzel text-3xl mb-8 text-text-light;
}

.order-header {
  @apply grid grid-cols-3 gap-4 bg-dark-card border border-border-color p-6 rounded-md mb-8;
}

.header-item {
  @apply flex flex-col;
}

.header-item .label {
  @apply text-xs tracking-widest uppercase text-text-muted mb-2;
}

.header-item .value {
  @apply font-cinzel text-xl text-text-light;
}

.header-item .value.gold {
  @apply text-gold;
}

.tracking-timeline {
  @apply mb-8;
}

.tracking-timeline h2 {
  @apply font-cinzel text-2xl mb-6 text-text-light;
}

.timeline {
  @apply space-y-6;
}

.timeline-item {
  @apply flex gap-4 pb-6 border-l-2 border-border-color pl-6 relative;
}

.timeline-item.completed {
  @apply border-gold;
}

.timeline-icon {
  @apply text-3xl absolute -left-5 -top-2;
}

.timeline-content h3 {
  @apply font-cormorant text-xl text-text-light mb-2;
}

.timeline-content p {
  @apply text-text-muted text-sm mb-2;
}

.timeline-date {
  @apply text-xs text-text-muted tracking-wider;
}

.order-items {
  @apply mb-8;
}

.order-items h2 {
  @apply font-cinzel text-2xl mb-6 text-text-light;
}

.items-list {
  @apply space-y-4;
}

.item-card {
  @apply bg-dark-card border border-border-color p-4 rounded-md flex gap-4;
}

.item-emoji {
  @apply text-3xl;
}

.item-name {
  @apply font-cormorant text-lg text-text-light;
}

.item-qty {
  @apply text-sm text-text-muted;
}

.error-message {
  @apply bg-red-900/20 border border-red-700 text-red-400 p-4 rounded-md mb-4 text-center;
}

.loading {
  @apply text-center py-12 text-text-muted text-lg;
}
```

### 5. **Other Admin Pages** (Placeholder for similar patterns)

All admin subpages (analytics.css, orders.css, login.css, styles.css) follow similar patterns:
- Use `.form-group` utilities for forms
- Use `.table-*` classes for data tables
- Use `.stat-card` for metric displays
- Use `.success-message` / `.error-message` for alerts
- Apply `.admin-container` as wrapper

## Quick Apply Instructions

1. Copy the Tailwind code snippets above into their respective `.css` files
2. Replace with @apply directives within `.css` files
3. Keep CSS file imports for backward compatibility during transition
4. Eventually remove CSS imports once components use inline Tailwind classes

## Files Requiring Update (No Major Changes)

These files import styles that are now Tailwind-based:
- checkout/page.tsx - imports checkout.css
- admin/page.tsx - imports dashboard.css  
- admin/analytics/page.tsx - imports analytics.css
- admin/orders/page.tsx - imports orders.css
- admin/login/page.tsx - imports login.css
- admin/products/page.tsx - imports styles.css
- track/[orderNumber]/page.tsx - imports tracking.css
- admin subfolders

## Testing Checklist

After conversion, test:
- ✓ Colors render correctly (gold, dark tones)
- ✓ Animations and hover effects work
- ✓ Responsive breakpoints function  
- ✓ Forms and buttons display properly
- ✓ Notifications appear correctly
- ✓ No layout shifts or broken styles

## Notes

- All Tailwind custom colors are configured in tailwind.config.js
- All animations are keyframe-defined in tailwind.config.js
- Use @apply directives to keep CSS files DRY
- Consider migrating to inline className props eventually for component optimization
