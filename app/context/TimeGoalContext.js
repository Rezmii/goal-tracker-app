import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

// Tworzymy kontekst
export const TimeGoalsContext = createContext();

const SERVER_URL = "http://192.168.1.116:3000/timegoals";

// Komponent dostawcy kontekstu
export const TimeGoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const { user } = useContext(AuthContext);

  const getAuthToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const fetchGoals = async () => {
    try {
      setGoals([]);
      const token = await getAuthToken(); // Pobieramy token asynchronicznie
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await axios.get(SERVER_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
        },
      });
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
    if (user) {
      fetchGoals(); // Wywołaj fetchGoals tylko jeśli użytkownik jest zalogowany
    } else {
      setGoals([]); // Opcjonalne: Wyczyść cele, gdy użytkownik jest wylogowany
    }
  }, [user]); // Dodaj user jako zależność

  const addGoal = async (goal) => {
    try {
      const token = await getAuthToken(); // Pobieramy token asynchronicznie
      const response = await axios.post(SERVER_URL, goal, {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
        },
      });
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
      const token = await getAuthToken(); // Pobieramy token asynchronicznie
      await axios.delete(`${SERVER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
        },
      });
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Błąd przy usuwaniu celu:", error);
    }
  };

  // Funkcja do aktualizacji celu
  const updateGoal = async (id, updatedGoal) => {
    try {
      const token = await getAuthToken();
      await axios.put(`${SERVER_URL}/${id}`, updatedGoal, {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
        },
      });
      setGoals(goals.map((goal) => (goal._id === id ? updatedGoal : goal)));
    } catch (error) {
      console.error("Błąd przy aktualizacji celu:", error);
    }
  };

  return (
    <TimeGoalsContext.Provider
      value={{
        goals,
        setGoals,
        addGoal,
        toggleGoalDone,
        deleteGoal,
        updateGoal,
      }}
    >
      {children}
    </TimeGoalsContext.Provider>
  );
};
