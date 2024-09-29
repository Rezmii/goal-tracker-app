const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware do parsowania JSON

app.use(express.json());
app.use(cors());

// Połączenie z MongoDB
mongoose.connect("mongodb://localhost/goalsApp");

// Schema dla TimeGoal
const timeGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  timePeriod: {
    type: String,
    enum: ["ten tydzień", "ten miesiąc", "3 miesiące", "rok", "3 lata"],
    required: true,
  },
});

// Model dla TimeGoal
const TimeGoal = mongoose.model("TimeGoal", timeGoalSchema);

// Funkcja do dodawania przykładowych celów
const seedDatabase = async () => {
  const exampleGoals = [
    {
      title: "Ukończyć prezentację",
      description: "Prezentacja na piątek",
      endDate: "2024-09-29",
      timePeriod: "ten tydzień",
      done: true,
    },
    {
      title: "Przeczytać książkę",
      description: "50 stron książki",
      endDate: "2024-09-25",
      timePeriod: "ten tydzień",
      done: false,
    },
    {
      title: "Zacząć kurs online",
      description: "Kurs programowania",
      endDate: "2024-10-15",
      timePeriod: "ten miesiąc",
      done: false,
    },
    {
      title: "Zaoszczędzić 1000 PLN",
      description: "Oszczędności na lokacie",
      endDate: "2024-12-31",
      timePeriod: "3 miesiące",
      done: false,
    },
    {
      title: "Zaoszczędzić 1002 PLN",
      description: "Oszczędności na lokacie",
      endDate: "2024-12-31",
      timePeriod: "rok",
      done: false,
    },
    {
      title: "Zaoszczędzić 1001 PLN",
      description: "Oszczędności na lokacie",
      endDate: "2024-12-31",
      timePeriod: "3 lata",
      done: false,
    },
  ];

  await TimeGoal.deleteMany(); // Usuwamy istniejące cele (jeśli chcesz zresetować)
  await TimeGoal.insertMany(exampleGoals); // Dodajemy przykładowe cele
};

// Wywołanie funkcji seedingowej
seedDatabase()
  .then(() => console.log("Przykładowe cele dodane do bazy danych."))
  .catch((err) => console.error("Błąd przy dodawaniu celów:", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

// Dodaj nowy TimeGoal
app.post("/timeGoals", async (req, res) => {
  try {
    const newTimeGoal = new TimeGoal(req.body);
    await newTimeGoal.save();
    res.status(201).send(newTimeGoal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Pobierz wszystkie TimeGoals
app.get("/timeGoals", async (req, res) => {
  const timeGoals = await TimeGoal.find();
  res.send(timeGoals);
});

// Usuń TimeGoal
app.delete("/timeGoals/:id", async (req, res) => {
  await TimeGoal.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Aktualizuj TimeGoal
app.put("/timeGoals/:id", async (req, res) => {
  try {
    const updatedGoal = await TimeGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updatedGoal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
