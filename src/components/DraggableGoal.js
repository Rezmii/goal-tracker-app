"use client";

import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";
import { useGoals } from "@/context/GoalsContext";
import { useState } from "react";
import EditableGoalText from "./EditableGoalText";

const DraggableGoal = ({ goal }) => {
  const { deleteGoal, toggleImportant, updateGoalText } = useGoals();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal._id });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      ref={setNodeRef}
      border="1px solid"
      borderColor={goal.important ? "yellow.400" : "gray.300"}
      borderRadius="md"
      p={2}
      mb={2}
      cursor={isEditing ? "default" : "grab"}
      bg={goal.important ? "yellow.700" : "transparent"}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...(!isEditing && attributes)}
      {...(!isEditing && listeners)}
    >
      <Flex justify="space-between" align="center">
        <Text
          fontWeight="bold"
          fontSize="sm"
          color={goal.important ? "white" : "gray.200"}
        >
          {isEditing ? (
            <EditableGoalText
              initialText={goal.text}
              onSave={(newText) => {
                updateGoalText(goal._id, newText);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Text
              as={"span"}
              fontWeight="bold"
              fontSize="sm"
              color={goal.important ? "white" : "gray.200"}
              onClick={() => setIsEditing(true)}
              cursor="pointer"
              _hover={{ color: "gray.300" }}
            >
              {goal.text}
            </Text>
          )}
        </Text>
        <Flex gap={2}>
          <Button
            aria-label="Oznacz jako ważne"
            icon={goal.important ? <FaStar /> : <FaRegStar />}
            size="xs"
            colorPallete={goal.important ? "yellow" : "gray"}
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleImportant(goal._id, goal.important);
            }}
            data-dndkit-no-drag
            _hover={{
              bg: goal.important ? "yellow.500" : "gray.600",
              color: "white",
            }}
          >
            {goal.important ? <FaStar /> : <FaRegStar />}
          </Button>
          <Button
            size="xs"
            colorPallete="red"
            variant="ghost"
            onClick={() => {
              deleteGoal(goal._id);
            }}
            data-dndkit-no-drag
            _hover={{ bg: "red.800", color: "white" }}
          >
            <FaTrash />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DraggableGoal;
