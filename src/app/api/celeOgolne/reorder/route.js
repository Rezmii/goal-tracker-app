import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelOgolny from "@/models/CelOgolny";

await connectToDatabase();

export async function PATCH(req) {
  try {
    const { category, orderedGoals } = await req.json();

    for (let i = 0; i < orderedGoals.length; i++) {
      await CelOgolny.findByIdAndUpdate(orderedGoals[i]._id, { order: i });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji kolejności" },
      { status: 500 }
    );
  }
}
