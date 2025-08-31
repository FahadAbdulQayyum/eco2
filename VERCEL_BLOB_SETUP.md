# Vercel Blob Storage Setup Guide

## What is Vercel Blob Storage?

Vercel Blob Storage is a serverless object storage service that integrates seamlessly with Vercel deployments. It's perfect for storing images, files, and other binary data without the complexity of traditional cloud storage services.

## Benefits Over Cloudinary

✅ **Free Tier**: 100GB storage and 100GB bandwidth per month  
✅ **No Credit Card Required**: Perfect for hobby projects  
✅ **Native Vercel Integration**: Works out of the box with Vercel deployments  
✅ **Global CDN**: Images are served from edge locations worldwide  
✅ **Simple API**: Easy to use with just a few lines of code  

## Setup Steps

### 1. Enable Blob Storage in Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** and select **Blob**
5. Choose a name for your blob store (e.g., "qatar-shoe-images")
6. Select your preferred region
7. Click **Create**

### 2. Get Your Access Token

1. In your blob store settings, go to **API Keys**
2. Copy the **Read/Write Token**
3. This token will look like: `vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

**Important**: Add `.env.local` to your `.gitignore` file to keep your token secure!

### 4. Deploy to Vercel

1. Push your code to GitHub/GitLab
2. Connect your repository to Vercel
3. Add the environment variable in Vercel project settings
4. Deploy!

## How It Works

### Upload Process
1. User selects images
2. Images are sent to `/api/upload`
3. Each image is uploaded to Vercel Blob Storage
4. Public URLs are returned for immediate use

### Image URLs
- Images are automatically served via CDN
- URLs look like: `https://your-project.vercel.app/blob/your-image-name.jpg`
- Images are globally accessible
- No additional configuration needed

## API Response Format

### Successful Upload
```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "url": "https://your-project.vercel.app/blob/image-1234567890-123456789.jpg",
      "filename": "image-1234567890-123456789.jpg"
    }
  ]
}
```

### Error Response
```json
{
  "error": "File size must be less than 5MB"
}
```

## File Validation

- **File Types**: Only images (jpg, png, gif, webp, etc.)
- **File Size**: Maximum 5MB per file
- **Security**: Files are validated before upload

## Usage Examples

### Frontend Upload
```typescript
const uploadImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  return result.files; // Array of uploaded image URLs
};
```

### Display Images
```tsx
<img 
  src="https://your-project.vercel.app/blob/image-name.jpg" 
  alt="Product Image" 
/>
```

## Cost Structure

- **Free Tier**: 100GB storage + 100GB bandwidth/month
- **Pro Plan**: $20/month for 1TB storage + 1TB bandwidth
- **Enterprise**: Custom pricing for larger needs

## Troubleshooting

### Common Issues

1. **"BLOB_READ_WRITE_TOKEN is not defined"**
   - Check your `.env.local` file
   - Ensure the token is added to Vercel environment variables

2. **Upload fails with 500 error**
   - Check Vercel function logs
   - Verify your blob store is active

3. **Images not accessible**
   - Ensure `access: 'public'` is set in the upload options
   - Check if the blob store is in the correct region

### Support
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Migration from Local Storage

Your existing code will work seamlessly with this new system. The only changes are:

1. Images are now stored in the cloud instead of local filesystem
2. URLs are now absolute instead of relative
3. Images persist across deployments
4. Better performance with global CDN

## Next Steps

1. Set up your Vercel Blob store
2. Add your environment variables
3. Test the upload functionality
4. Deploy to Vercel
5. Enjoy fast, reliable image storage! 🚀
