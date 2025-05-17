"use client";

import { VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Subtask from "./Subtask";
import { useGoals } from "@/context/GoalsContext";

const SubtaskList = ({ goal }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const { addSubtask } = useGoals();

  const handleAdd = () => {
    if (!newSubtask.trim()) return;
    addSubtask(goal._id, newSubtask.trim());
    setNewSubtask("");
  };

  return (
    <VStack align="start" mt={3} spacing={2}>
      {goal.subtasks?.map((subtask, idx) => (
        <Subtask key={idx} subtask={subtask} index={idx} goalId={goal._id} />
      ))}
      <HStack>
        <Input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          size="xs"
          placeholder="Dodaj podpunkt..."
        />
        <Button
          size="xs"
          colorScheme="teal"
          onClick={handleAdd}
          leftIcon={<FaPlus />}
        >
          Dodaj
        </Button>
      </HStack>
    </VStack>
  );
};

export default SubtaskList;
