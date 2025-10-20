import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Health check: Testing MongoDB connection...');
    
    // Check if MONGODB_URI is available
    const mongoUri = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;
    if (!mongoUri) {
      return NextResponse.json({
        status: 'error',
        message: 'MONGODB_URI environment variable is not set',
        mongoUri: 'not configured'
      }, { status: 500 });
    }
    
    // Test MongoDB connection
    await connectDB();
    
    return NextResponse.json({
      status: 'healthy',
      message: 'MongoDB connection successful',
      mongoUri: mongoUri.substring(0, 20) + '...' // Only show first 20 chars for security
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB connection failed',
      error: error.message,
      type: error.name
    }, { status: 500 });
  }
}
