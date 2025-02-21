import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowy from "@/models/CelCzasowy";

export async function DELETE(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    await connectToDatabase();

    const deletedGoal = await CelCzasowy.findByIdAndDelete(id);

    if (!deletedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return NextResponse.json({ error: "Błąd usuwania" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    const { text, important } = await req.json();

    await connectToDatabase();

    const updateFields = {};
    if (text !== undefined) updateFields.text = text;
    if (important !== undefined) updateFields.important = important;

    const updatedGoal = await CelCzasowy.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error("Błąd aktualizacji celu:", error);
    return NextResponse.json({ error: "Błąd aktualizacji" }, { status: 500 });
  }
}
