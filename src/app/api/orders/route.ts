import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const mongoose = await connectDB();
    
    // Get the database instance and fetch all orders from the orders collection
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(
      { success: true, orders },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
