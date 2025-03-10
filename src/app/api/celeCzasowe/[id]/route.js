import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowy from "@/models/CelCzasowy";
import CelCzasowyArchiwum from "@/models/CelCzasowyArchiwum";

export async function DELETE(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    await connectToDatabase();

    const deletedGoal = await CelCzasowy.findByIdAndDelete(id);

    if (!deletedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return NextResponse.json({ error: "Błąd usuwania" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    const { text, important, done } = await req.json();

    await connectToDatabase();

    const updateFields = {};
    if (text !== undefined) updateFields.text = text;
    if (important !== undefined) updateFields.important = important;
    if (done !== undefined) updateFields.done = done;

    const updatedGoal = await CelCzasowy.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedGoal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error("Błąd aktualizacji celu:", error);
    return NextResponse.json({ error: "Błąd aktualizacji" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    await connectToDatabase();

    const goal = await CelCzasowy.findById(id);
    if (!goal) {
      return NextResponse.json({ error: "Cel nie istnieje" }, { status: 404 });
    }

    const archivedGoal = new CelCzasowyArchiwum({
      text: goal.text,
      done: goal.done,
      important: goal.important,
      date_added: goal.date_added,
      date_finish: goal.date_finish,
      type: goal.type,
    });
    await archivedGoal.save();

    await CelCzasowy.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd archiwizacji:", error);
    return NextResponse.json({ error: "Błąd archiwizacji" }, { status: 500 });
  }
}
