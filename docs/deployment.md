# Deployment Guide

This guide covers deployment options and configurations for the Kevin Rufino Portfolio 2024.

## Build Process

### Production Build

```bash
# Create optimized production build
npm run build

# The build will be in the /build folder
```

### Build Configuration

The production build includes:
- Code minification and optimization
- Bundle splitting for better performance
- Asset optimization
- Source maps (for debugging)
- Service Worker (for PWA capabilities)

## Deployment Platforms

### Netlify

#### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

#### Manual Deployment
```bash
# Build and deploy to Netlify
npm run build
netlify deploy --prod --dir=build
```

#### Environment Variables (Netlify)
- `REACT_APP_ENVIRONMENT=production`
- `REACT_APP_API_URL` (if applicable)

### Vercel

#### Automatic Deployment
1. Import your GitHub repository to Vercel
2. Vercel automatically detects Create React App
3. Deploy automatically on push

#### Manual Deployment
```bash
# Build and deploy to Vercel
npm run build
vercel --prod
```

#### Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### GitHub Pages

#### Setup
```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Add to package.json scripts
"homepage": "https://kevinrufino.github.io/2024-Portfolio",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

#### Deployment
```bash
# Deploy to GitHub Pages
npm run deploy
```

#### Configuration Notes
- Update `package.json` homepage field with your repository URL
- Ensure GitHub Pages is enabled in repository settings
- Use `gh-pages` branch for deployment

### AWS Amplify

#### Setup
1. Connect your GitHub repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Base directory: `/`
   - Build output: `/build`

#### Environment Variables
- `REACT_APP_ENVIRONMENT=production`
- `REACT_APP_API_URL` (if applicable)

### Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Build and Run
```bash
# Build Docker image
docker build -t portfolio-2024 .

# Run container
docker run -p 80:80 portfolio-2024
```

## Environment Configuration

### Environment Variables

Create `.env.production` for production-specific variables:

```bash
# .env.production
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://api.example.com
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
REACT_APP_SENTRY_DSN=SENTRY_DSN_URL
```

### Build Optimization

#### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

#### Performance Optimization
- Use `React.lazy()` for code splitting
- Optimize images and assets
- Implement caching strategies
- Use CDN for static assets

## CI/CD Pipeline

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Build
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=build
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Monitoring and Analytics

### Google Analytics

Add to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring

#### Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### Sentry Error Tracking
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENVIRONMENT,
});
```

## Security Considerations

### HTTPS
- Always use HTTPS in production
- Configure proper SSL certificates
- Redirect HTTP to HTTPS

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self';">
```

### Environment Variables
- Never commit sensitive data to repository
- Use platform-specific environment variable management
- Rotate API keys regularly

## Troubleshooting

### Common Issues

#### Build Fails
- Check for syntax errors
- Verify all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

#### Assets Not Loading
- Check file paths in `public` folder
- Verify import statements
- Ensure proper case sensitivity

#### Routing Issues
- Configure server-side routing for SPA
- Use proper redirect rules
- Test all routes in production

### Performance Issues

#### Bundle Size Too Large
- Analyze bundle with webpack-bundle-analyzer
- Implement code splitting
- Optimize images and assets
- Remove unused dependencies

#### Slow Loading
- Implement lazy loading
- Use CDN for static assets
- Enable compression
- Optimize images

---

For additional support or questions, refer to the platform-specific documentation or create an issue in the repository.
