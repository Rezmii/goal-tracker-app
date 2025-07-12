import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelOgolny from "@/models/CelOgolny";
import CelOgolnyArchiwum from "@/models/CelOgolnyArchiwum";

await connectToDatabase();

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const goalToArchive = await CelOgolny.findById(id);

    if (!goalToArchive) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    const { _id, __v, ...goalData } = goalToArchive.toObject();
    const archivedGoal = new CelOgolnyArchiwum(goalData);

    await archivedGoal.save();
    await CelOgolny.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BŁĄD PODCZAS ARCHIWIZACJI:", error);
    return NextResponse.json(
      { error: "Błąd po stronie serwera podczas archiwizacji" },
      { status: 500 }
    );
  }
}
