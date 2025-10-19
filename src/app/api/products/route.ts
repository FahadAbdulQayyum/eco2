import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    // Build filter object
    const filter: any = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Fetch products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Create new product
    const product = new Product(body);
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
