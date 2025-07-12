import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelOgolny from "@/models/CelOgolny";

export async function POST(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { text } = await req.json();
  const goal = await CelOgolny.findById(id);
  goal.subtasks.push({ text });
  await goal.save();
  return NextResponse.json(goal);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { index } = await req.json();
  const goal = await CelOgolny.findById(id);
  goal.subtasks.splice(index, 1);
  await goal.save();
  return NextResponse.json({ success: true });
}

export async function PATCH(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const { index, done } = await req.json();
  const goal = await CelOgolny.findById(id);
  goal.subtasks[index].done = done;
  await goal.save();
  return NextResponse.json({ success: true });
}
