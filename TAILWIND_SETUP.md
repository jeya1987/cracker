# Tailwind CSS Setup Guide

## Installation Complete ✅

Tailwind CSS has been configured for your Next.js project with:
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processor with Tailwind plugin
- **Autoprefixer** - Vendor prefix handling

## Configuration

### `tailwind.config.js`
- Content paths configured to scan `app/**/*.{js,ts,jsx,tsx,mdx}` and `components/**/*.{js,ts,jsx,tsx,mdx}`
- Extended color palette with your PYROCRAFT theme colors:
  - `gold`, `gold-light`, `gold-dark`
  - `dark-bg`, `dark-card`, `dark-input`
  - `border-color`, `text-light`, `text-muted`

### `globals.css`
- Added Tailwind directives: `@tailwind base`, `@tailwind components`, `@tailwind utilities`
- CSS variables for your theme remain in place for backward compatibility

## Usage Examples

### Creating a Button with Tailwind
```tsx
// Before (custom CSS)
<button className="btn-card">Click me</button>

// After (Tailwind)
<button className="px-4 py-2 bg-gold text-black rounded hover:bg-gold-light transition-all">
  Click me
</button>
```

### Creating a Card with Tailwind
```tsx
<div className="bg-dark-card border border-border-color rounded-lg p-6">
  <h2 className="text-gold font-serif text-lg">Title</h2>
  <p className="text-text-muted">Description</p>
</div>
```

### Form Input with Tailwind
```tsx
<input
  type="text"
  placeholder="Enter text"
  className="w-full bg-dark-input border border-border-color text-text-light rounded px-3 py-2 focus:outline-none focus:border-gold transition-colors"
/>
```

## Next Steps

1. **Keep existing CSS for now** - All existing components continue working with their custom CSS
2. **Use Tailwind for new components** - New features can use Tailwind classes
3. **Gradual migration** - Move components to Tailwind CSS when you need to update them

## Tips

- Use Tailwind's `@apply` directive to create custom component classes:
  ```css
  @layer components {
    .btn-primary {
      @apply px-4 py-2 bg-gold text-black rounded font-semibold hover:bg-gold-light transition-all;
    }
  }
  ```

- Combine Tailwind with your CSS variables for consistency
- Use Tailwind's built-in responsive classes: `md:`, `lg:`, `xl:`, etc.

## Resources

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Next.js + Tailwind Integration](https://tailwindcss.com/docs/guides/nextjs)
