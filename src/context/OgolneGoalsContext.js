"use client";

import { createContext, useContext, useEffect, useState } from "react";

const OgolneGoalsContext = createContext();

export const OgolneGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/celeOgolne");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Błąd pobierania celów ogólnych:", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch("/api/celeOgolne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal),
      });
      const addedGoal = await response.json();
      setGoals((prev) => [...prev, addedGoal]);
    } catch (error) {
      console.error("Błąd dodawania celu:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await fetch(`/api/celeOgolne/${goalId}`, { method: "DELETE" });
      setGoals((prev) => prev.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Błąd usuwania celu:", error);
    }
  };

  const updateGoalProperty = async (goalId, propertyUpdate) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === goalId ? { ...g, ...propertyUpdate } : g))
    );
    try {
      await fetch(`/api/celeOgolne/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyUpdate),
      });
    } catch (error) {
      console.error("Błąd aktualizacji celu:", error);
      fetchGoals();
    }
  };

  const updateGoalsOrder = async (category, orderedGoals) => {
    const otherGoals = goals.filter((g) => g.category !== category);
    setGoals([...otherGoals, ...orderedGoals]);
    try {
      await fetch("/api/celeOgolne/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, orderedGoals }),
      });
    } catch (error) {
      console.error("Błąd aktualizacji kolejności:", error);
      fetchGoals();
    }
  };

  const addSubtask = async (goalId, subtaskText) => {
    try {
      const response = await fetch(`/api/celeOgolne/${goalId}/subtasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: subtaskText }),
      });
      const updatedGoal = await response.json();
      setGoals((prev) => prev.map((g) => (g._id === goalId ? updatedGoal : g)));
    } catch (error) {
      console.error("Błąd dodawania podpunktu:", error);
    }
  };

  const deleteSubtask = async (goalId, subtaskIndex) => {
    try {
      await fetch(`/api/celeOgolne/${goalId}/subtasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: subtaskIndex }),
      });
      fetchGoals();
    } catch (error) {
      console.error("Błąd usuwania podpunktu:", error);
    }
  };

  const toggleSubtaskDone = async (goalId, subtaskIndex, currentStatus) => {
    try {
      await fetch(`/api/celeOgolne/${goalId}/subtasks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: subtaskIndex, done: !currentStatus }),
      });
      fetchGoals();
    } catch (error) {
      console.error("Błąd oznaczania podpunktu:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <OgolneGoalsContext.Provider
      value={{
        goals,
        loading,
        addGoal,
        fetchGoals,
        deleteGoal,
        updateGoalProperty,
        updateGoalsOrder,
        addSubtask,
        deleteSubtask,
        toggleSubtaskDone,
      }}
    >
      {children}
    </OgolneGoalsContext.Provider>
  );
};

export const useOgolneGoals = () => useContext(OgolneGoalsContext);
