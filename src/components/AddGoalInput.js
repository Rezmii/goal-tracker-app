"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";

const AddGoalInput = ({ type, isEditing, setIsEditing }) => {
  const { addGoal } = useGoals();
  const [goalText, setGoalText] = useState("");

  const handleSubmit = () => {
    if (!goalText.trim()) return;

    addGoal({
      text: capitalizeFirstLetter(goalText),
      date_finish: new Date().toISOString(),
      type,
    });
    setGoalText("");
    setIsEditing(false);
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            autoFocus
          />
          <HStack mr="auto" spaceX={1}>
            <Button size="sm" colorPallete="green" onClick={handleSubmit}>
              ✔ Dodaj cel
            </Button>
            <Button
              size="sm"
              colorPallete="gray"
              onClick={() => {
                setIsEditing(false);
                setGoalText("");
              }}
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
