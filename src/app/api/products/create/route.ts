import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const dressStyle = formData.get('dressStyle') as string;
    const rating = parseFloat(formData.get('rating') as string);
    const discountAmount = parseFloat(formData.get('discountAmount') as string) || 0;
    const discountPercentage = parseFloat(formData.get('discountPercentage') as string) || 0;
    const description = formData.get('description') as string;
    const inStock = formData.get('inStock') === 'true';
    const featured = formData.get('featured') === 'true';
    
    // Parse arrays
    const colors = JSON.parse(formData.get('colors') as string || '[]');
    const sizes = JSON.parse(formData.get('sizes') as string || '[]');
    
    // Handle file uploads
    const mainImageFile = formData.get('mainImage') as File;
    const galleryFiles = formData.getAll('galleryImages') as File[];
    
    const cloudinaryPublicIds: string[] = [];
    let srcUrl = '';
    const gallery: string[] = [];
    
    // Upload main image
    if (mainImageFile && mainImageFile.size > 0) {
      const mainImageResult = await uploadToCloudinary(mainImageFile);
      srcUrl = mainImageResult.url;
      cloudinaryPublicIds.push(mainImageResult.public_id);
    }
    
    // Upload gallery images
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const galleryResult = await uploadToCloudinary(file);
        gallery.push(galleryResult.url);
        cloudinaryPublicIds.push(galleryResult.public_id);
      }
    }
    
    // Create product data
    const productData = {
      title,
      srcUrl,
      gallery,
      price,
      discount: {
        amount: discountAmount,
        percentage: discountPercentage,
      },
      rating,
      category,
      colors,
      sizes,
      brand,
      dressStyle,
      description,
      inStock,
      featured,
      cloudinaryPublicIds,
    };
    
    // Create and save product
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    return NextResponse.json({
      success: true,
      data: savedProduct,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
