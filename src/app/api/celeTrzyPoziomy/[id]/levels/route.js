import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelTrzyPoziomy from "@/models/CelTrzyPoziomy";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { level, text, done } = await req.json();

    await connectToDatabase();

    const goal = await CelTrzyPoziomy.findById(id);
    if (!goal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    const levelToUpdate = goal.levels.find((l) => l.level === level);
    if (!levelToUpdate) {
      return NextResponse.json(
        { error: "Poziom nie istnieje" },
        { status: 404 }
      );
    }

    if (text !== undefined) {
      levelToUpdate.text = text;
    }
    if (done !== undefined) {
      levelToUpdate.done = done;
    }

    await goal.save();
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Błąd aktualizacji poziomu:", error);
    return NextResponse.json(
      { error: "Błąd aktualizacji poziomu" },
      { status: 500 }
    );
  }
}
