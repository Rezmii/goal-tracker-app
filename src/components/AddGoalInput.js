"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";

const AddGoalInput = ({ type }) => {
  const { addGoal } = useGoals();
  const [isEditing, setIsEditing] = useState(false);
  const [goalText, setGoalText] = useState("");

  const handleSubmit = () => {
    if (!goalText.trim()) return;

    addGoal({ text: goalText, date_finish: new Date().toISOString(), type });
    setGoalText("");
    setIsEditing(false);
  };

  return (
    <Box mt={2}>
      {isEditing ? (
        <VStack spacing={2}>
          <Input
            size="sm"
            placeholder="Wpisz nowy cel..."
            _placeholder={{ color: "gray.300" }}
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
          />
          <HStack mr="auto" spaceX={1}>
            <Button size="sm" colorPallete="green" onClick={handleSubmit}>
              ✔ Dodaj cel
            </Button>
            <Button
              size="sm"
              colorPallete="gray"
              onClick={() => setIsEditing(false)}
            >
              ✖
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Button size="sm" onClick={() => setIsEditing(true)}>
          Dodaj cel
        </Button>
      )}
    </Box>
  );
};

export default AddGoalInput;
