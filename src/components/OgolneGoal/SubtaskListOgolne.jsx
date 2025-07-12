// src/components/OgolneGoal/SubtaskListOgolne.jsx

"use client";

import { VStack, HStack, Input, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Subtask from "../Subtask";
import { useOgolneGoals } from "@/context/OgolneGoalsContext";

const SubtaskListOgolne = ({ goal, showForm, onSubtaskAdded }) => {
  const [newSubtask, setNewSubtask] = useState("");

  const { addSubtask, deleteSubtask, toggleSubtaskDone } = useOgolneGoals();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    addSubtask(goal._id, newSubtask.trim());
    setNewSubtask("");
    if (onSubtaskAdded) onSubtaskAdded();
  };

  return (
    <VStack align="start" pl={8} spacing={1}>
      {goal.subtasks?.map((subtask, idx) => (
        <Subtask
          key={idx}
          subtask={subtask}
          onToggleDone={() => toggleSubtaskDone(goal._id, idx, subtask.done)}
          onDelete={() => deleteSubtask(goal._id, idx)}
        />
      ))}
      {showForm && (
        <HStack as="form" onSubmit={handleAdd} w="full" mt={2}>
          <Input
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            size="xs"
            placeholder="Dodaj podpunkt..."
            variant="filled"
            bg="gray.800"
            autoFocus
          />
          <Button
            size="xs"
            colorScheme="red"
            type="submit"
            leftIcon={<Icon as={FaPlus} />}
          >
            Dodaj
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default SubtaskListOgolne;
