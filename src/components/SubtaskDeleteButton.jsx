"use client";

import { Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const SubtaskDeleteButton = ({ isVisible, onDelete }) => {
  return (
    <Button
      size="xs"
      variant="ghost"
      aria-label="Usuń podpunkt"
      color="gray.500"
      opacity={isVisible ? 1 : 0}
      transition="opacity 0.2s ease-in-out"
      _hover={{ bg: "gray.700", color: "red.400" }}
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <FaTrash />
    </Button>
  );
};

export default SubtaskDeleteButton;
