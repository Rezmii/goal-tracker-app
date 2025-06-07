// src/components/Subtask.jsx

"use client";

// ZMIANA: Importujemy useState
import { useState } from "react";
import { Text, HStack, Button, Box } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import SubtaskDeleteButton from "./SubtaskDeleteButton";

const Subtask = ({ subtask, goalId, index }) => {
  const { toggleSubtaskDone } = useGoals();
  // ZMIANA: Dodajemy stan do śledzenia najechania myszką
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      px={2}
      py={1}
      borderRadius="md"
      _hover={{ bg: "whiteAlpha.100" }}
      // ZMIANA: Używamy zdarzeń onMouseEnter/onMouseLeave do zmiany stanu
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HStack spacing={3}>
        <Button
          aria-label="Zaznacz jako ukończone"
          size="xs"
          variant="ghost"
          onClick={() => toggleSubtaskDone(goalId, index, subtask.done)}
          data-dndkit-no-drag
          color={subtask.done ? "green.300" : "gray.400"}
          _hover={{
            bg: "whiteAlpha.200",
          }}
        >
          {subtask.done ? <FaRegCheckCircle /> : <FaRegCircle />}
        </Button>

        <Text
          fontSize="sm"
          color={subtask.done ? "gray.500" : "gray.200"}
          textDecoration={subtask.done ? "line-through" : "none"}
        >
          {subtask.text}
        </Text>
      </HStack>

      {/* ZMIANA: Przekazujemy stan jako prop `isVisible` */}
      <SubtaskDeleteButton
        goalId={goalId}
        index={index}
        isVisible={isHovered}
      />
    </HStack>
  );
};

export default Subtask;
