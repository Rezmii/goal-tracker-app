"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThreeLevelGoalsContext = createContext();

export const ThreeLevelGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/celeTrzyPoziomy");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Błąd pobierania celów 3-poziomowych:", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (newGoalData) => {
    try {
      const response = await fetch("/api/celeTrzyPoziomy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoalData),
      });
      if (!response.ok) throw new Error("Błąd dodawania celu");

      const addedGoal = await response.json();
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (error) {
      console.error("Błąd dodawania celu:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await fetch(`/api/celeTrzyPoziomy/${goalId}`, { method: "DELETE" });
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Błąd usuwania celu:", error);
    }
  };

  const updateGoalsOrder = async (orderedGoals) => {
    setGoals(orderedGoals);
    try {
      await fetch("/api/celeTrzyPoziomy/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedGoals }),
      });
    } catch (error) {
      console.error("Błąd aktualizacji kolejności:", error);
      fetchGoals();
    }
  };

  const updateGoal = async (goalId, updateData) => {
    try {
      const response = await fetch(`/api/celeTrzyPoziomy/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error("Błąd aktualizacji celu");
      fetchGoals();
    } catch (error) {
      console.error("Błąd aktualizacji celu:", error);
    }
  };

  // --- Operacje na poziomach ---

  const updateLevel = async (goalId, levelData) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal._id === goalId) {
          const updatedLevels = goal.levels.map((l) =>
            l.level === levelData.level ? { ...l, ...levelData } : l
          );
          return { ...goal, levels: updatedLevels };
        }
        return goal;
      })
    );

    try {
      const response = await fetch(`/api/celeTrzyPoziomy/${goalId}/levels`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(levelData),
      });
      if (!response.ok) throw new Error("Błąd aktualizacji poziomu");
    } catch (error) {
      console.error("Błąd aktualizacji poziomu:", error);
      fetchGoals();
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const archiveGoal = async (goalId) => {
    try {
      const response = await fetch(`/api/celeTrzyPoziomy/${goalId}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Błąd archiwizacji celu");

      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Błąd archiwizacji celu:", error);
    }
  };

  return (
    <ThreeLevelGoalsContext.Provider
      value={{
        goals,
        setGoals,
        loading,
        addGoal,
        deleteGoal,
        updateGoal,
        updateGoalsOrder,
        updateLevel,
        archiveGoal,
      }}
    >
      {children}
    </ThreeLevelGoalsContext.Provider>
  );
};

export const useThreeLevelGoals = () => useContext(ThreeLevelGoalsContext);
