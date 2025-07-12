// src/components/Subtask.jsx

"use client";

import { useState } from "react";
import { Text, HStack, Button } from "@chakra-ui/react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import SubtaskDeleteButton from "./SubtaskDeleteButton";

const Subtask = ({ subtask, onToggleDone, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      px={2}
      py={1}
      borderRadius="md"
      _hover={{ bg: "whiteAlpha.100" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HStack spacing={3}>
        <Button
          aria-label="Zaznacz jako ukończone"
          size="xs"
          variant="ghost"
          data-dndkit-no-drag
          onClick={onToggleDone}
          color={subtask.done ? "red.400" : "gray.400"}
          _hover={{ bg: "gray.500", color: "red.300" }}
        >
          {subtask.done ? <FaRegCheckCircle /> : <FaRegCircle />}
        </Button>

        <Text
          fontSize="sm"
          color={subtask.done ? "red.400" : "gray.100"}
          textDecoration={subtask.done ? "line-through" : "none"}
        >
          {subtask.text}
        </Text>
      </HStack>

      <SubtaskDeleteButton isVisible={isHovered} onDelete={onDelete} />
    </HStack>
  );
};

export default Subtask;
