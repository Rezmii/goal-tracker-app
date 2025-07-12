import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";

await connectToDatabase();

export async function PATCH(req) {
  try {
    const { orderedCategories } = await req.json();
    for (let i = 0; i < orderedCategories.length; i++) {
      await Category.findOneAndUpdate(
        { name: orderedCategories[i] },
        { order: i }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji kolejności" },
      { status: 500 }
    );
  }
}
