import React, { createContext, useState } from "react";
import TimeGoal from "../models/TimeGoal";

// Tworzymy kontekst
export const TimeGoalsContext = createContext();

// Komponent dostawcy kontekstu
export const TimeGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([
    new TimeGoal(
      "Ukończyć prezentację",
      "Prezentacja na piątek",
      "2024-09-29",
      "ten tydzień",
      true
    ),
    new TimeGoal(
      "Przeczytać książkę",
      "50 stron książki",
      "2024-09-25",
      "ten tydzień"
    ),
    new TimeGoal(
      "Zacząć kurs online",
      "Kurs programowania",
      "2024-10-15",
      "ten miesiąc"
    ),
    new TimeGoal(
      "Zaoszczędzić 1000 PLN",
      "Oszczędności na lokacie",
      "2024-12-31",
      "3 miesiące"
    ),
    new TimeGoal(
      "Zaoszczędzić 1002 PLN",
      "Oszczędności na lokacie",
      "2024-12-31",
      "rok"
    ),
    new TimeGoal(
      "Zaoszczędzić 1001 PLN",
      "Oszczędności na lokacie",
      "2024-12-31",
      "3 lata"
    ),
  ]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const toggleGoalDone = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const updateGoal = (id, updatedGoal) => {
    setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)));
  };

  return (
    <TimeGoalsContext.Provider
      value={{ goals, addGoal, toggleGoalDone, deleteGoal, updateGoal }}
    >
      {children}
    </TimeGoalsContext.Provider>
  );
};
