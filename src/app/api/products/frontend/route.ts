import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET - Fetch products for frontend with specific formatting
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Build filter object
    const filter: any = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (featured === 'false') filter.featured = false;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Fetch products with pagination and sorting
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    // Format products for frontend (remove internal fields)
    const formattedProducts = products.map((product: any) => ({
      id: product._id.toString(),
      title: product.title,
      srcUrl: product.srcUrl,
      gallery: product.gallery || [],
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      category: product.category,
      colors: product.colors,
      sizes: product.sizes,
      brand: product.brand,
      dressStyle: product.dressStyle,
      description: product.description,
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      filters: {
        category,
        featured,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error('Error fetching products for frontend:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
