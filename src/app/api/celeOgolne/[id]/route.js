import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelOgolny from "@/models/CelOgolny";

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    await CelOgolny.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Błąd usuwania celu" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const updatedGoal = await CelOgolny.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updatedGoal);
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji celu" },
      { status: 500 }
    );
  }
}
