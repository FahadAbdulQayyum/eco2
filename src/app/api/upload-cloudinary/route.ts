import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles: { url: string; public_id: string; filename: string }[] = [];

    for (const file of files) {
      if (file instanceof File) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
        }

        try {
          // Upload to Cloudinary
          const result = await uploadToCloudinary(file);
          
          uploadedFiles.push({
            url: result.url,
            public_id: result.public_id,
            filename: file.name
          });
        } catch (uploadError) {
          console.error('Upload error for file:', file.name, uploadError);
          return NextResponse.json({ 
            error: `Failed to upload ${file.name}` 
          }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ 
      success: true,
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
