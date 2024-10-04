const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const User = require("./schema/User.js");
const TimeGoal = require("./schema/TimeGoal.js");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Middleware do parsowania JSON

app.use(express.json());
app.use(cors());

// Połączenie z MongoDB
mongoose.connect("mongodb://localhost/goalsApp");

// Funkcja do obliczania pozostałego czasu
const calculateRemainingTime = (
  timePeriod,
  startDate = new Date("2024-09-29")
) => {
  const now = new Date();
  let endDate;

  switch (timePeriod) {
    case "ten tydzień":
      // Ustawiamy datę końcową na koniec tygodnia (niedziela)
      endDate = new Date(startDate);
      const currentDayOfWeek = now.getDay(); // 0 (niedziela) - 6 (sobota)
      const daysUntilEndOfWeek = 6 - currentDayOfWeek;
      endDate.setDate(now.getDate() + daysUntilEndOfWeek);
      break;
    case "ten miesiąc":
      // Ustawiamy datę końcową na koniec miesiąca
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      break;
    case "3 miesiące":
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 3);
      break;
    case "rok":
      endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1);
      break;
    case "3 lata":
      endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 3);
      break;
    default:
      return "Nieznany okres czasu";
  }

  const timeDiff = endDate - now;

  if (timeDiff <= 0) {
    return "Czas minął";
  } else {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30); // Przyjmujemy miesiąc jako 30 dni
    const remainingDays = days % 30;

    if (months > 0) {
      return `${months} miesięcy i ${remainingDays} dni`;
    } else {
      return `${days} dni`;
    }
  }
};

// Middleware do weryfikacji tokenu JWT
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Brak autoryzacji, brak tokenu" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Nieprawidłowy token" });
  }
};

app.get("/", (req, res) => {
  res.send("API is running");
});

// Rejestracja użytkownika
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    const user = new User({ email, password });
    await user.save();

    // Tworzenie tokenu JWT
    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logowanie użytkownika
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
    }

    // Tworzenie tokenu JWT
    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Trasa do wyświetlania pozostałego czasu dla wszystkich okresów
app.get("/remaining-times", (req, res) => {
  const timePeriods = [
    "ten tydzień",
    "ten miesiąc",
    "3 miesiące",
    "rok",
    "3 lata",
  ];
  const remainingTimes = timePeriods.map((timePeriod) => {
    return {
      timePeriod,
      remainingTime: calculateRemainingTime(timePeriod),
    };
  });

  res.send(remainingTimes);
});

// Dodaj nowy TimeGoal
app.post("/timeGoals", auth, async (req, res) => {
  try {
    // Przypisujemy cel do zalogowanego użytkownika (req.user pochodzi z middleware 'auth')
    const newTimeGoal = new TimeGoal({
      ...req.body,
      user: req.user, // Dodajemy ID użytkownika do celu
    });

    await newTimeGoal.save();
    res.status(201).send(newTimeGoal);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Pobierz wszystkie TimeGoals
app.get("/timeGoals", auth, async (req, res) => {
  const timeGoals = await TimeGoal.find({ user: req.user });
  console.log("Użytkownik:", req.user, "Cele:", timeGoals);
  res.send(timeGoals);
});

// Usuń TimeGoal
app.delete("/timeGoals/:id", auth, async (req, res) => {
  const timeGoal = await TimeGoal.findOneAndDelete({
    _id: req.params.id,
    user: req.user, // Upewnij się, że użytkownik może usunąć tylko swoje cele
  });
  res.status(204).send();
});

// Aktualizuj TimeGoal
app.put("/timeGoals/:id", auth, async (req, res) => {
  try {
    const updatedGoal = await TimeGoal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user, // Upewnij się, że użytkownik aktualizuje tylko swoje cele
      },
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
