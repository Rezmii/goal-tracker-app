"use client";

import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const EditableGoalText = ({ initialText, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleSave = () => {
    if (editedText.trim()) {
      onSave(editedText);
    }
  };

  return (
    <Flex flex="1" align="center" as="span">
      <Input
        size="sm"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") onCancel();
        }}
      />
      <Button size="xs" colorScheme="green" ml={2} onClick={handleSave}>
        <FaCheck />
      </Button>
      <Button size="xs" colorScheme="gray" ml={1} onClick={onCancel}>
        <FaTimes />
      </Button>
    </Flex>
  );
};

export default EditableGoalText;
