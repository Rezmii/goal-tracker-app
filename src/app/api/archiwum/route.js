import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowyArchiwum from "@/models/CelCzasowyArchiwum";
import CelTrzyPoziomyArchiwum from "@/models/CelTrzyPoziomyArchiwum";

export async function GET() {
  try {
    await connectToDatabase();

    const celeCzasowe = await CelCzasowyArchiwum.find({}).lean();
    const celeTrzyPoziomowe = await CelTrzyPoziomyArchiwum.find({}).lean();

    const formattedCzasowe = celeCzasowe.map((goal) => ({
      ...goal,
      category: "czasowe",
    }));
    const formattedTrzyPoziomowe = celeTrzyPoziomowe.map((goal) => ({
      ...goal,
      category: "trzyPoziomowe",
    }));

    const allArchivedGoals = [
      ...formattedCzasowe,
      ...formattedTrzyPoziomowe,
    ].sort((a, b) => new Date(b.archived_at) - new Date(a.archived_at));

    return NextResponse.json(allArchivedGoals);
  } catch (error) {
    console.error("Błąd pobierania archiwum:", error);
    return NextResponse.json({ error: "Błąd pobierania" }, { status: 500 });
  }
}
