# API Endpoints - Frontend Requirements

Dokumentasi lengkap endpoint API yang harus disediakan oleh backend untuk mendukung fungsi frontend.

## Base URL
```
VITE_API_BASE=https://api.yourdomain.com
```

---

## 🔐 Authentication

### POST /api/auth/register
**Fungsi:** Registrasi user baru

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "isAdmin": false
  }
}
```

---

### POST /api/auth/login
**Fungsi:** Login user

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "isAdmin": boolean
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### POST /api/auth/logout
**Fungsi:** Logout user (invalidate token)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET /api/auth/me
**Fungsi:** Get current user data

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "isAdmin": boolean
  }
}
```

---

## 🗺️ Destinations

### GET /api/destinations
**Fungsi:** Get semua destinasi dengan filter

**Query Parameters:**
- `category` (optional): string - filter by category (pantai, gunung, budaya, kuliner, sejarah)
- `search` (optional): string - search by name or location
- `limit` (optional): number - pagination limit
- `offset` (optional): number - pagination offset

**Response (200):**
```json
{
  "destinations": [
    {
      "id": "string",
      "name": "string",
      "location": "string",
      "category": "string",
      "price": number,
      "rating": number,
      "imageUrl": "string",
      "description": "string",
      "highlights": ["string"],
      "facilities": ["string"]
    }
  ],
  "total": number,
  "limit": number,
  "offset": number
}
```

---

### GET /api/destinations/:id
**Fungsi:** Get detail destinasi by ID

**Response (200):**
```json
{
  "id": "string",
  "name": "string",
  "location": "string",
  "category": "string",
  "price": number,
  "rating": number,
  "imageUrl": "string",
  "description": "string",
  "highlights": ["string"],
  "facilities": ["string"],
  "reviewCount": number
}
```

**Response (404):**
```json
{
  "error": "Destination not found"
}
```

---

### POST /api/destinations
**Fungsi:** Create destinasi baru (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "string",
  "location": "string",
  "category": "string",
  "price": number,
  "imageUrl": "string",
  "description": "string",
  "highlights": ["string"],
  "facilities": ["string"]
}
```

**Response (201):**
```json
{
  "message": "Destination created successfully",
  "destination": {
    "id": "string",
    "name": "string",
    "location": "string",
    "category": "string",
    "price": number,
    "rating": 0,
    "imageUrl": "string",
    "description": "string",
    "highlights": ["string"],
    "facilities": ["string"]
  }
}
```

**Response (403):**
```json
{
  "error": "Forbidden - Admin access required"
}
```

---

### PUT /api/destinations/:id
**Fungsi:** Update destinasi (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:** (semua field optional)
```json
{
  "name": "string",
  "location": "string",
  "category": "string",
  "price": number,
  "imageUrl": "string",
  "description": "string",
  "highlights": ["string"],
  "facilities": ["string"]
}
```

**Response (200):**
```json
{
  "message": "Destination updated successfully",
  "destination": { /* updated destination object */ }
}
```

---

### DELETE /api/destinations/:id
**Fungsi:** Delete destinasi (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Destination deleted successfully"
}
```

---

## ⭐ Reviews

### GET /api/destinations/:id/reviews
**Fungsi:** Get semua review untuk destinasi tertentu

**Query Parameters:**
- `limit` (optional): number
- `offset` (optional): number

**Response (200):**
```json
{
  "reviews": [
    {
      "id": "string",
      "userId": "string",
      "userName": "string",
      "rating": number,
      "comment": "string",
      "createdAt": "string (ISO 8601)",
      "updatedAt": "string (ISO 8601)"
    }
  ],
  "total": number,
  "averageRating": number
}
```

---

### POST /api/destinations/:id/reviews
**Fungsi:** Tambah review baru (requires authentication)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": number, // 1-5
  "comment": "string"
}
```

**Response (201):**
```json
{
  "message": "Review added successfully",
  "review": {
    "id": "string",
    "userId": "string",
    "userName": "string",
    "rating": number,
    "comment": "string",
    "createdAt": "string"
  }
}
```

**Response (400):**
```json
{
  "error": "User has already reviewed this destination"
}
```

---

### PUT /api/reviews/:reviewId
**Fungsi:** Update review (hanya pemilik review)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": number,
  "comment": "string"
}
```

**Response (200):**
```json
{
  "message": "Review updated successfully",
  "review": { /* updated review */ }
}
```

---

### DELETE /api/reviews/:reviewId
**Fungsi:** Delete review (pemilik atau admin)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

---

## ❤️ Wishlist

### GET /api/wishlist
**Fungsi:** Get wishlist user yang login

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "wishlist": ["destinationId1", "destinationId2", "destinationId3"]
}
```

---

### POST /api/wishlist/:destinationId
**Fungsi:** Tambah destinasi ke wishlist

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Added to wishlist",
  "wishlist": ["destinationId1", "destinationId2"]
}
```

---

### DELETE /api/wishlist/:destinationId
**Fungsi:** Hapus destinasi dari wishlist

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Removed from wishlist",
  "wishlist": ["destinationId1"]
}
```

---

## 🏨 Third-Party APIs (Optional - untuk fitur tambahan)

### POST /api/hotels/search
**Fungsi:** Search hotel di lokasi tertentu

**Request Body:**
```json
{
  "location": "string",
  "checkIn": "string (YYYY-MM-DD)",
  "checkOut": "string (YYYY-MM-DD)",
  "guests": number
}
```

**Response (200):**
```json
{
  "hotels": [
    {
      "id": "string",
      "name": "string",
      "rating": number,
      "pricePerNight": number,
      "imageUrl": "string",
      "amenities": ["string"]
    }
  ]
}
```

---

### GET /api/weather/:location
**Fungsi:** Get cuaca terkini untuk lokasi

**Response (200):**
```json
{
  "location": "string",
  "temperature": number,
  "condition": "string",
  "humidity": number,
  "windSpeed": number,
  "icon": "string"
}
```

---

### GET /api/events/:location
**Fungsi:** Get event lokal di lokasi tertentu

**Response (200):**
```json
{
  "events": [
    {
      "id": "string",
      "name": "string",
      "date": "string (YYYY-MM-DD)",
      "location": "string",
      "category": "string",
      "imageUrl": "string"
    }
  ]
}
```

---

## 📊 Admin Dashboard (Statistik)

### GET /api/admin/stats
**Fungsi:** Get statistik untuk dashboard admin

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "totalDestinations": number,
  "totalReviews": number,
  "totalBookings": number,
  "averageRating": number,
  "recentDestinations": [
    {
      "id": "string",
      "name": "string",
      "createdAt": "string"
    }
  ],
  "topRatedDestinations": [
    {
      "id": "string",
      "name": "string",
      "rating": number
    }
  ]
}
```

---

## 🔒 Error Responses (Standar)

### 400 Bad Request
```json
{
  "error": "Error message",
  "details": {
    "field": "Validation error message"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized - Please login"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden - Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## 📝 Notes untuk Backend Developer

1. **Authentication**: Gunakan JWT token dengan expiry time yang reasonable (mis. 7 hari)
2. **Admin Check**: Email yang mengandung "admin" otomatis jadi admin (atau gunakan sistem role yang lebih robust)
3. **CORS**: Pastikan backend allow origin dari domain frontend
4. **Rate Limiting**: Implementasi rate limiting untuk prevent abuse
5. **Validation**: Validasi semua input di backend
6. **Pagination**: Gunakan limit/offset atau cursor-based pagination
7. **Image Upload**: Untuk admin, mungkin perlu endpoint upload image (return imageUrl)
8. **Search**: Implement full-text search atau fuzzy search untuk destinasi

---

## 🚀 Current Frontend Implementation

Saat ini frontend menggunakan:
- **Mock data** di `src/lib/data.ts`
- **localStorage** untuk auth, wishlist
- **Component state** untuk reviews
- **Mock APIs** di `src/lib/api.mock.ts` untuk hotel, weather, events

Untuk integrasi:
1. Update `src/lib/http.ts` dengan base URL dari `.env`
2. Replace Context storage dengan API calls
3. Update komponen untuk handle loading & error states
4. Tambahkan token management & refresh logic
