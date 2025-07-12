import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelOgolny from "@/models/CelOgolny";

await connectToDatabase();

export async function GET() {
  try {
    const cele = await CelOgolny.find({}).sort({ category: 1, order: 1 });
    return NextResponse.json(cele);
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd pobierania danych" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const nowyCel = new CelOgolny(body);
    await nowyCel.save();
    return NextResponse.json(nowyCel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Błąd dodawania celu" }, { status: 500 });
  }
}
