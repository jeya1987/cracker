# PyroCraft Production Setup Guide

## Environment Modes

### Staging Mode
- **Purpose**: Development and testing
- **API Endpoint**: `http://localhost:8000`
- **Build Command**: `npm run build:staging`
- **Start Command**: `npm run start:staging`
- **Environment Variables**: `.env.staging`
- **Banner**: Red staging banner displayed

### Production Mode
- **Purpose**: Live deployment
- **API Endpoint**: `https://api.pyrocraft.com` (update as needed)
- **Build Command**: `npm run build:production`
- **Start Command**: `npm run start:production`
- **Environment Variables**: `.env.production`
- **Banner**: Green production banner displayed

## Building for Production

```bash
# Install dependencies
npm install

# Build for production
npm run build:production

# Start production server
npm run start:production
```

## Building for Staging

```bash
# Build for staging/testing
npm run build:staging

# Start staging server
npm run start:staging
```

## Environment Variables

### `.env.staging`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STAGING=true
NEXT_PUBLIC_ENVIRONMENT=staging
```

### `.env.production`
```
NEXT_PUBLIC_API_URL=https://api.pyrocraft.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## Key Features

### Product Cards
- **Fixed Alignment**: All "Add to Cart" buttons are now perfectly aligned at the bottom
- **Responsive Layout**: Cards adapt to different screen sizes:
  - Mobile (< 480px): 2 columns
  - Tablet (481px - 768px): 3 columns  
  - Small Desktop (769px - 1024px): 4 columns
  - Desktop (> 1025px): 6 columns

### Checkout Page
- **Review Order**: Review all items before checkout
- **Delivery Details**: Complete form with all necessary fields:
  - Full Name, Email, Phone
  - Address, City, State, Pincode
  - Special Instructions
- **Order Confirmation**: Confirmation screen with tracking link
- **Environment Indicator**: Clear banner showing current environment

### Environment Detection
The checkout page automatically detects the environment and displays:
- **Staging**: Red banner "🧪 STAGING VERSION — Not Production"
- **Production**: Green banner "PRODUCTION MODE ✅"

## Deployment Checklist

- [ ] Update `NEXT_PUBLIC_API_URL` in `.env.production` with actual API endpoint
- [ ] Ensure backend API is deployed and accessible
- [ ] Run `npm run build:production`
- [ ] Test production build locally: `npm run start:production`
- [ ] Verify all API endpoints are correctly configured
- [ ] Check environment banners display correctly
- [ ] Test checkout flow end-to-end
- [ ] Verify product cards are properly aligned
- [ ] Set up SSL/HTTPS certificate
- [ ] Configure CDN if needed

## Docker Deployment (Optional)

Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

RUN npm run build:production

EXPOSE 3000

CMD ["npm", "run", "start:production"]
```

Build and run:
```bash
docker build -t pyrocraft-frontend:production .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.pyrocraft.com pyrocraft-frontend:production
```

## Monitoring & Troubleshooting

### Check Current Environment
Visit the checkout page to see which environment is active via the banner color:
- Red = Staging
- Green = Production

### Common Issues
1. **Wrong API endpoint**: Check `.env.production` has correct `NEXT_PUBLIC_API_URL`
2. **Build fails**: Ensure all dependencies are installed
3. **Styling issues**: Clear `.next` folder and rebuild

## Rollback Procedure

If issues occur in production:
```bash
# Revert to previous build
docker pull pyrocraft-frontend:production-previous
docker run -p 3000:3000 pyrocraft-frontend:production-previous
```

---
**Last Updated**: March 2026
