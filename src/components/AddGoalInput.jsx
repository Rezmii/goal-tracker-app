"use client";

import { useState } from "react";
import { Box, Button, HStack, Input, VStack, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const AddGoalInput = ({ onAdd, isEditing, setIsEditing }) => {
  const [goalText, setGoalText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    onAdd(capitalizeFirstLetter(goalText));

    setGoalText("");
    setIsEditing(false);
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  return (
    <Box mt={4} w="100%">
      {isEditing ? (
        <VStack as="form" onSubmit={handleSubmit} spacing={3} w="100%">
          <Input
            size="sm"
            placeholder="Wpisz nowy cel..."
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
            bg="gray.900"
            borderColor="gray.600"
            _hover={{ borderColor: "gray.500" }}
          />
          <HStack w="100%" justifyContent="flex-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setGoalText("");
              }}
            >
              Anuluj
            </Button>
            <Button type="submit" size="sm" colorScheme="red">
              Dodaj cel
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          w="full"
          leftIcon={<Icon as={FaPlus} />}
          color="gray.400"
          _hover={{ bg: "gray.700", color: "white" }}
          onClick={() => setIsEditing(true)}
        >
          Dodaj nowy cel
        </Button>
      )}
    </Box>
  );
};

export default AddGoalInput;
