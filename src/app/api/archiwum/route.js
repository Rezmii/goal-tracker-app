import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowyArchiwum from "@/models/CelCzasowyArchiwum";
import CelTrzyPoziomyArchiwum from "@/models/CelTrzyPoziomyArchiwum";
import CelOgolnyArchiwum from "@/models/CelOgolnyArchiwum";

export async function GET() {
  try {
    await connectToDatabase();

    const [celeCzasowe, celeTrzyPoziomowe, celeOgolne] = await Promise.all([
      CelCzasowyArchiwum.find({}).lean(),
      CelTrzyPoziomyArchiwum.find({}).lean(),
      CelOgolnyArchiwum.find({}).lean(),
    ]);

    const formattedCzasowe = celeCzasowe.map((goal) => ({
      ...goal,
      category_type: "czasowe",
    }));
    const formattedTrzyPoziomowe = celeTrzyPoziomowe.map((goal) => ({
      ...goal,
      category_type: "trzyPoziomowe",
    }));
    const formattedOgolne = celeOgolne.map((goal) => ({
      ...goal,
      category_type: "ogolne",
    }));

    const allArchivedGoals = [
      ...formattedCzasowe,
      ...formattedTrzyPoziomowe,
      ...formattedOgolne,
    ].sort((a, b) => new Date(b.archived_at) - new Date(a.archived_at));

    return NextResponse.json(allArchivedGoals);
  } catch (error) {
    console.error("Błąd pobierania archiwum:", error);
    return NextResponse.json({ error: "Błąd pobierania" }, { status: 500 });
  }
}
