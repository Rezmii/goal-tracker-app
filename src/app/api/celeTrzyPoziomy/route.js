import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CelTrzyPoziomy from "@/models/CelTrzyPoziomy";

await connectToDatabase();

export async function GET() {
  try {
    const cele = await CelTrzyPoziomy.find({}).sort({ order: 1 });
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

    const nowyCel = new CelTrzyPoziomy(body);

    await nowyCel.save();
    return NextResponse.json(nowyCel, { status: 201 });
  } catch (error) {
    console.error("Błąd dodawania celu 3-poziomowego:", error);
    return NextResponse.json({ error: "Błąd dodawania celu" }, { status: 500 });
  }
}
