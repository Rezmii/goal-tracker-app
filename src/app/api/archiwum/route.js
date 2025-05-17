import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowyArchiwum from "@/models/CelCzasowyArchiwum";

export async function GET() {
  try {
    await connectToDatabase();
    const archivedGoals = await CelCzasowyArchiwum.find().sort({
      date_finish: -1,
    });
    return NextResponse.json(archivedGoals);
  } catch (error) {
    console.error("Błąd pobierania archiwum:", error);
    return NextResponse.json({ error: "Błąd pobierania" }, { status: 500 });
  }
}
