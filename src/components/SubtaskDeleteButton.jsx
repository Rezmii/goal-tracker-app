"use client";

import { Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useGoals } from "@/context/GoalsContext";

const SubtaskDeleteButton = ({ goalId, index }) => {
  const { deleteSubtask } = useGoals();

  return (
    <Button
      size="xs"
      variant="ghost"
      colorScheme="red"
      onClick={() => deleteSubtask(goalId, index)}
      _hover={{ bg: "red.800", color: "white" }}
    >
      <FaTrash />
    </Button>
  );
};

export default SubtaskDeleteButton;
