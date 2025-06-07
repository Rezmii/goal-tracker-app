// src/components/SubtasksList.jsx

"use client";

import { VStack, HStack, Input, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Subtask from "./Subtask";
import { useGoals } from "@/context/GoalsContext";

const SubtaskList = ({ goal }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const { addSubtask } = useGoals();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    addSubtask(goal._id, newSubtask.trim());
    setNewSubtask("");
  };

  return (
    // ZMIANA: Lepsze wcięcia i odstępy
    <VStack align="start" mt={4} pl={8} spacing={1}>
      {goal.subtasks?.map((subtask, idx) => (
        <Subtask key={idx} subtask={subtask} index={idx} goalId={goal._id} />
      ))}
      {/* ZMIANA: Użycie `as="form"` dla lepszej semantyki */}
      <HStack as="form" onSubmit={handleAdd} w="full" mt={2}>
        <Input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          size="xs"
          placeholder="Dodaj podpunkt..."
          // ZMIANA: Dopasowanie inputu do reszty designu
          variant="filled"
          bg="gray.800"
          borderColor="gray.700"
          _hover={{ bg: "gray.800" }}
          focusBorderColor="red.500"
        />
        <Button
          size="xs"
          // ZMIANA: Użycie czerwonego akcentu
          colorScheme="red"
          onClick={handleAdd}
          leftIcon={<Icon as={FaPlus} />}
          type="submit"
        >
          Dodaj
        </Button>
      </HStack>
    </VStack>
  );
};

export default SubtaskList;
