import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelCzasowy from "@/models/CelCzasowy";

await connectToDatabase();

export async function GET() {
  try {
    const cele = await CelCzasowy.find({}).sort({ type: 1, order: 1 }); // 🔹 Sortowanie po typie i kolejności
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
    const nowyCel = new CelCzasowy(body);
    await nowyCel.save();
    return NextResponse.json(nowyCel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Błąd dodawania celu" }, { status: 500 });
  }
}
