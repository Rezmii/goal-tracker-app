import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowy from "@/models/CelCzasowy";

export async function POST(req, { params }) {
  const { id } = await params;
  const { text } = await req.json();

  await connectToDatabase();

  const goal = await CelCzasowy.findById(id);
  if (!goal) {
    return NextResponse.json({ error: "Cel nie znaleziony" }, { status: 404 });
  }
  console.log("Goal subtasks type:", typeof goal.subtasks, goal.subtasks);

  goal.subtasks.push({ text });
  await goal.save();

  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const { index } = await req.json();

  await connectToDatabase();
  const goal = await CelCzasowy.findById(id);
  if (!goal) {
    return NextResponse.json({ error: "Cel nie znaleziony" }, { status: 404 });
  }

  goal.subtasks.splice(index, 1); // usuń podpunkt
  await goal.save();

  return NextResponse.json({ success: true });
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { index, done } = await req.json();

  await connectToDatabase();

  const goal = await CelCzasowy.findById(id);
  if (!goal) {
    return NextResponse.json({ error: "Cel nie znaleziony" }, { status: 404 });
  }

  if (!goal.subtasks[index]) {
    return NextResponse.json(
      { error: "Podpunkt nie znaleziony" },
      { status: 404 }
    );
  }

  goal.subtasks[index].done = done;
  await goal.save();

  return NextResponse.json({ success: true });
}
