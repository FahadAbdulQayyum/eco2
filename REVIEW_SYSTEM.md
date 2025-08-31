# Review System Documentation

## Overview
This system allows you to manage customer reviews through the admin dashboard and display them on the homepage. Reviews are stored in a JSON file and can be managed through the `/upload-demo` admin interface.

## How It Works

### 1. **File Storage**
- Reviews are stored in `data/reviews.json`
- The file is automatically created when the first review is added
- Data persists across server restarts

### 2. **API Endpoints**
- **GET** `/api/reviews` - Fetch all reviews
- **POST** `/api/reviews` - Add new review
- **DELETE** `/api/reviews?id={id}` - Delete review by ID

### 3. **Admin Dashboard**
- Access via `/upload-demo` with password: `iamfahad`
- Click "Review Data" button to manage reviews
- Add new reviews with user name, rating, date, and content
- Delete existing reviews

### 4. **Homepage Integration**
- Homepage automatically fetches reviews from the API
- Falls back to default reviews if API fails
- Reviews are displayed in the Reviews section

## Adding Reviews

### Through Admin Dashboard:
1. Go to `/upload-demo`
2. Enter password: `iamfahad`
3. Click "Review Data" button
4. Click "Add Review" button
5. Fill in the form:
   - **User Name**: Customer's name
   - **Rating**: 1-5 stars
   - **Date**: Review date
   - **Content**: Review text
6. Click "Add Review"

### Through API:
```bash
curl -X POST /api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "user": "Customer Name",
    "rating": 5,
    "date": "2024-01-30",
    "content": "Great product!"
  }'
```

## Review Data Structure

```json
{
  "id": 1234567890,
  "user": "Customer Name",
  "content": "Review content here",
  "rating": 5,
  "date": "2024-01-30"
}
```

## File Location
- **Storage**: `data/reviews.json`
- **API**: `src/app/api/reviews/route.ts`
- **Admin Interface**: `src/app/upload-demo/page.tsx`
- **Homepage**: `src/app/page.tsx`

## Security
- Admin access is password-protected
- API endpoints are public (for homepage display)
- File-based storage is simple and reliable

## Benefits
- ✅ **Persistent Storage**: Reviews survive server restarts
- ✅ **Easy Management**: Simple admin interface
- ✅ **Real-time Updates**: Changes appear immediately on homepage
- ✅ **Fallback Support**: Default reviews if API fails
- ✅ **Simple Architecture**: No database required
