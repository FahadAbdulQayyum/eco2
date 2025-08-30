import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir, stat, unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles: string[] = [];

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

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `image-${uniqueSuffix}${path.extname(file.name)}`;
        const filepath = path.join(process.cwd(), 'public', 'upload', filename);
        
        // Write file to upload directory
        await writeFile(filepath, buffer);
        uploadedFiles.push(filename);
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
    const uploadDir = path.join(process.cwd(), 'public', 'upload');
    
    try {
      const files = await readdir(uploadDir);
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(ext);
      });

      const imagesWithMetadata = await Promise.all(
        imageFiles.map(async (filename) => {
          const filepath = path.join(uploadDir, filename);
          const stats = await stat(filepath);
          
          return {
            filename,
            url: `/upload/${filename}`,
            uploadTime: stats.mtime.toLocaleString(),
            size: stats.size,
            path: filepath
          };
        })
      );

      // Sort by upload time (newest first)
      imagesWithMetadata.sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime());

      return NextResponse.json({ 
        message: 'Images fetched successfully',
        images: imagesWithMetadata
      });

    } catch (error) {
      // If upload directory doesn't exist, return empty array
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return NextResponse.json({ 
          message: 'Upload directory not found',
          images: []
        });
      }
      throw error;
    }

  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images' 
    }, { status: 500 });
  }
}
