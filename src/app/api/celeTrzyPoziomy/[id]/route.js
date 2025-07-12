import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelTrzyPoziomy from "@/models/CelTrzyPoziomy";
import CelTrzyPoziomyArchiwum from "@/models/CelTrzyPoziomyArchiwum";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    const deletedGoal = await CelTrzyPoziomy.findByIdAndDelete(id);

    if (!deletedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Błąd usuwania celu" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { text, important, done } = await req.json();
    await connectToDatabase();

    const updateFields = {};
    if (text !== undefined) updateFields.text = text;
    if (important !== undefined) updateFields.important = important;
    if (done !== undefined) updateFields.done = done;

    const updatedGoal = await CelTrzyPoziomy.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }
    return NextResponse.json(updatedGoal);
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd aktualizacji celu" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();

    const goalToArchive = await CelTrzyPoziomy.findById(id);
    if (!goalToArchive) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    const archivedGoal = new CelTrzyPoziomyArchiwum({
      text: goalToArchive.text,
      done: goalToArchive.done,
      important: goalToArchive.important,
      levels: goalToArchive.levels,
      date_added: goalToArchive.date_added,
      date_finish: goalToArchive.date_finish,
    });
    await archivedGoal.save();

    await CelTrzyPoziomy.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd archiwizacji celu 3-poziomowego:", error);
    return NextResponse.json({ error: "Błąd archiwizacji" }, { status: 500 });
  }
}
