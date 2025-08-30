# Admin Dashboard - Image Upload & Management

## Overview
This admin dashboard allows authorized users to upload, view, and manage images in the `public/upload` folder.

## Access
- URL: `/admin-dashboard`
- Password: `iamfahad`

## Features
- **Secure Login**: Password-protected access
- **Image Upload**: Multiple image selection and upload
- **File Validation**: Only image files allowed (5MB max per file)
- **Unique Naming**: Automatically generates unique filenames
- **Upload Progress**: Shows upload status and results
- **Gallery View**: Toggle between upload and gallery modes
- **Image Management**: View, preview, and delete uploaded images
- **Recent Uploads**: Always visible thumbnail grid of recent images
- **Real-time Updates**: Automatically refreshes after uploads/deletions

## How to Use

### Upload Images
1. Navigate to `/admin-dashboard`
2. Enter password: `iamfahad`
3. Click "Choose Files" to select images
4. Click "Upload Images" to upload
5. Images appear immediately in the Recent Uploads section

### View & Manage Images
1. Click "Show Gallery" button to switch to gallery view
2. View all uploaded images with metadata (filename, upload time)
3. Click "View" to open image in new tab
4. Click "Delete" to remove images (with confirmation)
5. Click "Hide Gallery" to return to upload view

## Technical Details
- **API Endpoint**: `/api/upload`
- **Delete Endpoint**: `/api/upload/[filename]` (DELETE method)
- **Storage Location**: `public/upload/`
- **File Types**: All image formats (jpg, png, gif, webp, bmp)
- **File Size Limit**: 5MB per file
- **Filename Format**: `image-{timestamp}-{random}.{extension}`

## File Structure
```
src/app/
├── admin-dashboard/
│   └── page.tsx          # Admin dashboard UI
└── api/
    └── upload/
        ├── route.ts      # Upload & fetch images
        └── [filename]/
            └── route.ts  # Delete individual images

public/
└── upload/               # Uploaded images storage
```

## UI Features
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Toggle Views**: Switch between upload and gallery modes
- **Image Previews**: Thumbnails with hover effects
- **Action Buttons**: View and delete options for each image
- **Real-time Feedback**: Immediate updates after operations
- **Error Handling**: Clear error messages and validation

## Security Notes
- Password is hardcoded for simplicity
- Only image files are accepted
- File size is limited to prevent abuse
- Filename validation prevents directory traversal
- Files are stored in public directory (accessible via URL)
