import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import CelOgolny from "@/models/CelOgolny";

await connectToDatabase();

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji kategorii" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const categoryToDelete = await Category.findById(id);

    if (!categoryToDelete) {
      return NextResponse.json(
        { error: "Kategoria nie istnieje" },
        { status: 404 }
      );
    }

    await CelOgolny.deleteMany({ category: categoryToDelete.name });

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd usuwania kategorii" },
      { status: 500 }
    );
  }
}
