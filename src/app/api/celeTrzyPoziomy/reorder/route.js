import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelTrzyPoziomy from "@/models/CelTrzyPoziomy";

await connectToDatabase();

export async function PATCH(req) {
  try {
    const { orderedGoals } = await req.json();

    for (let i = 0; i < orderedGoals.length; i++) {
      await CelTrzyPoziomy.findByIdAndUpdate(orderedGoals[i]._id, { order: i });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji kolejności" },
      { status: 500 }
    );
  }
}
