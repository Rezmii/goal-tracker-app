import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import CelOgolny from "@/models/CelOgolny";
import CelTrzyPoziomy from "@/models/CelTrzyPoziomy";
import CelCzasowy from "@/models/CelCzasowy";

export async function GET() {
  try {
    await connectToDatabase();

    const [
      importantCategories,
      importantThreeLevelGoals,
      thisWeekAndMonthGoals,
      otherImportantTimedGoals,
    ] = await Promise.all([
      Category.find({ important: true }).lean(),

      CelTrzyPoziomy.find({ important: true }).lean(),

      CelCzasowy.find({ type: { $in: ["ten tydzień", "ten miesiąc"] } }).lean(),

      CelCzasowy.find({
        type: { $nin: ["ten tydzień", "ten miesiąc"] },
        important: true,
      }).lean(),
    ]);

    const allOgolneGoals = await CelOgolny.find({}).lean();

    const staticTimedCards = [
      {
        id: "karta-ten-tydzien",
        type: "czasowe_karta",
        title: "ten tydzień",

        goals: thisWeekAndMonthGoals.filter((g) => g.type === "ten tydzień"),
      },
      {
        id: "karta-ten-miesiac",
        type: "czasowe_karta",
        title: "ten miesiąc",
        goals: thisWeekAndMonthGoals.filter((g) => g.type === "ten miesiąc"),
      },
    ];

    const ogolneCards = importantCategories.map((category) => ({
      id: category._id,
      type: "ogolne_karta",
      category: category,

      goals: allOgolneGoals.filter((g) => g.category === category.name),
    }));

    const threeLevelCards = importantThreeLevelGoals.map((goal) => ({
      id: goal._id,
      type: "trzyPoziomowe_karta",
      goal: goal,
    }));

    const timedGoalItems = otherImportantTimedGoals.map((goal) => ({
      id: goal._id,
      type: "czasowy_cel",
      goal: goal,
    }));

    const dashboardItems = [
      ...staticTimedCards,
      ...ogolneCards,
      ...threeLevelCards,
      ...timedGoalItems,
    ];

    return NextResponse.json(dashboardItems);
  } catch (error) {
    console.error("Błąd pobierania danych dla strony 'Wszystkie':", error);
    return NextResponse.json(
      { error: "Błąd po stronie serwera" },
      { status: 500 }
    );
  }
}
