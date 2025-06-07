// src/components/SubtaskDeleteButton.jsx

"use client";

import { Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useGoals } from "@/context/GoalsContext";

// ZMIANA: Akceptujemy nowy prop `isVisible`
const SubtaskDeleteButton = ({ goalId, index, isVisible }) => {
  const { deleteSubtask } = useGoals();

  return (
    <Button
      size="xs"
      variant="ghost"
      aria-label="Usuń podpunkt"
      color="gray.400"
      transition="opacity 0.2s ease-in-out"
      opacity={isVisible ? 1 : 0}
      _hover={{ bg: "gray.500", color: "red.400" }}
      onClick={(e) => {
        e.stopPropagation();
        deleteSubtask(goalId, index);
      }}
    >
      <FaTrash />
    </Button>
  );
};

export default SubtaskDeleteButton;
