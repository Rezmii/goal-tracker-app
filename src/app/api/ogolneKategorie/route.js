import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";

await connectToDatabase();

export async function GET() {
  try {
    const categories = await Category.find({}).sort({ order: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd pobierania kategorii" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();
    const count = await Category.countDocuments();
    const newCategory = new Category({ name, order: count });
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd dodawania kategorii" },
      { status: 500 }
    );
  }
}
