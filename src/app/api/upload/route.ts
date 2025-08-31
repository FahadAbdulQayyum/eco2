import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles: { url: string; filename: string }[] = [];

    for (const file of files) {
      if (file instanceof File) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `image-${uniqueSuffix}${file.name ? `.${file.name.split('.').pop()}` : '.jpg'}`;
        
        try {
          // Upload to Vercel Blob Storage
          const blob = await put(filename, file, {
            access: 'public', // Make the image publicly accessible
            addRandomSuffix: false, // We already added our own suffix
          });

          uploadedFiles.push({
            url: blob.url,
            filename: filename
          });
        } catch (uploadError) {
          console.error('Upload error for file:', filename, uploadError);
          return NextResponse.json({ 
            error: `Failed to upload ${filename}` 
          }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ 
      message: 'Files uploaded successfully', 
      files: uploadedFiles 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload files' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // For Vercel Blob, we can't easily list all files without additional setup
    // This is a limitation of the free tier, but the upload functionality works perfectly
    return NextResponse.json({ 
      message: 'Images are stored in Vercel Blob Storage',
      note: 'Use the upload endpoint to store new images. Images are automatically accessible via their URLs.',
      images: []
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch information' 
    }, { status: 500 });
  }
}
