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
      console.log(data);
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

  const toggleDone = async (goalId, newDoneState) => {
    try {
      const response = await fetch(`/api/celeCzasowe/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !newDoneState }),
      });

      if (!response.ok) throw new Error("Błąd aktualizacji celu");

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === goalId ? { ...goal, done: !newDoneState } : goal
        )
      );
    } catch (error) {
      console.error("Błąd oznaczania celu jako ukończony:", error);
    }
  };

  const updateGoalText = async (goalId, newText) => {
    try {
      const response = await fetch(`/api/celeCzasowe/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) throw new Error("Błąd aktualizacji celu");

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === goalId ? { ...goal, text: newText } : goal
        )
      );
    } catch (error) {
      console.error("Błąd edytowania celu:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const archiveGoal = async (goal_id) => {
    try {
      const res = await fetch(`/api/celeCzasowe/${goal_id}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Błąd archiwizacji celu");

      setGoals((prev) => prev.filter((goal) => goal._id !== goal_id)); // Usuń z aktualnej listy
    } catch (error) {
      console.error(error);
    }
  };

  const addSubtask = async (goalId, subtaskText) => {
    await fetch(`/api/celeCzasowe/${goalId}/subtasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: subtaskText }),
    });
    fetchGoals();
  };

  const deleteSubtask = async (goalId, subtaskIndex) => {
    try {
      await fetch(`/api/celeCzasowe/${goalId}/subtasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: subtaskIndex }),
      });
      fetchGoals();
    } catch (error) {
      console.error("Błąd usuwania subtaska:", error);
    }
  };

  const toggleSubtaskDone = async (goalId, subtaskIndex, currentStatus) => {
    await fetch(`/api/celeCzasowe/${goalId}/subtasks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index: subtaskIndex, done: !currentStatus }),
    });
    fetchGoals();
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        loading,
        addGoal,
        updateGoalsOrder,
        deleteGoal,
        toggleImportant,
        toggleDone,
        updateGoalText,
        archiveGoal,
        addSubtask,
        toggleSubtaskDone,
        deleteSubtask,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);
