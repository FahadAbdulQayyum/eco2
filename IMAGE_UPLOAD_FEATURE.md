# Image Upload and Display Feature

This feature allows users to upload images to Vercel Blob Storage and view them even after restarting the project.

## Features

### 🖼️ Image Upload
- Drag and drop or click to select images
- Support for multiple image uploads
- File size validation (5MB limit)
- Image type validation
- Automatic upload to Vercel Blob Storage

### 💾 Persistent Storage
- Images are stored in Vercel Blob Storage (cloud)
- Image metadata is cached in localStorage
- Images persist across project restarts
- Smart storage management with size limits

### 🎯 Image Display
- **Show All Images Button**: Displays a button to view all uploaded images
- **Recently Uploaded**: Shows the last 3 uploaded images by default
- **Full Gallery View**: Click the button to see all images in a grid layout
- **Image Actions**: Copy URL, remove images, clear all

### 🔄 Project Restart Persistence
When you restart your project:
1. The page loads and checks localStorage for previously uploaded images
2. If images exist, the "Show All Uploaded Images" button appears
3. Click the button to view all your previously uploaded images
4. Images are loaded from Vercel Blob Storage using cached URLs

## How to Use

### 1. Upload Images
- Navigate to `/upload-demo`
- Drag and drop images or click to select
- Images are automatically uploaded to Vercel Blob Storage

### 2. View Images After Restart
- Restart your project
- Go to `/upload-demo`
- Click "Show All Uploaded Images" button
- All previously uploaded images will be displayed

### 3. Manage Images
- **Copy URL**: Click to copy the image URL to clipboard
- **Remove**: Remove individual images
- **Clear All**: Remove all images from the gallery

## Technical Implementation

### Components
- `ImageUpload`: Handles file selection and upload
- `ImageGallery`: Displays images in a responsive grid
- `useImageStorage`: Custom hook for localStorage management

### Storage Strategy
- **Vercel Blob Storage**: Stores actual image files
- **localStorage**: Caches image metadata (URLs, filenames, upload dates)
- **Fallback**: If localStorage is corrupted, it's automatically cleared

### Data Structure
```typescript
interface UploadedImage {
  url: string;           // Vercel Blob Storage URL
  filename: string;      // Original filename
  uploadedAt: string;   // ISO timestamp
  size?: number;         // File size in bytes
  type?: string;         // MIME type
}
```

## Benefits

✅ **Persistent**: Images remain accessible after project restarts  
✅ **Fast**: Images served via global CDN  
✅ **Scalable**: 100GB free storage per month  
✅ **Reliable**: Vercel's infrastructure  
✅ **User-Friendly**: Simple drag & drop interface  
✅ **Responsive**: Works on all device sizes  

## Environment Setup

Make sure you have the following environment variables set:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## Usage Examples

### Basic Image Gallery
```tsx
import { useImageStorage } from '@/lib/hooks/useImageStorage';
import ImageGallery from '@/components/common/ImageGallery';

function MyComponent() {
  const { images, addImages, removeImage } = useImageStorage();
  
  return (
    <ImageGallery
      images={images}
      title="My Images"
      onRemoveImage={removeImage}
    />
  );
}
```

### Custom Hook Usage
```tsx
import { useImageStorage } from '@/lib/hooks/useImageStorage';

function MyComponent() {
  const {
    images,
    isLoading,
    addImages,
    removeImage,
    clearAllImages,
    getImageCount
  } = useImageStorage();
  
  // Use the hook functions as needed
}
```

## Troubleshooting

### Images Not Loading After Restart
1. Check if localStorage is enabled in your browser
2. Verify that images were successfully uploaded initially
3. Check browser console for any errors

### Upload Failures
1. Verify your Vercel Blob Storage token is correct
2. Check file size (must be under 5MB)
3. Ensure file type is an image

### Performance Issues
- The hook automatically manages localStorage size
- If storage exceeds 5MB, only recent images are kept
- Images are loaded lazily for better performance
