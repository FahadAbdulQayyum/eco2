import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const cursor = searchParams.get('cursor') || undefined;
    
    // List images from Vercel Blob
    const { blobs, cursor: nextCursor } = await list({
      limit,
      cursor,
      // You can add filters here if needed
      // prefix: 'image-', // Only show images with this prefix
    });

    // Transform the blobs to match our expected format
    const images = blobs.map(blob => {
      const filename = blob.pathname.split('/').pop() || blob.pathname;
      const extension = filename.split('.').pop()?.toLowerCase();
      
      // Derive content type from file extension
      let contentType = 'application/octet-stream';
      if (extension === 'jpg' || extension === 'jpeg') contentType = 'image/jpeg';
      else if (extension === 'png') contentType = 'image/png';
      else if (extension === 'gif') contentType = 'image/gif';
      else if (extension === 'webp') contentType = 'image/webp';
      else if (extension === 'svg') contentType = 'image/svg+xml';
      
      return {
        url: blob.url,
        filename: filename,
        uploadedAt: blob.uploadedAt,
        size: blob.size,
        type: contentType,
      };
    });

    return NextResponse.json({
      images,
      cursor: nextCursor,
      hasMore: !!nextCursor,
      total: images.length,
    });

  } catch (error) {
    console.error('Error fetching images from Vercel Blob:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images from Vercel Blob' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Note: Vercel Blob doesn't support deletion in the free tier
    // This is a limitation of the current plan
    return NextResponse.json({ 
      message: 'Delete functionality not available in free tier',
      note: 'Images are automatically managed by Vercel Blob',
      filename 
    });

  } catch (error) {
    console.error('Error handling delete request:', error);
    return NextResponse.json({ 
      error: 'Failed to process delete request' 
    }, { status: 500 });
  }
}
