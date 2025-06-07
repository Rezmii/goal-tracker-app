// src/components/EditableGoalText.jsx

"use client";

import { useState } from "react";
// ZMIANA: Usunięto IconButton, wracamy do Button
import { HStack, Input, Button } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const EditableGoalText = ({ initialText, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleSave = () => {
    if (editedText.trim()) {
      onSave(editedText.trim());
    }
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <HStack flex="1" as="span" spacing={2}>
      <Input
        size="sm"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        autoFocus
        onKeyDown={handleKeyDown}
        bg="gray.900"
        borderColor="gray.600"
        focusBorderColor="red.500"
        _hover={{ borderColor: "gray.500" }}
      />
      {/* ZMIANA: Użycie standardowych przycisków zamiast IconButton */}
      <Button
        size="sm"
        aria-label="Zapisz zmiany"
        colorScheme="red"
        onClick={handleSave}
      >
        <FaCheck />
      </Button>
      <Button
        size="sm"
        aria-label="Anuluj edycję"
        variant="ghost"
        onClick={onCancel}
      >
        <FaTimes />
      </Button>
    </HStack>
  );
};

export default EditableGoalText;
