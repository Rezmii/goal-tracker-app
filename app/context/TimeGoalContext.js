import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Tworzymy kontekst
export const TimeGoalsContext = createContext();

const SERVER_URL = "http://192.168.1.116:3000/timegoals";

// Komponent dostawcy kontekstu
export const TimeGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setGoals(response.data);
    } catch (error) {
      console.error("Błąd przy pobieraniu celów:", error.message);
      console.error("Kod błędu:", error.code);
      console.error(
        "Szczegóły:",
        error.response ? error.response.data : "Brak odpowiedzi"
      );
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Funkcja do dodawania nowego celu
  const addGoal = async (goal) => {
    try {
      const response = await axios.post(SERVER_URL, goal);
      setGoals([...goals, response.data]);
    } catch (error) {
      console.error("Błąd przy dodawaniu celu:", error);
    }
  };

  const toggleGoalDone = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal
      )
    );
  };

  // Funkcja do usuwania celu
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Błąd przy usuwaniu celu:", error);
    }
  };

  // Funkcja do aktualizacji celu
  const updateGoal = async (id, updatedGoal) => {
    try {
      await axios.put(`${SERVER_URL}/${id}`, updatedGoal);
      setGoals(goals.map((goal) => (goal._id === id ? updatedGoal : goal)));
    } catch (error) {
      console.error("Błąd przy aktualizacji celu:", error);
    }
  };

  return (
    <TimeGoalsContext.Provider
      value={{ goals, addGoal, toggleGoalDone, deleteGoal, updateGoal }}
    >
      {children}
    </TimeGoalsContext.Provider>
  );
};
