import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowy from "@/models/CelCzasowy";

// Połączenie z bazą
await connectToDatabase();

export async function PATCH(req) {
  try {
    const { type, orderedGoals } = await req.json();

    for (let i = 0; i < orderedGoals.length; i++) {
      await CelCzasowy.findByIdAndUpdate(orderedGoals[i]._id, { order: i });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji kolejności" },
      { status: 500 }
    );
  }
}
