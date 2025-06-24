// src/components/SubtasksList.jsx

"use client";

import { VStack, HStack, Input, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Subtask from "./Subtask";
import { useGoals } from "@/context/GoalsContext";

const SubtaskList = ({ goal, showForm, onSubtaskAdded }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const { addSubtask } = useGoals();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    addSubtask(goal._id, newSubtask.trim());
    setNewSubtask("");
    if (onSubtaskAdded) {
      onSubtaskAdded();
    }
  };

  return (
    <VStack align="start" pl={3}>
      {goal.subtasks?.map((subtask, idx) => (
        <Subtask key={idx} subtask={subtask} index={idx} goalId={goal._id} />
      ))}

      {showForm && (
        <HStack as="form" onSubmit={handleAdd} w="full" mt={2}>
          <Input
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            size="xs"
            placeholder="Dodaj podpunkt..."
            variant="filled"
            bg="gray.800"
            borderColor="gray.700"
            _hover={{ bg: "gray.800" }}
            focusBorderColor="red.500"
            autoFocus
          />
          <Button
            size="xs"
            colorScheme="red"
            onClick={handleAdd}
            leftIcon={<Icon as={FaPlus} />}
            type="submit"
          >
            Dodaj
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default SubtaskList;
