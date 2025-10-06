# Developer Guide - TravelHub Frontend

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Installation
```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

## 🔌 Backend Integration

### Required Environment Variables

Copy `.env.example` to `.env` and fill in:

- `VITE_API_BASE` - Base URL for backend API
- `VITE_WEATHER_API_KEY` - Weather API key (OpenWeatherMap, WeatherAPI, etc.)
- `VITE_MAPS_API_KEY` - Google Maps API key
- `VITE_HOTEL_API_KEY` - Hotel search API key (optional)
- `VITE_ANALYTICS_ID` - Analytics tracking ID

### Backend API Endpoints

The frontend expects the following REST API endpoints from the backend:

#### Authentication
- `POST /api/auth/login` - User login
  - Body: `{ email: string, password: string }`
  - Response: `{ user: User, token: string }`
  
- `POST /api/auth/register` - User registration
  - Body: `{ name: string, email: string, password: string }`
  - Response: `{ message: string }`

- `POST /api/auth/logout` - User logout
  - Headers: `Authorization: Bearer {token}`

#### Destinations
- `GET /api/destinations` - Get all destinations
  - Query: `?category={category}&search={query}`
  - Response: `Destination[]`

- `GET /api/destinations/:id` - Get destination details
  - Response: `Destination`

- `POST /api/destinations` - Create destination (Admin only)
  - Body: `Destination`
  - Headers: `Authorization: Bearer {token}`

- `PUT /api/destinations/:id` - Update destination (Admin only)
  - Body: `Partial<Destination>`
  - Headers: `Authorization: Bearer {token}`

- `DELETE /api/destinations/:id` - Delete destination (Admin only)
  - Headers: `Authorization: Bearer {token}`

#### Reviews
- `GET /api/destinations/:id/reviews` - Get reviews for destination
  - Response: `Review[]`

- `POST /api/destinations/:id/reviews` - Add review
  - Body: `{ rating: number, comment: string }`
  - Headers: `Authorization: Bearer {token}`

#### Wishlist
- `GET /api/wishlist` - Get user wishlist
  - Headers: `Authorization: Bearer {token}`
  - Response: `string[]` (destination IDs)

- `POST /api/wishlist/:destinationId` - Add to wishlist
  - Headers: `Authorization: Bearer {token}`

- `DELETE /api/wishlist/:destinationId` - Remove from wishlist
  - Headers: `Authorization: Bearer {token}`

### Replacing Mock APIs

Currently, the app uses mock data from:
- `src/lib/api.mock.ts` - Mock third-party APIs
- Component state - User auth, reviews, wishlist

To connect to real backend:

1. **Update API calls** in `src/lib/api.ts`:
   ```typescript
   export const api = {
     searchHotels: async (params: HotelSearchParams) => {
       return http.post<Hotel[]>('/api/hotels/search', params);
     },
     // ... other methods
   };
   ```

2. **Replace Context storage** with API calls:
   - `src/contexts/AuthContext.tsx` - Replace localStorage with `/api/auth/*`
   - `src/contexts/WishlistContext.tsx` - Replace localStorage with `/api/wishlist/*`

3. **Update ReviewSection component** to use `/api/destinations/:id/reviews`

4. **Set environment variables** in `.env`

## 🌐 Internationalization (i18n)

Translations are in `src/locales/`:
- `id.json` - Indonesian
- `en.json` - English

To add a new language:
1. Create `src/locales/{code}.json`
2. Update `src/contexts/LocaleContext.tsx`
3. Add language option to language switcher

Usage in components:
```typescript
import { useLocale } from '@/contexts/LocaleContext';

const MyComponent = () => {
  const { t, locale, setLocale } = useLocale();
  return <h1>{t.nav.home}</h1>;
};
```

## 📱 PWA Configuration

PWA files:
- `public/manifest.json` - App manifest
- `public/sw.js` - Service worker for offline caching

Service worker is registered in `index.html`. To customize caching:
1. Edit `public/sw.js`
2. Update `CACHE_NAME` version
3. Add URLs to `urlsToCache` array

## 🔍 SEO Best Practices

- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`)
- Add meta tags dynamically per page (use `react-helmet-async`)
- Optimize images with lazy loading
- Use descriptive alt texts
- Ensure proper heading hierarchy (h1 → h2 → h3)

## 📊 Performance Monitoring

To add monitoring (Sentry, LogRocket, etc.):

1. Install SDK: `npm install @sentry/react`
2. Initialize in `src/main.tsx`:
   ```typescript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.VITE_ENV,
   });
   ```
3. Wrap errors in `src/lib/http.ts` with Sentry.captureException()

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

Build output in `dist/` directory.

## 🔐 Security Notes

- Never commit `.env` file
- Use HTTPS for all API calls
- Validate user input on frontend AND backend
- Implement rate limiting on API endpoints
- Use secure authentication (JWT with short expiry)

## 📞 Support

For questions or issues, contact the development team or refer to project documentation.
