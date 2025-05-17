"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ArchiveGoalsContext = createContext();

export const ArchiveGoalsProvider = ({ children }) => {
  const [archiveGoals, setArchiveGoals] = useState([]);
  const [loadingArchive, setLoadingArchive] = useState(true);

  const fetchArchiveGoals = async () => {
    setLoadingArchive(true);
    try {
      const res = await fetch("/api/archiwum");
      const data = await res.json();
      setArchiveGoals(data);
    } catch (error) {
      console.error("Błąd pobierania archiwum:", error);
    } finally {
      setLoadingArchive(false);
    }
  };

  useEffect(() => {
    fetchArchiveGoals();
  }, []);

  return (
    <ArchiveGoalsContext.Provider
      value={{ archiveGoals, loadingArchive, fetchArchiveGoals }}
    >
      {children}
    </ArchiveGoalsContext.Provider>
  );
};

export const useArchiveGoals = () => useContext(ArchiveGoalsContext);
