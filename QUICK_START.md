# 🚀 Quick Start Guide - GoBazar Location Feature

## ⚡ 5-Minute Setup

### 1️⃣ Configure Frontend Environment

**Add to `blinkit-clone/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2️⃣ Setup Backend Database

```bash
# Navigate to backend
cd gobazar-backend

# Run migration
npx prisma migrate dev --name add_location_models

# Generate Prisma client
npx prisma generate

# Seed popular locations
npx ts-node prisma/seeds/popularLocations.ts
```

### 3️⃣ Start Backend Server

```bash
# In gobazar-backend directory
npm run dev
```

Server will start on `http://localhost:5000`

### 4️⃣ Start Frontend

```bash
# In blinkit-clone directory
cd ../blinkit-clone

# Build (first time only)
npm run build

# Start
npm start

# OR for development
npm run dev
```

Frontend will start on `http://localhost:3000`

## ✅ Verify Setup

1. **Open browser:** `http://localhost:3000`
2. **Location modal should auto-open** on first visit
3. **Test features:**
   - Click "Use Current Location" (allow browser permission)
   - Switch to "Search" tab and search for a location
   - Select a popular location
   - Verify location appears in header

## 🎯 What's Included

### Frontend Features:
- ✅ Location detection modal (Blinkit-style)
- ✅ GPS-based current location detection
- ✅ Location search with autocomplete
- ✅ Popular locations quick select
- ✅ Header location display
- ✅ localStorage persistence
- ✅ Backend sync for logged-in users

### Backend Features:
- ✅ Location search API (OpenStreetMap)
- ✅ Reverse geocoding API
- ✅ Popular locations management
- ✅ User location storage
- ✅ Database models (UserLocation, PopularLocation)

## 📁 Files Created

### Frontend:
```
blinkit-clone/
├── components/location/
│   ├── location-modal.tsx          # Main modal component
│   └── location-display.tsx        # Header display
├── contexts/
│   └── location-context.tsx        # State management
├── app/
│   └── layout.tsx                  # Updated with providers
└── LOCATION_SETUP.md              # Detailed guide
```

### Backend:
```
gobazar-backend/
├── src/
│   ├── controllers/
│   │   └── locationController.ts   # Location endpoints
│   └── routes/
│       └── location.ts             # Route definitions
├── prisma/
│   ├── schema.prisma              # Updated schema
│   └── seeds/
│       └── popularLocations.ts    # Seed data
├── docs/
│   └── LOCATION_API.md           # API documentation
└── scripts/
    ├── setup-location.sh         # Setup script (Linux/Mac)
    └── setup-location.bat        # Setup script (Windows)
```

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check if PostgreSQL is running
# Start it if needed
```

### Frontend build error?
```bash
# Clear .next folder
rm -rf .next
npm run build
```

### Location modal not showing?
```javascript
// Clear localStorage in browser console
localStorage.clear();
location.reload();
```

### Prisma errors?
```bash
# Re-run migration
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
```

## 📚 Documentation

- **Frontend Setup:** `blinkit-clone/LOCATION_SETUP.md`
- **Backend API:** `gobazar-backend/docs/LOCATION_API.md`
- **Database Schema:** `gobazar-backend/prisma/schema.prisma`

## 🎨 Customization

### Change Popular Locations:
Edit `gobazar-backend/prisma/seeds/popularLocations.ts`

### Modify UI:
- Modal: `blinkit-clone/components/location/location-modal.tsx`
- Header: `blinkit-clone/components/location/location-display.tsx`

### Update API URL:
Change `NEXT_PUBLIC_API_URL` in `.env.local`

## 🚀 Next Steps

1. **Test all features** thoroughly
2. **Customize popular locations** for your area
3. **Add more locations** via admin panel
4. **Configure production** geocoding service (Google Maps/Mapbox)
5. **Add caching** for better performance

## 📞 Need Help?

Check the detailed guides:
- Frontend: `blinkit-clone/LOCATION_SETUP.md`
- Backend: `gobazar-backend/docs/LOCATION_API.md`

---

**You're all set! 🎉**
