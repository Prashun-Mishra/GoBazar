# Location API Documentation

## Overview
Complete location detection and management system for GoBazar, similar to Blinkit's location selection feature.

## Database Models

### UserLocation
Stores user's selected delivery location.

```prisma
model UserLocation {
  id          String   @id @default(cuid())
  userId      String   @unique
  displayName String
  address     Json
  latitude    Float
  longitude   Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### PopularLocation
Stores popular/frequently used locations for quick selection.

```prisma
model PopularLocation {
  id          String   @id @default(cuid())
  name        String
  address     String
  city        String
  state       String
  latitude    Float
  longitude   Float
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Endpoints

### 1. Search Locations
Search for locations by query string.

**Endpoint:** `GET /api/location/search`

**Query Parameters:**
- `q` (required): Search query string

**Example Request:**
```bash
GET /api/location/search?q=Connaught+Place
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "12345",
      "displayName": "Connaught Place, New Delhi, 110001, India",
      "address": {
        "road": "Connaught Place",
        "suburb": "Connaught Place",
        "city": "New Delhi",
        "state": "Delhi",
        "postcode": "110001",
        "country": "India"
      },
      "coordinates": {
        "latitude": 28.6280,
        "longitude": 77.2069
      }
    }
  ]
}
```

### 2. Get Current Location
Get location details from coordinates (reverse geocoding).

**Endpoint:** `GET /api/location/current`

**Query Parameters:**
- `latitude` (required): Latitude coordinate
- `longitude` (required): Longitude coordinate

**Example Request:**
```bash
GET /api/location/current?latitude=28.6139&longitude=77.2090
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "12345",
    "displayName": "Connaught Place, New Delhi, 110001, India",
    "address": {
      "road": "Connaught Place",
      "suburb": "Connaught Place",
      "city": "New Delhi",
      "state": "Delhi",
      "postcode": "110001",
      "country": "India"
    },
    "coordinates": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

### 3. Get Popular Locations
Get list of popular locations for quick selection.

**Endpoint:** `GET /api/location/popular`

**Example Request:**
```bash
GET /api/location/popular
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234",
      "name": "Connaught Place",
      "address": "Connaught Place, New Delhi",
      "city": "New Delhi",
      "state": "Delhi",
      "latitude": 28.6280,
      "longitude": 77.2069,
      "order": 1,
      "isActive": true,
      "createdAt": "2025-09-30T08:30:00Z",
      "updatedAt": "2025-09-30T08:30:00Z"
    }
  ]
}
```

### 4. Save User Location
Save user's selected delivery location.

**Endpoint:** `POST /api/location/save`

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "location": {
    "displayName": "Connaught Place, New Delhi, 110001, India",
    "address": {
      "road": "Connaught Place",
      "suburb": "Connaught Place",
      "city": "New Delhi",
      "state": "Delhi",
      "postcode": "110001",
      "country": "India"
    },
    "coordinates": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx5678",
    "userId": "user123",
    "displayName": "Connaught Place, New Delhi, 110001, India",
    "address": {
      "road": "Connaught Place",
      "suburb": "Connaught Place",
      "city": "New Delhi",
      "state": "Delhi",
      "postcode": "110001",
      "country": "India"
    },
    "latitude": 28.6139,
    "longitude": 77.2090,
    "createdAt": "2025-09-30T08:30:00Z",
    "updatedAt": "2025-09-30T08:30:00Z"
  }
}
```

### 5. Get User's Saved Location
Get the user's saved delivery location.

**Endpoint:** `GET /api/location/user`

**Authentication:** Required (JWT Token)

**Example Request:**
```bash
GET /api/location/user
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx5678",
    "userId": "user123",
    "displayName": "Connaught Place, New Delhi, 110001, India",
    "address": {
      "road": "Connaught Place",
      "suburb": "Connaught Place",
      "city": "New Delhi",
      "state": "Delhi",
      "postcode": "110001",
      "country": "India"
    },
    "latitude": 28.6139,
    "longitude": 77.2090,
    "createdAt": "2025-09-30T08:30:00Z",
    "updatedAt": "2025-09-30T08:30:00Z"
  }
}
```

### 6. Add Popular Location (Admin)
Add a new popular location.

**Endpoint:** `POST /api/location/popular`

**Authentication:** Required (Admin JWT Token)

**Request Body:**
```json
{
  "name": "Cyber City",
  "address": "DLF Cyber City, Gurgaon",
  "city": "Gurgaon",
  "state": "Haryana",
  "latitude": 28.4961,
  "longitude": 77.0943,
  "order": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx9999",
    "name": "Cyber City",
    "address": "DLF Cyber City, Gurgaon",
    "city": "Gurgaon",
    "state": "Haryana",
    "latitude": 28.4961,
    "longitude": 77.0943,
    "order": 2,
    "isActive": true,
    "createdAt": "2025-09-30T08:30:00Z",
    "updatedAt": "2025-09-30T08:30:00Z"
  }
}
```

## Frontend Integration

### 1. Get User's Current Location (Browser API)
```javascript
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Call backend to get location details
        const response = await fetch(
          `http://localhost:5000/api/location/current?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        
        if (data.success) {
          resolve(data.data);
        } else {
          reject(new Error(data.error));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};
```

### 2. Search Locations
```javascript
const searchLocations = async (query) => {
  const response = await fetch(
    `http://localhost:5000/api/location/search?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.data;
};
```

### 3. Get Popular Locations
```javascript
const getPopularLocations = async () => {
  const response = await fetch('http://localhost:5000/api/location/popular');
  const data = await response.json();
  return data.data;
};
```

### 4. Save User Location
```javascript
const saveUserLocation = async (location, token) => {
  const response = await fetch('http://localhost:5000/api/location/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ location })
  });
  const data = await response.json();
  return data.data;
};
```

### 5. Get User's Saved Location
```javascript
const getUserLocation = async (token) => {
  const response = await fetch('http://localhost:5000/api/location/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.data;
};
```

## Setup Instructions

### 1. Run Database Migration
```bash
cd gobazar-backend
npx prisma migrate dev --name add_location_models
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Seed Popular Locations
```bash
npx ts-node prisma/seeds/popularLocations.ts
```

### 4. Start the Server
```bash
npm run dev
```

## Testing with Postman

### Test Search
```
GET http://localhost:5000/api/location/search?q=Connaught Place
```

### Test Current Location
```
GET http://localhost:5000/api/location/current?latitude=28.6139&longitude=77.2090
```

### Test Popular Locations
```
GET http://localhost:5000/api/location/popular
```

### Test Save Location (requires auth token)
```
POST http://localhost:5000/api/location/save
Headers:
  Authorization: Bearer <your-token>
  Content-Type: application/json

Body:
{
  "location": {
    "displayName": "Connaught Place, New Delhi",
    "address": {
      "city": "New Delhi",
      "state": "Delhi",
      "postcode": "110001",
      "country": "India"
    },
    "coordinates": {
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  }
}
```

## Notes

1. **Geocoding Service**: Uses OpenStreetMap's Nominatim API (free, but rate-limited)
2. **Rate Limiting**: Consider adding rate limiting for geocoding requests
3. **Caching**: Implement caching for frequently searched locations
4. **Production**: For production, consider using Google Maps API or Mapbox for better reliability
5. **User Agent**: Always include a User-Agent header when calling Nominatim API

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing/invalid parameters)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not Found
- `500`: Internal Server Error
