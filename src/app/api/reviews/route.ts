import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const REVIEWS_FILE_PATH = path.join(process.cwd(), 'data', 'reviews.json');

export interface Review {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
}

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(REVIEWS_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read reviews from file
async function readReviews(): Promise<Review[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(REVIEWS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

// Write reviews to file
async function writeReviews(reviews: Review[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(reviews, null, 2), 'utf-8');
}

// GET - Fetch all reviews
export async function GET() {
  try {
    const reviews = await readReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST - Add new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, content, rating, date } = body;

    // Validate required fields
    if (!user || !content || !rating || !date) {
      return NextResponse.json({ 
        error: 'Missing required fields: user, content, rating, date' 
      }, { status: 400 });
    }

    // Validate rating
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json({ 
        error: 'Rating must be an integer between 1 and 5' 
      }, { status: 400 });
    }

    const reviews = await readReviews();
    const newReview: Review = {
      id: Date.now(),
      user: user.trim(),
      content: content.trim(),
      rating,
      date
    };

    reviews.push(newReview);
    await writeReviews(reviews);

    return NextResponse.json({ 
      message: 'Review added successfully', 
      review: newReview 
    });

  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ 
      error: 'Failed to add review' 
    }, { status: 500 });
  }
}

// DELETE - Delete a review by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const reviews = await readReviews();
    const reviewIndex = reviews.findIndex(review => review.id === parseInt(id));

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const deletedReview = reviews.splice(reviewIndex, 1)[0];
    await writeReviews(reviews);

    return NextResponse.json({ 
      message: 'Review deleted successfully', 
      deletedReview 
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ 
      error: 'Failed to delete review' 
    }, { status: 500 });
  }
}
