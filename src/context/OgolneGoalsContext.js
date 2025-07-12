"use client";

import { createContext, useContext, useEffect, useState } from "react";

const OgolneGoalsContext = createContext();

export const OgolneGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [goalsRes, categoriesRes] = await Promise.all([
        fetch("/api/celeOgolne"),
        fetch("/api/ogolneKategorie"),
      ]);
      const goalsData = await goalsRes.json();
      const categoriesData = await categoriesRes.json();
      setGoals(goalsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const response = await fetch("/api/ogolneKategorie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      console.error("Błąd dodawania kategorii:", error);
    }
  };

  const reorderCategories = async (reorderedCategories) => {
    setCategories(reorderedCategories);
    try {
      await fetch("/api/ogolneKategorie/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderedCategories: reorderedCategories.map((c) => c.name),
        }),
      });
    } catch (error) {
      console.error("Błąd zapisu kolejności:", error);
      fetchData();
    }
  };

  const deleteCategory = async (categoryId, categoryName) => {
    try {
      await fetch(`/api/ogolneKategorie/${categoryId}`, { method: "DELETE" });

      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));

      setGoals((prev) => prev.filter((goal) => goal.category !== categoryName));
    } catch (error) {
      console.error("Błąd usuwania kategorii:", error);
    }
  };

  const toggleCategoryImportant = async (categoryId, currentStatus) => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id === categoryId ? { ...c, important: !currentStatus } : c
      )
    );
    try {
      await fetch(`/api/ogolneKategorie/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ important: !currentStatus }),
      });
    } catch (error) {
      console.error("Błąd aktualizacji ważności kategorii:", error);
      fetchData();
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
      fetchData();
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
      fetchData();
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
      fetchData();
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
      fetchData();
    } catch (error) {
      console.error("Błąd oznaczania podpunktu:", error);
    }
  };

  const archiveGoal = async (goalId) => {
    try {
      await fetch(`/api/celeOgolne/${goalId}/archive`, { method: "POST" });
      setGoals((prev) => prev.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Błąd archiwizacji celu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OgolneGoalsContext.Provider
      value={{
        goals,
        categories,
        loading,
        addGoal,
        addCategory,
        reorderCategories,
        deleteCategory,
        toggleCategoryImportant,
        fetchData,
        deleteGoal,
        updateGoalProperty,
        updateGoalsOrder,
        addSubtask,
        deleteSubtask,
        toggleSubtaskDone,
        archiveGoal,
      }}
    >
      {children}
    </OgolneGoalsContext.Provider>
  );
};

export const useOgolneGoals = () => useContext(OgolneGoalsContext);
