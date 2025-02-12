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
      const response = await fetch("/api/celeCzasowe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error("Błąd dodawania celu");
      }

      const addedGoal = await response.json();
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (error) {
      console.error("Błąd dodawania celu:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider value={{ goals, loading, addGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);
