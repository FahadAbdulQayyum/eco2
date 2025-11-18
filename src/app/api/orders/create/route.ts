import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const mongoose = await connectDB();
    const db = mongoose.connection.db;

    if (!db) {
      console.error("Database instance is not available on mongoose.connection.db");
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
    }

    const doc = {
      ...body,
    };

    const result = await db.collection("orders").insertOne(doc);

    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
