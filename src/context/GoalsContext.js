"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/celeCzasowe");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Błąd pobierania celów:", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      // Znajdź największy `order` w danej sekcji
      const maxOrder = goals
        .filter((goal) => goal.type === newGoal.type)
        .reduce((max, goal) => (goal.order > max ? goal.order : max), -1);

      const goalWithOrder = { ...newGoal, order: maxOrder + 1 };

      const response = await fetch("/api/celeCzasowe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalWithOrder),
      });

      if (!response.ok) {
        throw new Error("Błąd dodawania celu");
      }

      const addedGoal = await response.json();

      // Aktualizacja lokalnego stanu, aby nowy cel pojawił się w UI natychmiast
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (error) {
      console.error("Błąd dodawania celu:", error);
    }
  };

  const updateGoalsOrder = async (type, newOrder) => {
    setGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.type !== type).concat(newOrder)
    );

    try {
      await fetch("/api/celeCzasowe/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, orderedGoals: newOrder }),
      });
    } catch (error) {
      console.error("Błąd aktualizacji kolejności:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`/api/celeCzasowe/${goalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Błąd usuwania celu");
      }

      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Błąd usuwania celu:", error);
    }
  };

  const toggleImportant = async (goalId, currentImportant) => {
    try {
      const response = await fetch(`/api/celeCzasowe/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ important: !currentImportant }),
      });

      if (!response.ok) {
        throw new Error("Błąd aktualizacji celu");
      }

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === goalId ? { ...goal, important: !currentImportant } : goal
        )
      );
    } catch (error) {
      console.error("Błąd oznaczania jako ważne:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        loading,
        addGoal,
        updateGoalsOrder,
        deleteGoal,
        toggleImportant,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);
