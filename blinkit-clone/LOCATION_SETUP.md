# Location Feature Setup Guide

## 🎯 Overview
This guide will help you set up the complete location detection feature similar to Blinkit.

## 📋 Prerequisites
- Backend server running on `http://localhost:5000`
- PostgreSQL database running
- Node.js and npm installed

## 🔧 Frontend Setup

### Step 1: Configure Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If the file doesn't exist, create it in the root of `blinkit-clone` directory.

### Step 2: Install Dependencies (if needed)

The following components are already created and should work with your existing setup:
- ✅ LocationModal component
- ✅ LocationContext for state management
- ✅ LocationDisplay for header
- ✅ Integration with layout

### Step 3: Build and Run Frontend

```bash
cd blinkit-clone
npm run build
npm start
```

Or for development:
```bash
npm run dev
```

## 🗄️ Backend Setup

### Step 1: Run Database Migration

```bash
cd gobazar-backend
npx prisma migrate dev --name add_location_models
```

### Step 2: Generate Prisma Client

```bash
npx prisma generate
```

### Step 3: Seed Popular Locations

```bash
npx ts-node prisma/seeds/popularLocations.ts
```

### Step 4: Start Backend Server

```bash
npm run dev
```

The server should start on `http://localhost:5000`

## 🧪 Testing the Feature

### 1. Open the Application
Navigate to `http://localhost:3000`

### 2. Location Modal Should Auto-Open
On first visit, the location modal will automatically open.

### 3. Test "Detect my location" Tab
- Click "Use Current Location" button
- Allow browser location permission
- Your current location should be detected and displayed

### 4. Test "Search delivery location" Tab
- Switch to the search tab
- Type a location (e.g., "Connaught Place")
- Select from search results

### 5. Test Popular Locations
- Popular locations should appear in the "Detect my location" tab
- Click any popular location to select it

### 6. Verify Header Display
- Selected location should appear in the header
- Click on location in header to change it

## 📡 API Endpoints Used

### Frontend calls these backend endpoints:

1. **Search Locations**
   ```
   GET /api/location/search?q=<query>
   ```

2. **Get Current Location**
   ```
   GET /api/location/current?latitude=<lat>&longitude=<lon>
   ```

3. **Get Popular Locations**
   ```
   GET /api/location/popular
   ```

4. **Save User Location** (when user is logged in)
   ```
   POST /api/location/save
   Headers: Authorization: Bearer <token>
   ```

## 🔍 Troubleshooting

### Issue: Location modal doesn't open
**Solution:** Clear browser localStorage and refresh
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Issue: "Can't reach database server"
**Solution:** Make sure PostgreSQL is running
```bash
# Check PostgreSQL status (Windows)
pg_ctl status

# Start PostgreSQL if not running
pg_ctl start
```

### Issue: Prisma errors about missing models
**Solution:** Run migration and generate client
```bash
npx prisma migrate dev
npx prisma generate
```

### Issue: CORS errors
**Solution:** Backend should have CORS configured for `http://localhost:3000`
Check `gobazar-backend/src/server.ts` for CORS settings.

### Issue: Location detection not working
**Solution:** 
- Ensure you're using HTTPS or localhost (geolocation requires secure context)
- Check browser permissions for location access
- Try a different browser

### Issue: Search returns no results
**Solution:**
- Check internet connection (uses OpenStreetMap API)
- Try searching for well-known locations
- Check browser console for API errors

## 🎨 Customization

### Change Popular Locations
Edit `gobazar-backend/prisma/seeds/popularLocations.ts` and re-run:
```bash
npx ts-node prisma/seeds/popularLocations.ts
```

### Modify Location Display
Edit `blinkit-clone/components/location/location-display.tsx`

### Change Modal Appearance
Edit `blinkit-clone/components/location/location-modal.tsx`

### Update Delivery Time
Change "Delivery in 8 minutes" text in:
- `components/location/location-display.tsx`
- `components/location/location-modal.tsx`

## 📱 Features Implemented

### ✅ Location Detection
- GPS-based current location detection
- Reverse geocoding to get address from coordinates
- Browser geolocation API integration

### ✅ Location Search
- Real-time search with debouncing
- OpenStreetMap Nominatim API integration
- Search results with full address details

### ✅ Popular Locations
- Database-backed popular locations
- Quick selection for frequently used areas
- Admin can add/manage popular locations

### ✅ State Management
- React Context for global location state
- localStorage persistence
- Backend sync for logged-in users

### ✅ UI/UX
- Modal with tabs (Detect / Search)
- Responsive design
- Loading states and error handling
- Clean, modern interface matching Blinkit style

## 🔐 Authentication Integration

When user is logged in, the location is automatically saved to the backend:

```typescript
// In location-context.tsx
const saveLocationToBackend = async (location: Location, token?: string) => {
  if (!token) return;
  
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/location/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ location }),
  });
};
```

## 📊 Database Schema

### UserLocation Table
```sql
CREATE TABLE user_locations (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  address JSONB NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### PopularLocation Table
```sql
CREATE TABLE popular_locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Production Considerations

### 1. Geocoding Service
- Current: OpenStreetMap Nominatim (free, rate-limited)
- Production: Consider Google Maps API or Mapbox for better reliability

### 2. Caching
- Implement Redis caching for frequently searched locations
- Cache popular locations in frontend

### 3. Rate Limiting
- Add rate limiting for location search endpoints
- Implement request throttling on frontend

### 4. Error Handling
- Add retry logic for failed API calls
- Implement fallback locations
- Better error messages for users

### 5. Performance
- Lazy load location modal
- Optimize search debounce timing
- Minimize API calls

## 📚 Additional Resources

- [OpenStreetMap Nominatim API Docs](https://nominatim.org/release-docs/latest/api/Overview/)
- [Geolocation API MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Prisma Documentation](https://www.prisma.io/docs)

## ✅ Checklist

Before going live, ensure:

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Popular locations seeded
- [ ] Backend server running
- [ ] Frontend built and running
- [ ] Location detection tested
- [ ] Search functionality tested
- [ ] Popular locations working
- [ ] Header display correct
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] CORS configured properly

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify database connection
4. Ensure all migrations are run
5. Clear browser cache and localStorage

---

**Happy Coding! 🎉**
